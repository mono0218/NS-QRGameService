<script lang="ts">
    import {PUBLIC_API_SERVER, PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL} from "$env/static/public";
    import {createClient} from "@supabase/supabase-js";
    let point:number |null

    async function getSession(){
        const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)
        const data = await supabase.auth.getSession()
        if(data.data.session){
            const raw = await fetch(`${PUBLIC_API_SERVER}/users/getPoint`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "JWT": data.data.session?.access_token,
                },
            })
            if (!raw.ok) {
                console.error("HTTP error " + raw.status)
                return
            }else{
                const json = await raw.json()
                point = json.data.Money
            }
        }
    }

    getSession()
</script>

<div>
    {#if point}
     <p>あなたのポイント：{point}</p>
    {/if}
</div>
