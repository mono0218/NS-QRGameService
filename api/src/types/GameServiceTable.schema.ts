import {z} from 'zod';

export const IGameServiceTableSchema = z.object({
    GameID: z.string(),
    UUID: z.string(),
})

export const OGameServiceTableSchema = z.object({
    GameID: z.string(),
    UUID: z.string(),
    PlayerInfo: z.string()
})