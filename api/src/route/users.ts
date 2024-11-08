import {Hono} from "hono";
import {PrismaClient} from "@prisma/client";
import {updateUser} from "../types/users.scheme";
import {userAuth} from "../lib/auth";

export const UsersRoute = new Hono()

const prisma = new PrismaClient()

UsersRoute.get("/", async (c) => {
    const userId= userAuth(c.req.header('X-API-KEY'))
    const user= await prisma.user.findUnique({
        where:{
            id:userId
        },
        include:{
            UserPoint:{
                select:{
                    point:true
                }
            }
        }
    })

    if (!user) return c.json("user not found", 404)

    const data = {
        id: user.id,
        username: user.username,
        point: user.UserPoint.reduce((sum, point) => sum + point.point, 0) || 0
    }

    return c.json({status: 200, data: data, message: 'success'});
})

UsersRoute.get("/debug",async (c)=>{
    const userId= userAuth(c.req.header('X-API-KEY'))
    const user= await prisma.user.findUnique({
        where:{
            id:userId
        },
        include:{
            UserPoint:{
                select:{
                    id:true,
                    point:true,
                    userId:true,
                    serviceId:true,
                    createdAt:true,
                    updatedAt:true
                }
            },
            Qrcode:{
                select:{
                    id:true,
                    userId:true,
                    serviceId:true,
                    createdAt:true,
                    updatedAt:true
                }
            }
        }
    })

    if (!user) return c.json("user not found", 404)

    return c.json({status: 200, data: user, message: 'success'});
})

UsersRoute.put("/", async (c) => {
    const userId= userAuth(c.req.header('X-API-KEY'))
    const reqJson = updateUser.parse(await c.get("requestBody"))

    const user = await prisma.user.update(
        {
            where: {id: userId},
            data: {
                username: reqJson.username
            },
            include:{
                UserPoint:{
                    select:{
                        point:true
                    }
                }
            }
        }
    )

    if (!user) return c.json("user not found", 404)

    const data = {
        id: user.id,
        username: user.username,
        point: user.UserPoint.reduce((sum, point) => sum + point.point, 0) || 0
    }

    return c.json({status: 200, data: data, message: 'success'});
})

UsersRoute.delete("/", async (c) => {
    const userId= userAuth(c.req.header('X-API-KEY'))

    await prisma.user.delete({
        where: {id: userId}
    })
    return c.json({})
})
