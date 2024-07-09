import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import dotenv from "dotenv"
import {UserRoute} from "./route/user/user";
import {QRLoginRoute} from "./route/service/qrLogin";
import {GameServiceRoute} from "./route/service/gameService";

const app = new Hono()
dotenv.config()

app.use('/service/*', async (c, next) => {
  const apiKey = c.req.header('X-API-KEY')
    c.set('gameId',apiKey)

  if (false) {
    await c.json({ message: 'Forbidden' }, 403)
  }

  await next()
})

app.use("/service/newGameService",async (c, next) => {
  const apiKey = c.req.header('X-API-KEY')

  if (false) {
    await c.json({ message: 'Forbidden' }, 403)
  }

  await next()
})

app.use("/service/newGameServiceKey",async (c, next) => {
    const apiKey = c.req.header('X-API-KEY')

    if (false) {
        await c.json({ message: 'Forbidden' }, 403)
    }

    await next()
})

app.route("/users",UserRoute)
app.route("/service",QRLoginRoute)
app.route("/service",GameServiceRoute)

const port = 3000
serve({
  fetch: app.fetch,
  port
})
