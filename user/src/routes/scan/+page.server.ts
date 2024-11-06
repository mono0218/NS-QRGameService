import type { PageServerLoad } from './$types'
import {redirect} from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals: { supabase } }) => {
    const { data } = await supabase.auth.getSession();

    if (data.session) {
        return {
            jwt: data.session.access_token
        }
    }else{
        redirect(302,"/auth/login")
    }
}
