import {Hono} from "hono";
import {SystemaService} from "../../lib/SystemService";

export const SystemServiceRoute = new Hono()
const systemService = new SystemaService()

SystemServiceRoute.post('/newGameService', async (c) => {
    const json = await c.req.json()

    const result = await systemService.newGameService(json.adminUserId,json.playMoney)

    if (!result.success) return c.json(result,500)
    return c.json(result,200)
})

SystemServiceRoute.post('/newGameServiceKey', async (c) => {
    const json = await c.req.json()

    const result = await systemService.newGameServiceKey(json.gameId)

    if (!result.success) return c.json(result,500)
    return c.json(result,200)
})

SystemServiceRoute.get("/getGameServiceList", async (c) => {
    const result = await systemService.getGameServiceList()

    if (!result.success) return c.json(result,500)
    return c.json(result,200)
})

SystemServiceRoute.post("/getGameService", async (c) => {
    const json = await c.req.json()
    const result = await systemService.getGameService(json.gameId)

    if (!result.success) return c.json(result,500)
    return c.json(result,200)
})
