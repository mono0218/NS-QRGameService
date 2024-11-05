import {Hono} from "hono";
import {PrismaClient} from "@prisma/client";
import {addPoint} from "../types/service.scheme";
import {serviceAuth} from "../lib/auth";

export const ServiceRoute = new Hono()
const prisma = new PrismaClient()


ServiceRoute.get("/", async (c) => {
    const serviceId = await serviceAuth(c.req.header('X-API-KEY'))
    const service= await prisma.service.findUnique({
        where:{
            id:serviceId
        }
    })

    if (!service) {
        return c.json("service not found", 404)
    }

    const data = {
        id: service.id,
        name: service.name,
    }

    return c.json({status: 200, data: data, message: 'success'});
})

ServiceRoute.post("/points", async (c) => {
    const serviceId = await serviceAuth(c.req.header('X-API-KEY'))
    const reqJson = addPoint.parse(await c.req.json())

    await prisma.userPoint.create({
        data: {
            point: reqJson.point,
            serviceId: serviceId,
            userId: reqJson.userId
        }
    })

    return  c.json({})
})
