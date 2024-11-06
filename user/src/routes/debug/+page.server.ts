import type { PageServerLoad } from './$types'
import {PUBLIC_API_SERVER} from "$env/static/public";
import {redirect} from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
    const { data } = await supabase.auth.getSession();

    if (data.session) {
        const raw = await fetch(`${PUBLIC_API_SERVER}/v1/users/debug`, {
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": data.session.access_token,
            },
        });
        return {
            data: (await raw.json()).data
        }
    }else{
        redirect(302,"/auth/login")
    }
}
