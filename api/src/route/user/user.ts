import {Hono} from "hono";
import {createClient} from "@supabase/supabase-js";
import type {Database} from "../../types/database.types";
import {UserTable} from "../../lib/UserTable";
import {QRLoginTable} from "../../lib/QRLoginTable";
import dotenv from "dotenv";

dotenv.config()
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) throw new Error('No SUPABASE ENV')
const supabase = createClient<Database>(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
const userTable = new UserTable(supabase)
const qrLoginTable = new QRLoginTable(supabase)

type Variables = {
    gameId: number
    UserInfo:UserInfo
}

interface UserInfo {
    sub: string
    is_anonymous: boolean
    session_id: string
}

export const UserRoute = new Hono<{ Variables: Variables }>()

UserRoute.get('/getPoint', async (c) => {
    const user = c.get("UserInfo")

    const result = await userTable.getUserMoney(user.sub)
    if (!result.success) return c.json(result,500)

    return c.json(result,200)
})

UserRoute.post('/scanCode', async (c) => {
    const user = c.get("UserInfo")

    const json = await c.req.json()
    const result = await qrLoginTable.scanCode(json.code,user.sub)
    if (!result.success) return c.json(result,500)

    return c.json(result,200)
})
