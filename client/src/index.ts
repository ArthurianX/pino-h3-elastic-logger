import logger from './console-logger'
import { LogMessage, LogVerbosity } from '../../common/types'
import messageSerializer from './serializer'

class Logger {
    localName = 'Logger'
    apiUrl: string | false = 'http://localhost:3000'
    unhandledListener: any
    errorListener: any

    constructor(apiUrl: string | false, loggerName?: string) {
        this.apiUrl = apiUrl
        this.localName = loggerName!

        window.addEventListener(
            'unhandledrejection',
            (e) => this.registeredUnhandledErrors(e, this.localName),
            false
        )
        this.registerWindowError()
    }

    public info(message: string) {
        const serializedMessage = messageSerializer(message)
        this.apiCall(LogVerbosity.Info, serializedMessage)
        if ('production' !== process.env.NODE_ENV) {
            logger.info(serializedMessage, this.localName)
        }
    }

    public warn(message: string) {
        const serializedMessage = messageSerializer(message)
        this.apiCall(LogVerbosity.Warn, serializedMessage)
        if ('production' !== process.env.NODE_ENV) {
            logger.warn(serializedMessage, this.localName)
        }
    }

    public error(message: string) {
        const serializedMessage = messageSerializer(message)
        this.apiCall(LogVerbosity.Error, serializedMessage)
        if ('production' !== process.env.NODE_ENV) {
            logger.error(serializedMessage, this.localName)
        }
    }

    public success(message: string) {
        const serializedMessage = messageSerializer(message)
        this.apiCall(LogVerbosity.Success, serializedMessage)
        if ('production' !== process.env.NODE_ENV) {
            logger.success(serializedMessage, this.localName)
        }
    }

    public unregisterListeners() {
        // FIXME: We're actually not unregistering because of the inline declaration of the function
        window.removeEventListener(
            'unhandledrejection',
            (e) => this.registeredUnhandledErrors(e, this.localName),
            false
        )
        // @ts-ignore
        window.onerror = undefined
    }

    private registerWindowError() {
        // NOTE: Just like Sentry or other crash reporting app, we're going to listen to window.onerror and pass that to the api
        window.onerror = (message, source, line, col, error) => {
            const serializedMessage = messageSerializer(
                `${message}\n${source}\n${line}:${col}\n${error}`
            )
            this.apiCall(LogVerbosity.Error, serializedMessage)
            if ('production' !== process.env.NODE_ENV) {
                logger.error(serializedMessage, this.localName)
            }

            // NOTE: 'Eat' the error, in case of breaking error, the app will still stop executing
            //  per https://developer.mozilla.org/en-US/docs/Web/API/Window/error_event#usage_notes
            return 'production' !== process.env.NODE_ENV
            // TODO: What other consequences could have if we eat this error in Production?
        }
    }

    private registeredUnhandledErrors(e: any, localName: string) {
        const serializedMessage = messageSerializer(e.reason)
        if ('production' === process.env.NODE_ENV) {
            this.apiCall(LogVerbosity.Error, serializedMessage)
        } else {
            logger.error(serializedMessage, localName)
        }
    }

    private apiCall(severity: LogVerbosity, message: LogMessage): void {
        // Example POST method implementation:
        async function postData(url: string, data = {}) {
            // Default options are marked with *
            const response = await fetch(url, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'no-cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json',
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify(data), // body data type must match "Content-Type" header
            })
            return response.json() // parses JSON response into native JavaScript objects
        }

        if (this.apiUrl) {
            postData(this.apiUrl, { severity, message }).catch((e) => {
                if ('production' !== process.env.NODE_ENV) {
                    logger.error(
                        messageSerializer(
                            'Loggin API unreachable, investigate network tab'
                        ),
                        this.localName
                    )
                }
            })
        }
    }
}

export default Logger
