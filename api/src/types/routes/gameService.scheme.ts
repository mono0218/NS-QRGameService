import {z} from "zod";

export const  IGetUserInfoScheme = z.object({
    uuid: z.string()
});


export const ISetUserInfoScheme= z.object({
    uuid: z.string(),
    data: z.object({})
});

export const IAddUserPointScheme = z.object({
    uuid: z.string(),
    point: z.number()
});

export const IGetResultCodeScheme = z.object({
    code: z.string()
});
