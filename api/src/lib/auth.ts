import jwt from 'jsonwebtoken'
import {HTTPException} from "hono/http-exception";
import {PrismaClient} from "@prisma/client";
import crypto from "crypto";

const prisma = new PrismaClient()

export function userAuth(key:string|undefined):string{
    if (!process.env.JWT_SECRET) console.error('JWT_SECRET not set')
    if (!key) throw new HTTPException(401, {message:'Unauthorized'})

    let sub = ''

    jwt.verify(key, process.env.JWT_SECRET!,function(err, decoded){
        if (err) throw new HTTPException(401, {message:'Unauthorized'})

        sub = decoded?.sub as string
    })

    return sub
}

export async function serviceAuth(key:string|undefined){
    if (!key) throw new HTTPException(401, {message:'Unauthorized'})
    const hashKey = crypto.createHash('sha256').update(key).digest('hex')

    const data = await prisma.service.findFirst({
        where: {
            hashKey: hashKey
        }
    })

    if (!data) throw new HTTPException(401, {message:'Unauthorized'})

    return data.id
}
