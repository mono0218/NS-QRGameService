import {Hono} from "hono";
import {createClient} from "@supabase/supabase-js";
import type {Database} from "../../types/database.types";
import {QRLoginTable} from "../../lib/QRLoginTable";
import dotenv from "dotenv";

dotenv.config()
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) throw new Error('No SUPABASE ENV')
const supabase = createClient<Database>(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
const qrLoginTable = new QRLoginTable(supabase)

export const QRLoginRoute = new Hono()

QRLoginRoute.get('/getCode', async (c) => {
    const result = await qrLoginTable.getCode()

    if (!result.success) return c.json(result,500)
    return c.json(result,200)
})

QRLoginRoute.post('/getResultCode', async (c) => {
    const json = await c.req.json()
    const result = await qrLoginTable.getResultCode(json.code)

    if (!result.success) return c.json(result,500)
    return c.json(result,200)
})
