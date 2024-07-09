import {Hono} from "hono";
import {GameService} from "../../lib/GameService";
import dotenv from "dotenv";
import {createClient} from "@supabase/supabase-js";
import type {Database} from "../../types/database.types";

type Variables = {
    gameId: number
}

export const GameServiceRoute = new Hono<{ Variables: Variables }>()
dotenv.config()

const gameService = new GameService()

GameServiceRoute.post('/getGameService', async (c) => {
    const gameId = c.get('gameId')

    if (!gameId) return c.json({success:false,data:null,error:'APIkey is not allow'},403)

    const result = await gameService.getGameService(gameId as number)
    if (!result.success) return c.json(result,500)

    return c.json(result,200)
})

GameServiceRoute.post('/getUserInfo', async (c) => {
    const gameId = c.get('gameId')
    if (!gameId) return c.json({success:false,data:null,error:'APIkey is not allow'},403)

    const json = await c.req.json()
    const result = await gameService.getUserInfo(gameId as number,json.uuid)
    if (!result.success) return c.json(result,500)

    return c.json(result,200)
})

GameServiceRoute.post("/setUserInfo", async (c) => {
    const gameId = c.get('gameId')

    const json = await c.req.json()
    const result = await gameService.setUserInfo(gameId as number,json.uuid,json.data)
    if (!result.success) return c.json(result,500)

    return c.json(result,200)
})
