<script lang="ts">
    export let data;
    $: ({ supabase } = data);

    let isLoad = false
    const onClick = async () => {
        isLoad = true
        const { data, error } = await supabase.auth.signInAnonymously()
        if (error) {
            console.error(error)
            alert(error.message)
            isLoad = false
        }else{
            const button = document.querySelector(".sendMainPage") as HTMLAnchorElement
            button.click()
        }
    }

    const onClick2=async()=>{
        const button = document.querySelector(".sendMainPage") as HTMLAnchorElement
        button.click()
    }

</script>

<svelte:head>
    <title>Login</title>
    <meta name="description" content="Login to the app" />
</svelte:head>

{#if isLoad}
    <!-- 読み込み中モーダル -->
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white p-8 rounded shadow-lg text-center">
            <p class="text-lg font-bold">ログイン中...</p>
        </div>
    </div>
{/if}

<section>
    <div class="flex flex-col items-center justify-center h-screen">
        <h1 class="text-3xl font-black text-center mb-32">LOGIN</h1>
        <button
                class="font-black text-xl text-white bg-blue-400 pt-3 pb-3 pr-10 pl-10 flex items-center rounded-2xl text-center"
                on:click={onClick}
        >Login with Anonymously
        </button>
        <button
                class="font-black text-xl text-white bg-blue-400 pt-3 pb-3 pr-10 pl-10 flex items-center rounded-2xl text-center"
                on:click={onClick2}
        >ログイン済みの方はこちら！
        </button>
    </div>
</section>

<a href="/" class="sendMainPage" hidden data-sveltekit-reload>
</a>
