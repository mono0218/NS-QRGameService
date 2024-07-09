import {z} from "zod";

export const IGameServiceInfoTableSchema = z.object({
    GameID: z.string(),
})

export const OGameServiceInfoTableSchema = z.object({
    GameID: z.string(),
    AdminUserID: z.string(),
    PlayMoney: z.number(),
})