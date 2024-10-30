<!-- src/routes/+layout.svelte -->
<script lang="ts">
    import { invalidate } from '$app/navigation'
    import { onMount } from 'svelte'
    import "./app.css";

    export let data

    let { supabase, session } = data
    $: ({ supabase, session } = data)

    onMount(() => {
        const { data } = supabase.auth.onAuthStateChange((event, newSession) => {
            if (newSession?.expires_at !== session?.expires_at) {
                invalidate('supabase:auth')
            }
        })

        return () => data.subscription.unsubscribe()
    })
</script>

<svelte:head>
    <title>User Management</title>
</svelte:head>

<div class="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 mx-auto">
    <slot />
</div>
