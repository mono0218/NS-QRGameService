import { z } from 'zod';

export const createUserSchema = z.object({
    Username: z.string(),
    Money: z.number(),
})


export const IgetUserSchema = z.object({
    UUID: z.string(),
    Username: z.string(),
    Money: z.number(),
})