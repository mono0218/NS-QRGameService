import { z } from 'zod';

export const IQRLoginTableSchema = z.object({
    loginCode: z.string(),
})

export const OQRLoginTableSchema = z.object({
    loginCode: z.string(),
    UUID: z.string(),
})