# Tests


## We will run tests against the API in single instance mode with [Artillery](artillery.io/docs)

- `npm run test` to run the test
- `npm run report` to generate the report
- open `report.html` in browser

### Intermediary stats
- 10, 20, 50, 100 calls per second for 30 seconds has yielded no loss of data in ElasticSearch
- However, running 3-4 times the 100 calls per second for 30 seconds, instead of 3000 logs to reach Elastic, only 2995 have reached ElasticSearch, representing around 0.16% error rate divided by the number of tries, so that's around 0.04%

