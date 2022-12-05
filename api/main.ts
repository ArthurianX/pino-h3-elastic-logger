import { createServer } from 'http'
import { createApp, toNodeListener } from 'h3'
import decorateApp from './src'

const app = createApp()
decorateApp(app)
createServer(toNodeListener(app)).listen(process.env.PORT || 3000)
