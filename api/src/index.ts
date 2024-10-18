import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import dotenv from "dotenv"
import {UserRoute} from "./route/user/user";
import {GameServiceRoute} from "./route/service/gameService";
import {Auth} from "./lib/Auth";
import {SystemServiceRoute} from "./route/service/systemService";
import {cors} from "hono/cors";
import jwt from 'jsonwebtoken'

type Variables = {
    gameId: number
    UserInfo:UserInfo
}

interface UserInfo {
    sub: string
    is_anonymous: boolean
    session_id: string
}

dotenv.config()
const app = new Hono<{ Variables: Variables }>()

const auth = new Auth()

app.use(
    '*',
    cors({
        origin: ["*"], // 本番と開発環境のURL
        allowHeaders: ["*"],
        allowMethods: ['POST', 'GET'],
    })
)

app.use('/service/*', async (c, next) => {
    const apiKey = c.req.header('X-API-KEY')
    if (!apiKey) return c.json({ message: 'Forbidden' }, 403)

    const result = await auth.apiKeyAuth(apiKey as string)
    if (!result.success || !result.data) return c.json({ message: 'Forbidden' }, 403)

    c.set("gameId",result.data!.gameId)

  await next()
})

app.use("/system/*",async (c, next) => {
  const apiKey = c.req.header('X-API-KEY')

  if (!apiKey) {
      await c.json({message: 'Forbidden'}, 403)
  }

  await next()
})

app.use("/users/*",async (c, next) => {
    const JWT = c.req.header('JWT')
    const data = jwt.verify(JWT!, process.env.JWT_SECRET!, {
        complete: true,
    })

    const userInfo = data.payload as UserInfo

    if (userInfo){
        c.set('UserInfo', userInfo)
    }else{
        await c.json({message: 'Forbidden'}, 403)
    }
})

app.route("/system",SystemServiceRoute)
app.route("/users",UserRoute)
app.route("/service",GameServiceRoute)

const port = 3000
serve({
  fetch: app.fetch,
  port
})
