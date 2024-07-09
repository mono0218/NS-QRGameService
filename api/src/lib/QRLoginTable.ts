import {SupabaseClient} from "@supabase/supabase-js";
import {Database} from "../types/database.types";

export class QRLoginTable{
    constructor(private supabase:SupabaseClient<Database>) {
    }

    async getCode(){
        let loginCode = crypto.randomUUID()
        const {data,error}  = await this.supabase.from('QRLogin').insert([{LoginCode:loginCode}]).select()

        if (error) return {
            success:false,
            data:null,
            error:error.message
        }

        if (data.length === 0) return {
            success:false,
            data:null,
            error:null
        }

        return {
            success:true,
            data:{
                loginCode:loginCode
            },
            error:null
        }
    }

    async scanCode(loginCode:string,uuid:string){
        const {data,error} = await this.supabase.from('QRLogin').update({LoginCode:loginCode,resultUUID:uuid}).eq('LoginCode',loginCode).select()

        if (error) return {
            success:false,
            data:null,
            error:error.message
        }

        if (data.length === 0) return {
            success:false,
            data:null,
            error:null
        }

        return {
            success:true,
            data:data,
            error:null
        }
    }

    async getResultCode(loginCode:string){
        const {data,error} = await this.supabase.from('QRLogin').select('resultUUID').eq('LoginCode',loginCode)

        if (error) return {
            success:false,
            data:null,
            error:error.message
        }

        if (data.length === 0) return {
            success:false,
            data:null,
            error:null
        }

        return {
            success:true,
            data:{
                resultUUID:data?.[0].resultUUID
            },
            error:null
        }
    }
}
