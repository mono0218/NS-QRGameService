import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import dotenv from "dotenv"
import {UserRoute} from "./route/user/user";
import {GameServiceRoute} from "./route/service/gameService";
import {Auth} from "./lib/Auth";
import {SystemServiceRoute} from "./route/service/systemService";
import {cors} from "hono/cors";
import jwt from 'jsonwebtoken'
import pino from 'pino';

const logger = pino({ level: 'info' });
const app = new Hono<{ Variables: Variables }>()
const auth = new Auth()

type Variables = {
    gameId: number
    UserInfo:UserInfo
}

export interface UserInfo {
    sub: string
    is_anonymous: boolean
    session_id: string
}

dotenv.config()

app.use(
    '*',
    cors({
        origin: ["*"], // 本番と開発環境のURL
        allowHeaders: ["*"],
        allowMethods: ['POST', 'GET'],
    })
)


app.use('*', async (c, next) => {
    // リクエストの開始時間を記録
    const startTime = Date.now();

    // リクエスト情報のログ
    try {
        const requestBody = await c.req.json();  // リクエストボディを取得
        logger.info({
            message: "Request Information",
            method: c.req.method,
            path: c.req.url,  // URLパスを取得
            query: c.req.query(),
            headers: c.req.header(),
            body: requestBody,
        });
    } catch (error: unknown) {
        // エラーがError型であるかをチェック
        if (error instanceof Error) {
            logger.error({
                message: "Failed to parse JSON body",
                error: error.message,
            });
        } else {
            logger.error({
                message: "Failed to parse JSON body",
                error: "An unknown error occurred",
            });
        }
    }

    await next();

    // レスポンス情報のログ
    const endTime = Date.now();
    const responseTime = endTime - startTime;

    // レスポンスボディを取得
    let responseBody;
    try {
        responseBody = await c.res.json();
    } catch (error) {
        // JSONとしてパースできない場合はそのまま出力
        responseBody = c.res.body;
    }

    logger.info({
        message: "Response Information",
        status: c.res.status,
        headers: c.res.headers,
        body: responseBody,
        processingTime: `${responseTime}ms`,
    });
});

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

  if (!apiKey || apiKey != process.env.ADMIN_API_KEY) {
      await c.json({message: 'Forbidden'}, 403)
  }

  await next()
})

app.use("/users/*",async (c, next) => {
    const JWT = c.req.header('JWT')
    try {
        const data = jwt.verify(JWT!, process.env.JWT_SECRET!, {
            complete: true,
        })
        const userInfo = data.payload as UserInfo

        c.set('UserInfo', userInfo)
        await next()
    } catch {
        c.json({message: 'Forbidden'}, 403)
        await next()
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
