import { App, eventHandler } from 'h3'
import pino from 'pino'
import { LogVerbosity } from '../../common/types'

const pinoElastic = require('pino-elasticsearch')
const pinoPretty = require('pino-pretty')

const streamToElastic = pinoElastic({
    index: 'ez-index',
    consistency: 'one',
    node: 'http://localhost:9200',
    'es-version': 8,
    'flush-bytes': 1000,
})
const stream = pinoPretty({
    colorize: true,
})
const elasticLogger = pino({ level: 'info' }, streamToElastic)
const prettyLogger = pino(stream)

const decorateApp = (app: App) => {
    app.use(
        '/',
        eventHandler((event) => {
            let body = ''
            event.node.req.on('data', function (data) {
                body += data

                // Too much POST data, kill the connection!
                // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
                if (body.length > 1e6) event.node.req.connection.destroy()
            })

            event.node.req.on('end', function () {
                const { severity, message } = JSON.parse(body) as {
                    severity: LogVerbosity
                    message: string
                }

                logMessage(severity, message)
            })

            event.node.res.statusCode = 204

            return true
        })
    )

    return app
}

const logMessage = (severity: LogVerbosity, message: any) => {
    if ('production' !== process.env.NODE_ENV) {
        switch (severity) {
            case LogVerbosity.Warn:
                prettyLogger.warn(message)
                break
            case LogVerbosity.Error:
                prettyLogger.error(message)
                break
            case LogVerbosity.Info:
            case LogVerbosity.Success:
            default:
                prettyLogger.info(message)
        }
    }

    switch (severity) {
        case LogVerbosity.Warn:
            elasticLogger.warn(message)
            break
        case LogVerbosity.Error:
            elasticLogger.error(message)
            break
        case LogVerbosity.Info:
        case LogVerbosity.Success:
        default:
            elasticLogger.info(message)
    }
}

export default decorateApp
