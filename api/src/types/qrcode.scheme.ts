import { z } from 'zod';

export const scanQrcode = z.object({
    code: z.string()
})
