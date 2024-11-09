import { PrismaClient } from "@prisma/client";
import {Hono} from "hono";
import {adjectives, animals, colors, uniqueNamesGenerator} from "unique-names-generator";

export const webhookRoute = new Hono()
const prisma = new PrismaClient()

webhookRoute.post("/signup", async (c) => {
    const reqData = await c.get("requestBody")

    const username = uniqueNamesGenerator({
        dictionaries: [adjectives, colors, animals], // 形容詞 + 色 + 動物の組み合わせ
        separator: '_', // 区切り文字
        length: 3 // 辞書の数
    });

    const user = await prisma.user.create({
        data: {
            id: reqData.record.id as string,
            username: username,
        }
    })

    return c.json({status: 200, data: user, message: 'success'});
})
