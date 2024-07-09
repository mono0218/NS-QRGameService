import {SupabaseClient} from "@supabase/supabase-js";
import {Database, Json} from "../types/database.types";
import { generateApiKey } from 'generate-api-key';
import crypto from 'crypto';

export class GameService{
    constructor(private supabase:SupabaseClient<Database>) {
    }

    async newGameService(adminUserId:string,playMoney:number){
        const {data,error} = await this.supabase.from('GameServiceAdmin').insert({admin_userid:adminUserId,PlayMoney:playMoney}).select()
        if(!data || error) return {success:false,data:null,error:error?.message}

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

        return {
            success: true,
            data: {
                key: key as string
            },
            error: null
        }
    }

    async getGameService(gameId:number){
        const {data,error} = await this.supabase.from('GameServiceAdmin').select().eq('game_id',gameId)
        if(!data || error) return {success:false,data:null,error:error?.message}

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
