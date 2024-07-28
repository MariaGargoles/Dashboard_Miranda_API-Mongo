import { App } from './app'
import serverless from 'serverless-http'

export const handler = serverless(App, {
	response: { headers: { 'Access-Control-Allow-Origin': '*' } }
})
