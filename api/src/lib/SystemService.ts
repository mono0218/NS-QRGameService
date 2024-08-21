import {Database} from "../types/database.types";
import {SupabaseClient} from "@supabase/supabase-js";
import {generateApiKey} from "generate-api-key";
import crypto from "crypto";

export class SystemaService {
    private supabase: SupabaseClient<Database>

    constructor() {
        if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) throw new Error('No SUPABASE ENV')
        this.supabase = new SupabaseClient<Database>(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
    }

    async newGameService(adminUserId:string,playMoney:number){
        const {data,error} = await this.supabase.from('GameServiceAdmin').insert({admin_userid:adminUserId,PlayMoney:playMoney}).select()
        if(!data || error) return {success:false,data:null,error:error?.message}
        if (data.length === 0) return {success:false,data:null,error:null}

        return {
            success: true,
            data: {
                gameId: data[0].game_id,
                adminUserId: data[0].admin_userid,
                playMoney: data[0].PlayMoney
            },
            error: null
        }
    }

    async newGameServiceKey(gameId:number){
        const key= generateApiKey({ method: 'string', length: 30 })
        const hashKey = crypto.createHash('sha256').update(key as string).digest('hex')

        const {data,error} = await this.supabase.from('GameSericeKey').upsert({hash_key:hashKey,game_id:gameId}).select()
        if(!data || error) return {success:false,data:null,error:error?.message}
        if (data.length === 0) return {success:false,data:null,error:null}

        return {
            success: true,
            data: {
                key: key as string
            },
            error: null
        }
    }

    async getGameServiceList(){
        const {data,error} = await this.supabase.from('GameServiceAdmin').select()
        if(!data || error) return {success:false,data:null,error:error?.message}
        if (data.length === 0) return {success:false,data:null,error:null}

        return {
            success: true,
            data: data.map((game) => ({
                gameId: game.game_id,
                adminUserId: game.admin_userid,
                playMoney: game.PlayMoney
            })),
            error: null
        }
    }

    async getGameService(gameId:number){
        const {data,error} = await this.supabase.from('GameServiceAdmin').select().eq('game_id',gameId)
        if(!data || error) return {success:false,data:null,error:error?.message}
        if (data.length === 0) return {success:false,data:null,error:null}

        return {
            success: true,
            data: {
                gameId: data[0].game_id,
                adminUserId: data[0].admin_userid,
                playMoney: data[0].PlayMoney
            },
            error: null
        }
    }

}
