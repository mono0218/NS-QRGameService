import {SupabaseClient} from "@supabase/supabase-js";
import {Database} from "../types/database.types";

export class QRLoginTable {
    constructor(private supabase: SupabaseClient<Database>) {
    }
    async scanCode(loginCode: string, uuid: string) {
        const {data, error} = await this.supabase.from('QRLogin').update({
            LoginCode: loginCode,
            resultUUID: uuid
        }).eq('LoginCode', loginCode).select()

        if (error) return {
            success: false,
            data: null,
            error: error.message
        }

        if (data.length === 0) return {
            success: false,
            data: null,
            error: null
        }

        return {
            success: true,
            data: data,
            error: null
        }
    }
}
