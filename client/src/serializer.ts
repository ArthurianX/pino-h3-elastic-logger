import { LogMessage } from '../../common/types'

// NOTE: Inspiration from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Cyclic_object_value
export const getCircularReplacer = () => {
    const seen = new WeakSet()
    return (key: any, value: any) => {
        if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) {
                return
            }
            seen.add(value)
        }
        return value
    }
}

const messageSerializer = (message: any): LogMessage => {
    let payload = {
        localTime: new Date(),
        message: '',
        windowCleaned: '',
    }
    try {
        payload.message =
            typeof message === 'string'
                ? message
                : JSON.stringify(message, getCircularReplacer(), '\t')
    } catch (e) {
        payload.message = 'Error while generating log message'
    }

    try {
        // NOTE: Getting the window in a iframe will cause a same-origin policy error.
        //  Attach the window object only when available.
        payload.windowCleaned = JSON.stringify(window, getCircularReplacer())
    } catch (e) {
        payload.windowCleaned = 'Error while generating window log'
    }

    return payload
}

export default messageSerializer
