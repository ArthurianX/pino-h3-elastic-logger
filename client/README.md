# pino-logger-client


Small logging library that also send logs to a configurable endpoint

### Usage
- Install client using `npm install pino-logger-client --save` from [npm](https://www.npmjs.com/package/pino-logger-client)
- Import with `import { Logger } from 'pino-logger-client'`
- Instantiate and configure the logger class with `const logger = new Logger(API_URL | false, LoggerName);`, `LoggerName` is the name that will appear in the logs, it's also optional.
- if `API_URL` is `false` nothing will be sent to API, this is preferable for local development. 
- Use its methods `logger.info|warn|error|success('message')`
- The logger also registers some global error listeners, which can be unregisterd with `logger.unregisterListeners()`

### Local development console helper
When `process.env` is not `production` then any log will appear in the browser console like this:
<p align="center">
  <img width="834" alt="image" src="https://user-images.githubusercontent.com/2720451/205640893-e833ad75-eb08-4e87-a7ac-b28f4e69c237.png">
</p>
The colored styling is also supported in terminal consoles when running in a Webpack or other compiled project, as long as the terminal supports colors.

**This is part of [pino-h3-elastic-logger](https://github.com/ArthurianX/pino-h3-elastic-logger)**

_TODO: Some things are not working properly._
