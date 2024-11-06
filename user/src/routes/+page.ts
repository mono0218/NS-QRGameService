import {createClient} from "@supabase/supabase-js";
import {PUBLIC_API_SERVER, PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL} from "$env/static/public";

export interface userResponse{
    status: number,
    data:{
        id: string
        username: string,
        point: number,
    },
    message: string
}

/** @type {import('./$types').PageLoad} */
export async function load() {
    const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
    const { data } = await supabase.auth.getSession();

    if (data.session) {
        const raw = await fetch(`${PUBLIC_API_SERVER}/v1/users`, {
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": data.session.access_token,
            },
        });
        console.log(raw)

        const json:userResponse = await raw.json();
        return {
            username: json.data.username,
            point: json.data.point
        }
    }else{
       return {
            username:null,
            point:null
        }
    }
}
