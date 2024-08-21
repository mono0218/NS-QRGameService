import {SupabaseClient} from "@supabase/supabase-js";
import {Database} from "../types/database.types";

export class UserTable{

    constructor(private supabase: SupabaseClient<Database>) {
    }

    async createUser(){
        const {data, error} = await this.supabase.from("UserMaster")
            .insert({UserName:"test",Money:100}).select()

        if (error) return {
            success: false,
            data: null,
            error: error.message
        }

        if (!(data) || data.length === 0) return {
            success:false,
            data:null,
            error:null
        }

        return {
            success: true,
            data: {
                UUID: data[0].UUID,
                UserName: data[0].UserName,
                Money: data[0].Money
            },
            error: null
        }
    }

    async getUserMoney(UUID:string){
        const {data, error} = await this.supabase.from("UserMaster")
            .select("Money").eq("UUID",UUID)

        if (error) return {
            success: false,
            data: null,
            error: error.message
        }
        console.log(data)
        return {
            success: true,
            data: {
                Money: data![0].Money
            },
            error: null
        }
    }
}
