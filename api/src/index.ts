import {App, eventHandler, fromNodeMiddleware} from 'h3'
import pino from 'pino-http'

const pinoElastic = require('pino-elasticsearch')

const streamToElastic = pinoElastic({
    index: 'ez-index',
    consistency: 'one',
    node: 'http://localhost:9200',
    'es-version': 8,
    'flush-bytes': 1000
})



const decorateApp = (app: App) => {
    app.use(fromNodeMiddleware(pino({ level: 'info' }, streamToElastic)))
    app.use('/', eventHandler((event) => {
        event.node.req.log.info('something');
        event.node.res.statusCode = 204;

        return true;
    }))

    return app;
}

export default decorateApp;
