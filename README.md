# pino-h3-elastic-logger

An ElastichSearch logging flow built from a small client library that talks with an H3 lightweight server which runs pino and the pino-elasticsearch transport

### Considerents 
- This is an intermediate solution to a logging problem we're facing.
- The service can be scaled in as many instances as needed.
- When it will become a bottleneck, we can move the backpressure from the application to a broker like `pino-mq` or `pino-kafka` 
- The purpose of it is for the client and the API to remain in a familiar state, and then we can change the logging transport to whatever we want.

### Local development console helper
When `process.env` is `development` then any log you set will appear in console like this:
<p align="center">
  <img width="834" alt="image" src="https://user-images.githubusercontent.com/2720451/205640893-e833ad75-eb08-4e87-a7ac-b28f4e69c237.png">
</p>




