import { LogMessage, LogStyle, LogVerbosity } from '../../common/types'

const log = (
    verbosity: LogVerbosity,
    selectedLogStyle: LogStyle,
    loggerName: string,
    message: LogMessage
): void => {
    const date = () => new Date().toLocaleTimeString()
    const messageDate = `\n${date()}`

    const separator = '\x1b[0m'
    const consoledOutput = `${selectedLogStyle}${loggerName} > ${verbosity}: ${separator} `

    switch (verbosity) {
        case LogVerbosity.Warn:
            console.warn(consoledOutput, message.message, messageDate)
            break
        case LogVerbosity.Error:
            console.error(consoledOutput, message.message, messageDate)
            break
        case LogVerbosity.Info:
        case LogVerbosity.Success:
        default:
            console.log(consoledOutput, message.message, messageDate)
    }
}

const logger = {
    info: (message: LogMessage, loggerName: string) => {
        log(LogVerbosity.Info, LogStyle.Info, loggerName, message)
    },
    warn: (message: LogMessage, loggerName: string) => {
        log(LogVerbosity.Warn, LogStyle.Warn, loggerName, message)
    },
    error: (message: LogMessage, loggerName: string) => {
        log(LogVerbosity.Error, LogStyle.Error, loggerName, message)
    },
    success: (message: LogMessage, loggerName: string) => {
        log(LogVerbosity.Success, LogStyle.Success, loggerName, message)
    },
}
export default logger
