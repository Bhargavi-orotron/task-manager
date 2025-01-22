import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import * as dotenv from 'dotenv'
import route from './router/userRouting'

dotenv.config()
const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})
app.route('users', route)
console.log("Schema Path:", "./src/connection/schema/*");

const port = Number(process.env.PORT)

console.log(`Server is running on http://localhost:${port}`)

serve({
  fetch: app.fetch,
  port
})
