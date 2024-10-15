import {SupabaseClient} from "@supabase/supabase-js";
import {Database, Json} from "../types/database.types";
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
        const {data,error} = await this.supabase.from('GameService').select(`
          game_id,
          PlayerInfo,
          UUID,
          UserMaster (UserName)
        `).eq('game_id',gameId).eq('uuid',uuid)

        if(!data || error) return {success:false,data:null,error:error?.message}
        if (data.length === 0) return {success:false,data:null,error:{message:"No User"}}

        return {
            success: true,
            data:{
                uuid: data[0].UUID,
                userName: data[0].UserMaster!.UserName,
                userInfo: data[0].PlayerInfo
            },
            error: null
        }
    }

    async getUserMoney(uuid:string){
        const {data,error} = await this.supabase.from('UserMaster').select().eq('UUID',uuid)

        if(!data || error) return {success:false,data:null,error:error?.message}
        if (data.length === 0) return {success:false,data:null,error:null}

        return {
            success: true,
            data: {
                uuid: data[0].UUID,
                money: data[0].Money
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

    async addUserMoney(uuid:string,money:number){
        const result = await this.getUserMoney(uuid)
        const {data,error} = await this.supabase.from('UserMaster').update({Money:result.data!.money+money}).eq('UUID',uuid).select()

        if(!data || error) return {success:false,data:null,error:error?.message}
        if (data.length === 0) return {success:false,data:null,error:null}

        return {
            success: true,
            data: {
                uuid: data[0].UUID,
                money: data[0].Money
            },
            error: null
        }
    }

    async getCode() {
        let loginCode = crypto.randomUUID()
        const {data, error} = await this.supabase.from('QRLogin').insert([{LoginCode: loginCode}]).select()

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
            data: {
                loginCode: loginCode
            },
            error: null
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
