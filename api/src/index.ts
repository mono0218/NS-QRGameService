import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import dotenv from "dotenv"
import { cors } from "hono/cors";
import { UsersRoute } from "./route/users";
import { ServiceRoute } from "./route/service";
import { QrcodeRoute } from "./route/qrcode";
import { ZodError } from "zod";
import { HTTPException } from "hono/http-exception";
import { webhookRoute } from "./route/webhook";
import "newrelic"
import pino from 'pino';
import jwt from 'jsonwebtoken'

dotenv.config()

// Pinoのロガーを作成
const logger = pino({level: process.env.LOG_LEVEL || 'info'});
const app = new Hono()

// CORSミドルウェアの設定
app.use(
    '*',
    cors({
        origin: ["*", "https://yoyogi-game.monodev.cloud", "http://localhost:5173"],
        allowHeaders: ["*"],
        allowMethods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'],
    })
);

// Pino HTTPミドルウェアの設定
app.use('*', async (c, next) => {
    // リクエスト開始時間の記録
    const startTime = Date.now();

    if(c.req.method != "GET"){
        const requestBody = await c.req.json();  // リクエストボディをパース
        logger.info({
            message: "Request Information",
            method: c.req.method,
            path: c.req.url,
            query: c.req.query(),
            headers: c.req.header(),
            userId: jwt.decode(c.req.header("X-API-KEY") as string, {complete: true})?.payload.sub as string || "user not found",
            body: requestBody,
        });

        c.set("requestBody", requestBody);
    }

    await next();

    // レスポンスの詳細ログ
    const endTime = Date.now();
    const responseTime = endTime - startTime;
    let responseBody;

    try {
        responseBody = await c.res.json();
    } catch {
        responseBody = c.res.body;
    }

    logger.info({
        message: "Response Information",
        status: c.res.status,
        headers: c.res.headers,
        body: responseBody,
        userId: jwt.decode(c.req.header("X-API-KEY") as string, {complete: true})?.payload.sub as string || "user not found",
        processingTime: `${responseTime}ms`,
    });
});

// ルートの設定
app.route("/v1/users", UsersRoute);
app.route("/v1/service", ServiceRoute);
app.route("/v1/qrcode", QrcodeRoute);
app.route("/webhook", webhookRoute);

// エラーハンドリング
app.onError((err, c) => {
    if (err instanceof ZodError) {
        logger.error({
            message: "Validation Error",
            errors: err.errors,
            userId: jwt.decode(c.req.header("X-API-KEY") as string, {complete: true})?.payload.sub as string || "user not found",
        });
        return c.json({ status: 400, data: {}, message: err.errors }, 400);
    }

    if (err instanceof HTTPException) {
        logger.error({
            message: "HTTP Exception",
            status: err.status,
            error: err.message,
            userId: jwt.decode(c.req.header("X-API-KEY") as string, {complete: true})?.payload.sub as string || "user not found",
        });
        return c.json({ status: err.status, data: {}, message: err.message }, err.status);
    }

    logger.error({
        message: "Internal Server Error",
        error: err.message,
        userId: jwt.decode(c.req.header("X-API-KEY") as string, {complete: true})?.payload.sub as string || "user not found",
    });
    return c.json({ status: 500, data: {}, message: err.message }, 500);
});

// サーバーの起動
serve({
    fetch: app.fetch,
    port: 3000
});
