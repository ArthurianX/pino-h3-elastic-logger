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
    try {
        return {
            windowCleaned: JSON.stringify(window, getCircularReplacer()),

            message:
                typeof message === 'string'
                    ? message
                    : JSON.stringify(message, getCircularReplacer(), '\t'),
            localTime: new Date(),
        }
    } catch (e) {
        return {
            windowCleaned: JSON.stringify(window, getCircularReplacer()),
            message: 'Error while generating log message',
            localTime: new Date(),
        }
    }
}

export default messageSerializer
