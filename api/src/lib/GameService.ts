import {SupabaseClient} from "@supabase/supabase-js";
import {Database, Json} from "../types/database.types";
import { generateApiKey } from 'generate-api-key';
import crypto from 'crypto';

export class GameService{
    private supabase: SupabaseClient<Database>

    constructor() {
        if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_KEY) throw new Error('No SUPABASE ENV')
        this.supabase = new SupabaseClient<Database>(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY)
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

    async getUserInfo(gameId:number,uuid:string){
        const {data,error} = await this.supabase.from('GameService').select().eq('game_id',gameId).eq('uuid',uuid)

        if(!data || error) return {success:false,data:null,error:error?.message}
        if (data.length === 0) return {success:false,data:null,error:null}

        return {
            success: true,
            data:{
                uuid: data[0].UUID,
                userInfo: data[0].PlayerInfo
            },
            error: null
        }
    }

    async setUserInfo(gameId:number,uuid:string,userInfo:Json){
        const {data,error} = await this.supabase.from('GameService').upsert({game_id:gameId,UUID:uuid,PlayerInfo:userInfo}).select()

        if(!data || error) return {success:false,data:null,error:error?.message}
        if (data.length === 0) return {success:false,data:null,error:null}

        return {
            success: true,
            data: {
                uuid: data[0].UUID,
                userInfo: data[0].PlayerInfo
            },
            error: null
        }
    }
}