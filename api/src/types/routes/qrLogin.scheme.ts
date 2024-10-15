import {z} from "zod";

export function IGetResultCode() {
    return z.object({
        code: z.string()
    });
}
