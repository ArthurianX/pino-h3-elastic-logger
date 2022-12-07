import logger from './console-logger'
import { LogVerbosity } from '../../common/types'

class Logger {
    localName = 'Logger'
    apiUrl = 'http://localhost:3000'
    unhandledListener: any
    errorListener: any

    constructor(apiUrl: string, loggerName?: string) {
        this.apiUrl = apiUrl
        this.localName = loggerName!

        window.addEventListener('error', this.registerErrors, false)
        window.addEventListener(
            'unhandledrejection',
            this.registeredUnhandledErrors,
            false
        )
        this.registerWindowError()
    }

    public info(message: string) {
        if ('production' !== process.env.NODE_ENV) {
            logger.info(message, this.localName)
        } else {
            this.apiCall(LogVerbosity.Info, message)
        }
    }

    public warn(message: string) {
        if ('production' !== process.env.NODE_ENV) {
            logger.warn(message, this.localName)
        } else {
            this.apiCall(LogVerbosity.Warn, message)
        }
    }

    public error(message: string) {
        if ('production' !== process.env.NODE_ENV) {
            logger.error(message, this.localName)
        } else {
            this.apiCall(LogVerbosity.Error, message)
        }
    }

    public success(message: string) {
        if ('production' !== process.env.NODE_ENV) {
            logger.success(message, this.localName)
        } else {
            this.apiCall(LogVerbosity.Success, message)
        }
    }

    public unregisterListeners() {
        window.removeEventListener('error', this.registerErrors, false)
        window.removeEventListener(
            'unhandledrejection',
            this.registeredUnhandledErrors,
            false
        )
        // @ts-ignore
        window.onerror = undefined
    }

    private registerWindowError() {
        // NOTE: Just like Sentry or other crash reporting app, we're going to listen to window.onerror and pass that to the api
        window.onerror = (message, file, line, col, error) => {
            if ('production' === process.env.NODE_ENV) {
                this.apiCall(LogVerbosity.Error, error!.message)
            } else {
                logger.error(error!.message, this.localName)
            }
        }
    }
    private registerErrors(e: any) {
        if ('production' === process.env.NODE_ENV) {
            this.apiCall(LogVerbosity.Error, e.error.message)
        } else {
            logger.error(e.error.message, this.localName)
        }
    }

    private registeredUnhandledErrors(e: any) {
        if ('production' === process.env.NODE_ENV) {
            this.apiCall(LogVerbosity.Error, e.reason.message)
        } else {
            logger.error(e.reason.message, this.localName)
        }
    }

    private apiCall(severity: LogVerbosity, message: string): void {
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

        postData(this.apiUrl, { severity, message }).catch((e) => {
            if ('production' !== process.env.NODE_ENV) {
                logger.error(
                    'Loggin API unreachable, investigate network tab',
                    this.localName
                )
            }
        })
    }
}

export default Logger;
