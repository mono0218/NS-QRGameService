import jwt from 'jsonwebtoken'
import {HTTPException} from "hono/http-exception";
import {PrismaClient} from "@prisma/client";

const prisma = new PrismaClient()

export function userAuth(key:string|undefined):string{
    if (!process.env.JWT_SECRET) console.error('JWT_SECRET not set')
    if (!key) throw new HTTPException(401, {message:'Unauthorized'})

    const data = jwt.verify(key, process.env.JWT_SECRET!)
    if (data instanceof String) {
        throw new HTTPException(401, {message:'Unauthorized'})
    }

    return data.sub as string
}

export async function serviceAuth(key:string|undefined){
    if (!key) throw new HTTPException(401, {message:'Unauthorized'})

    const data = await prisma.service.findFirst({
        where: {
            hashKey: key
        }
    })

    if (!data) throw new HTTPException(401, {message:'Unauthorized'})

    return data.id
}
