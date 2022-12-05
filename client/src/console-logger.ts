import { LogStyle, LogVerbosity } from '../../common/types'

const log = (
    verbosity: LogVerbosity,
    selectedLogStyle: LogStyle,
    loggerName: string,
    message: string
): void => {
    // Only strings can pass through
    if (typeof message !== 'string') return
    // TODO: Maybe we'll change this to objects.

    const date = () => new Date().toLocaleTimeString()
    message += `\n${date()}`

    const separator = '\x1b[0m'
    const consoledOutput = `${selectedLogStyle}${loggerName} > ${verbosity}: ${separator} ${message}`

    switch (verbosity) {
        case LogVerbosity.Warn:
            console.warn(consoledOutput)
            break
        case LogVerbosity.Error:
            console.error(consoledOutput)
            break
        case LogVerbosity.Info:
        case LogVerbosity.Success:
        default:
            console.log(consoledOutput)
    }
}

const logger = {
    info: (message: string, loggerName) => {
        log(LogVerbosity.Info, LogStyle.Info, loggerName, `${message}`)
    },
    warn: (message: string, loggerName) => {
        log(LogVerbosity.Warn, LogStyle.Warn, loggerName, `${message}`)
    },
    error: (message: string, loggerName) => {
        log(LogVerbosity.Error, LogStyle.Error, loggerName, `${message}`)
    },
    success: (message: string, loggerName) => {
        log(LogVerbosity.Success, LogStyle.Success, loggerName, `${message}`)
    },
}
export default logger
