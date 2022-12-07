# pino-h3-elastic-logger

An ElastichSearch logging flow built from a small client library that talks with an H3 lightweight server which runs pino and the pino-elasticsearch transport


https://user-images.githubusercontent.com/2720451/206240154-341ffa44-6b07-48a4-aac7-10fa63284d9e.mp4


### Considerents 
- This is an intermediate solution to a logging problem we're facing.
- The service can be scaled in as many instances as needed.
- When it will become a bottleneck, we can move the backpressure from the application to a broker like `pino-mq` or `pino-kafka` 
- The purpose of it is for the client and the API to remain in a familiar state, and then we can change the logging transport to whatever we want.

### See it in action

See the console logger in action live [on StackBklitz](https://stackblitz.com/edit/react-ts-mouehg?file=index.tsx)
(Open the page and then the console)




### Usage

- Import with `import { Logger } from 'pino-logger-client'`
- Instantiate and configure the logger class with `const logger = new Logger(API_URL, LoggerName);`, `LoggerName` is the name that will appear in the logs, it's also optional.
- Use its methods `logger.info|warn|error|success('message')`
- The logger also registers some global error listeners, which can be unregisterd with `logger.unregisterListeners()`

### Local development console helper
When `process.env` is not `production` then any log will appear in the browser console like this:
<p align="center">
  <img width="834" alt="image" src="https://user-images.githubusercontent.com/2720451/205640893-e833ad75-eb08-4e87-a7ac-b28f4e69c237.png">
</p>
The colored styling is also supported in terminal consoles when running in a Webpack or other compiled project, as long as the terminal supports colors.

### How to Develop & Run all the services locally
The pre-requirements to this are a properly set up Node and Docker environment 
- `cd api && npm run dev-stack` will start H3 API server and instances of ElasticSearch and Kibana
- in a different terminal `cd client && npm run example-prod` will build the client with `microbundle` and serve the example `index.html` file


