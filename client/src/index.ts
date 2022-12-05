import { LogStyle, LogVerbosity } from './types'

const log = (
    verbosity: LogVerbosity,
    selectedLogStyle: LogStyle,
    message,
    groupName?,
    collapsed = false
) => {
    // Only strings can pass through
    if (typeof message !== 'string') return
    // TODO: Maybe we'll change this to objects.
    const date = () => new Date().toLocaleTimeString()
    message += `\n${date()}`

    try {
        if (process.env.NODE_ENV !== 'development') {
            // TODO: Make API Call, without coloring
            return false
        }
    } catch (e) {}
    const separator = '\x1b[0m'
    const consoledOutput = `${selectedLogStyle}${verbosity}: ${separator} ${message}`

    switch (verbosity) {
        case LogVerbosity.Info:
        case LogVerbosity.Success:
            console.log(consoledOutput)
            break
        case LogVerbosity.Warn:
            console.warn(consoledOutput)
            break
        case LogVerbosity.Error:
            console.error(consoledOutput)
            break
        default:
            console.log(consoledOutput)
    }
}

const logger = {
    info: (message: string) => {
        log(LogVerbosity.Info, LogStyle.Info, `${message}`)
    },
    warn: (message: string) => {
        log(LogVerbosity.Warn, LogStyle.Warn, `${message}`)
    },
    error: (message: string) => {
        log(LogVerbosity.Error, LogStyle.Error, `${message}`)
    },
    success: (message: string) => {
        log(LogVerbosity.Success, LogStyle.Success, `${message}`)
    },
}

export default logger
