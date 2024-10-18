import {Hono} from "hono";
import {createClient} from "@supabase/supabase-js";
import type {Database} from "../../types/database.types";
import {UserTable} from "../../lib/UserTable";
import {QRLoginTable} from "../../lib/QRLoginTable";
import dotenv from "dotenv";
import {UserInfo} from "../../index";
import jwt from "jsonwebtoken";

dotenv.config()
if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) throw new Error('No SUPABASE ENV')
const supabase = createClient<Database>(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
const userTable = new UserTable(supabase)
const qrLoginTable = new QRLoginTable(supabase)

type Variables = {
    gameId: number
    UserInfo:UserInfo
}

export const UserRoute = new Hono<{ Variables: Variables }>()

UserRoute.get('/getPoint', async (c) => {
    try{
        const JWT = c.req.header('JWT')
        const data = jwt.verify(JWT!, process.env.JWT_SECRET!, {
            complete: true,
        })
        const user = data.payload as UserInfo

        const result = await userTable.getUserMoney(user.sub)

        if (!result.success) return c.json(result,500)
        return c.json(result,200)
    }catch (e){
        console.log(e)
        return c.json({},500)
    }
})

UserRoute.post('/scanCode', async (c) => {

    const JWT = c.req.header('JWT')
    const data = jwt.verify(JWT!, process.env.JWT_SECRET!, {
        complete: true,
    })
    const user = data.payload as UserInfo

    const json = await c.req.json()
    const result = await qrLoginTable.scanCode(json.code,user.sub)
    if (!result.success) return c.json(result,500)

    return c.json(result,200)
})
