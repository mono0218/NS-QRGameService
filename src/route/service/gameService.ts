import {Hono} from "hono";
import {GameService} from "../../lib/GameService";
import dotenv from "dotenv";
import {createClient} from "@supabase/supabase-js";
import type {Database} from "../../types/database.types";

export const GameServiceRoute = new Hono()
dotenv.config()
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) throw new Error('No SUPABASE ENV')
const supabase = createClient<Database>(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)

const gameService = new GameService(supabase)

GameServiceRoute.post('/newGameService', async (c) => {
    const json = await c.req.json()

    const result = await gameService.newGameService(json.adminUserId,json.playMoney)

    if (!result.success) return c.json(result,500)
    return c.json(result,200)
})

GameServiceRoute.post('/newGameServiceKey', async (c) => {
    const json = await c.req.json()

    const result = await gameService.newGameServiceKey(json.gameId)

    if (!result.success) return c.json(result,500)
    return c.json(result,200)
})

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
    if (!gameId) return c.json({success:false,data:null,error:'APIkey is not allow'},403)

    const json = await c.req.json()
    const result = await gameService.setUserInfo(gameId as number,json.uuid,json.data)
    if (!result.success) return c.json(result,500)

    return c.json(result,200)
})
