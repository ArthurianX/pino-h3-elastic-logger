declare module 'pino-logger-client/client/src/console-logger' {
  const logger: {
      info: (message: string, loggerName: string) => void;
      warn: (message: string, loggerName: string) => void;
      error: (message: string, loggerName: string) => void;
      success: (message: string, loggerName: string) => void;
  };
  export default logger;

}
declare module 'pino-logger-client/client/src/index' {
  class Logger {
      localName: string;
      apiUrl: string;
      unhandledListener: any;
      errorListener: any;
      constructor(apiUrl: string, loggerName?: string);
      info(message: string): void;
      warn(message: string): void;
      error(message: string): void;
      success(message: string): void;
      unregisterListeners(): void;
      private registerWindowError;
      private registerErrors;
      private registeredUnhandledErrors;
      private apiCall;
  }
  export default Logger;

}
declare module 'pino-logger-client/common/types' {
  export enum LogVerbosity {
      Info = "INFO",
      Warn = "WARN",
      Error = "ERROR",
      Success = "SUCCESS"
  }
  export enum LogStyle {
      Info = "\u001B[38;2;255;255;255;48;2;92;147;156;1m ",
      Warn = "\u001B[38;2;255;255;255;48;2;247;171;105;1m ",
      Error = "\u001B[38;2;255;255;255;48;2;238;91;96;1m ",
      Success = "\u001B[38;2;255;255;255;48;2;41;159;111;1m "
  }

}
declare module 'pino-logger-client' {
  import main = require('pino-logger-client/index');
  export = main;
}