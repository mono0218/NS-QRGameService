import {Hono} from "hono";
import {PrismaClient} from "@prisma/client";
import {scanQrcode} from "../types/qrcode.scheme";
import {serviceAuth, userAuth} from "../lib/auth";

export const QrcodeRoute = new Hono()

const prisma = new PrismaClient()

QrcodeRoute.get("/", async (c) => {
    const serviceId = await serviceAuth(c.req.header('X-API-KEY'))

    const qrcode = await prisma.qrcode.create({
        data: {
            id: crypto.randomUUID(),
            serviceId: serviceId
        }
    })

    const data = {
        code: qrcode.id
    }

    return c.json({status: 200, data: data, message: 'success'});
})

QrcodeRoute.post("/", async (c) => {
    const userId= userAuth(c.req.header('X-API-KEY'))

    const reqJson = scanQrcode.parse(await c.get("requestBody"))
    console.log(reqJson)

    const qrcode = await prisma.qrcode.update({
        where: {
            id: reqJson.code,
        },
        data: {
            userId: userId
        }
    })

    return  c.json({})
})

QrcodeRoute.get("/:id", async (c) => {
    const qrcodeId = c.req.param('id')
    const serviceId = await serviceAuth(c.req.header('X-API-KEY'))

    const qrcode = await prisma.qrcode.findUnique({
        where:{
            id:qrcodeId,
            serviceId: serviceId
        }
    })

    if (!qrcode) {
        return c.json("qrcode not found", 404)
    }

    if (!qrcode.userId) {
        const data = {
            isDone: false,
            id: "",
            username: "",
            point: 0,
        }

        return c.json({status: 200, data: data, message: 'success'});
    }

    const user = await prisma.user.findUnique({
        where:{
            id: qrcode.userId
        },
        select:{
            id:true,
            username:true,
            UserPoint:{
                select:{
                    point:true
                }
            }
        }
    })

    if (!user) {
        return c.json("user not found", 404)
    }

    const data ={
        isDone: true,
        id: user.id,
        username: user.username,
        point: user.UserPoint.reduce((sum, point) => sum + point.point, 0) || 0
    }

    return c.json({status: 200, data: data, message: 'success'});
})
