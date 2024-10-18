import {Hono} from "hono";
import {GameService} from "../../lib/GameService";
import dotenv from "dotenv";
import {ZodError} from "zod";
import {
    IAddUserPointScheme,
    IGetResultCodeScheme,
    IGetUserInfoScheme,
    ISetUserInfoScheme
} from "../../types/routes/gameService.scheme";

type Variables = {
    gameId: number
}

export const GameServiceRoute = new Hono<{ Variables: Variables }>()
dotenv.config()

const gameService = new GameService()

GameServiceRoute.get('/getGameService', async (c) => {
    try {
        let gameId = c.get('gameId')
        if (!gameId) return c.json({success:false,data:null,error:'APIkey is not allow'},403)

        const result = await gameService.getGameService(gameId as number)
        if (!result.success) return c.json(result,500)

        return c.json(result,200)
    } catch (error) {
        // バリデーションエラーの場合は500エラーを返す
        if (error instanceof ZodError) {
            return c.json({ success:false,data: 'Validation failed', error: error.errors }, 400);
        }

        // その他のエラーも500でキャッチ
        return c.json({ success:false,data:null, error:"Internal Server Error" }, 500);
    }
})

GameServiceRoute.post('/getUserInfo', async (c) => {
    try{
        const gameId = c.get('gameId')
        if (!gameId) return c.json({success:false,data:null,error:'APIkey is not allow'},403)
        const json = IGetUserInfoScheme.parse(await c.req.json())
        const result = await gameService.getUserInfo(gameId as number,json.uuid)

        if (!result.success) return c.json(result,500)

        return c.json(result,200)
    } catch (error) {
        if (error instanceof ZodError) {
            return c.json({ success:false,data: 'Validation failed', error: error.errors }, 400);
        }

        // その他のエラーも500でキャッチ
        return c.json({ success:false,data:null, error:"Internal Server Error" }, 500);
    }
})

GameServiceRoute.post("/setUserInfo", async (c) => {
     try{
        const gameId = c.get('gameId')
        if (!gameId) return c.json({success:false,data:null,error:'APIkey is not allow'},403)

        const json = ISetUserInfoScheme.parse(await c.req.json())
        const result = await gameService.setUserInfo(gameId as number,json.uuid,json.data)
        if (!result.success) return c.json(result,500)

        return c.json(result,200)
    } catch (error) {
        // バリデーションエラーの場合は500エラーを返す
        if (error instanceof ZodError) {
            return c.json({ success:false,data: 'Validation failed', error: error.errors }, 400);
        }

        // その他のエラーも500でキャッチ
        return c.json({ success:false,data:null, error:"Internal Server Error" }, 500);
    }
})

GameServiceRoute.post("/addUserPoint", async (c) => {
     try{
        const gameId = c.get('gameId')
        if (!gameId) return c.json({success:false,data:null,error:'APIkey is not allow'},403)

        const json = IAddUserPointScheme.parse(await c.req.json())
        const result = await gameService.addUserMoney(json.uuid,json.point as number)
        if (!result.success) return c.json(result,500)

        return c.json(result,200)
    } catch (error) {
        // バリデーションエラーの場合は500エラーを返す
        if (error instanceof ZodError) {
            return c.json({ success:false,data: 'Validation failed', error: error.errors }, 400);
        }

        // その他のエラーも500でキャッチ
        return c.json({ success:false,data:null, error:"Internal Server Error" }, 500);
    }
})

GameServiceRoute.get('/getCode', async (c) => {
    try{
        const result = await gameService.getCode()

        if (!result.success) return c.json(result,500)

        return c.json(result,200)
    } catch (error) {
        // バリデーションエラーの場合は500エラーを返す
        if (error instanceof ZodError) {
            return c.json({ success:false, data: 'Validation failed', error: error.errors }, 400);
        }

        // その他のエラーも500でキャッチ
        return c.json({ success:false,data:null, error:"Internal Server Error" }, 500);
    }
})

GameServiceRoute.post('/getResultCode', async (c) => {
    try{
        const json = IGetResultCodeScheme.parse(await c.req.json())
        const result = await gameService.getResultCode(json.code)

        if (!result.success) return c.json(result,500)
        return c.json(result,200)
    } catch (error) {
        // バリデーションエラーの場合は500エラーを返す
        if (error instanceof ZodError) {
            return c.json({ success:false,data: 'Validation failed', error: error.errors }, 400);
        }

        // その他のエラーも500でキャッチ
        return c.json({ success:false,data:null, error:"Internal Server Error" }, 500);
    }
})

