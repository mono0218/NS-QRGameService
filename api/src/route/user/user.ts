import {Hono} from "hono";
import {createClient} from "@supabase/supabase-js";
import type {Database} from "../../types/database.types";
import {UserTable} from "../../lib/UserTable";
import {QRLoginTable} from "../../lib/QRLoginTable";
import dotenv from "dotenv";

dotenv.config()
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_KEY) throw new Error('No SUPABASE ENV')
const supabase = createClient<Database>(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)
const userTable = new UserTable(supabase)
const qrLoginTable = new QRLoginTable(supabase)

export const UserRoute = new Hono()

UserRoute.get('/auth/login', async (c) => {
    const session = await supabase.auth.getUser()
    if (session.data.user?.id) return c.json({error: session.data.user?.id},400)

    const {data, error} = await supabase.auth.signInAnonymously()
    if (error || !data.session) return c.json({error},500)

    await supabase.auth.setSession(data.session)
    return c.json(data,200)
})

UserRoute.get('/getPoint', async (c) => {
    const session = await supabase.auth.getUser()
    if (!session.data.user?.id) return c.json({error: "Need Login"},403)

    const result = await userTable.getUserMoney(session.data.user.id)
    if (!result.success) return c.json(result,500)

    return c.json(result,200)
})

UserRoute.post('/scanCode', async (c) => {
    const session = await supabase.auth.getUser()
    if (!session.data.user?.id) return c.json({error: "No user"},400)

    const json = await c.req.json()
    const result = await qrLoginTable.scanCode(json.code,session.data.user.id)
    if (!result.success) return c.json(result,500)

    return c.json(result,200)
})
