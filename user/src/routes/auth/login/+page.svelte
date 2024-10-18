<script>
    import { createClient } from '@supabase/supabase-js';
    import { PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL } from '$env/static/public';
    import {goto} from "$app/navigation";
    const onClick = async () => {
        const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
        const { data, error } = await supabase.auth.signInAnonymously()
        if (error) {
            console.error(error)
        }else if (data) {
            await goto("/")
            console.log(data)
        }
    }
</script>

<svelte:head>
    <title>Login</title>
    <meta name="description" content="Login to the app" />
</svelte:head>

<section>
    <div class="flex flex-col items-center justify-center h-screen">
        <h1 class="text-3xl font-black text-center mb-32">LOGIN</h1>
        <button
                class="font-black text-xl text-white bg-blue-400 pt-3 pb-3 pr-10 pl-10 flex items-center rounded-2xl text-center"
                on:click={onClick}
        >Login with Google
        </button>
    </div>
</section>
