import type { PageServerLoad } from './$types'
import {PUBLIC_API_SERVER} from "$env/static/public";
import {redirect} from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
    const { data } = await supabase.auth.getSession();

    if (data.session) {
        const raw = await fetch(`${PUBLIC_API_SERVER}/v1/users`, {
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": data.session.access_token,
            },
        });

        if (raw.status != 200) redirect(302,"/auth/login")

        const json = await raw.json();
        return {
            username: json.data.username,
            point: json.data.point
        }
    }else{
        redirect(302,"/auth/login")
    }
}
