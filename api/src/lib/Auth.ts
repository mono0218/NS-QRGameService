import {createClient, SupabaseClient} from "@supabase/supabase-js";
import {Database} from "../types/database.types";
import crypto from "crypto";

export class Auth {
    supabase:SupabaseClient<Database>
    constructor() {
        if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) throw new Error('No SUPABASE ENV')
        this.supabase = createClient<Database>(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
    }

    async apiKeyAuth(apiKey:string) {
        const hashKey = crypto.createHash('sha256').update(apiKey).digest('hex')
        const {data,error} = await this.supabase.from('GameSericeKey').select().eq('hash_key',hashKey)

        if(!data || error) return {success:false,data:null,error:error?.message}
        if (data.length === 0) return {success:false,data:null,error:null}

        return {success:true, data:{gameId:data[0].game_id},error:null}
    }
}