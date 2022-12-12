export enum LogVerbosity {
    Info = 'INFO',
    Warn = 'WARN',
    Error = 'ERROR',
    Success = 'SUCCESS',
}
export enum LogStyle {
    Info = '\x1b[38;2;255;255;255;48;2;92;147;156;1m ',
    Warn = '\x1b[38;2;255;255;255;48;2;247;171;105;1m ',
    Error = '\x1b[38;2;255;255;255;48;2;238;91;96;1m ',
    Success = '\x1b[38;2;255;255;255;48;2;41;159;111;1m ',
    // NOTE: \x1b makes everything look good in color supporting terminals as well
}

export interface LogMessage {
    message: string
    localTime: Date
    windowCleaned?: string
}
