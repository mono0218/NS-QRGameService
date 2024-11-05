import { z } from 'zod';


export const addPoint = z.object({
    userId: z.string(),
    point: z.number()
})
