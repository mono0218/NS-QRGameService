import {z} from "zod";

export function IGetUserInfoScheme() {
    return z.object({
        uuid: z.string()
    });
}


export function ISetUserInfoScheme() {
    return z.object({
        uuid: z.string(),
        data: z.object({})
    });
}

export function IAddUserPointScheme() {
    return z.object({
        uuid: z.string(),
        point: z.number()
    });
}

export function IGetResultCodeScheme() {
    return z.object({
        code: z.string()
    });
}
