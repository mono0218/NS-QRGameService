import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import dotenv from "dotenv"
import {cors} from "hono/cors";
import {UsersRoute} from "./route/users";
import {ServiceRoute} from "./route/service";
import {QrcodeRoute} from "./route/qrcode";
import {ZodError} from "zod";
import {HTTPException} from "hono/http-exception";
import {webhookRoute} from "./route/webhook";
dotenv.config()

const app = new Hono()

app.use(
    '*',
    cors({
        origin: ["*","https://yoyogi-game.monodev.cloud","http://localhost:5173"],
        allowHeaders: ["*"],
        allowMethods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'],
    })
)

app.route("/v1/users",UsersRoute)
app.route("/v1/service",ServiceRoute)
app.route("/v1/qrcode",QrcodeRoute)
app.route("/webhook",webhookRoute)

app.onError((err,c) => {
    if (err instanceof ZodError) {
        return c.json({status: 400, data:{}, message: err.errors}, 400)
    }

    if (err instanceof HTTPException) {
        return c.json({status: err.status, data:{}, message: err.message},err.status)
    }

    return c.json({status:500, data:{}, message: err.message},500)
})

serve({
    fetch: app.fetch,
    port:3000
})
