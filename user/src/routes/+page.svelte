<script lang="ts">
    import { goto } from "$app/navigation";

    /** @type {import('./$types').PageLoad} */
    export let data:{
        username: string;
        point: number;
    }

    let click1 = 0;
    let click2 = 0;

    function  addClick1() {
        click1++;
    }

    function  addClick2() {
        click2++;
    }

    $:if(click1 >= 5 && click2 >= 5) {
        const button = document.querySelector(".sendMainPage") as HTMLAnchorElement
        button.click()
    }
</script>

<div class="container mx-auto p-6 space-y-8">
    <div class="text-center space-y-2">
        <button class="text-3xl font-black" on:click={addClick1}>ゲームセンター</button>
        <h2 class="text-xl">in 新宿代々木</h2>
    </div>

    <img src="/img.png" alt="">

    <div class="flex flex-col items-center space-y-4">
        <p class="text-lg">ポイント合計: {data.point}</p>

        <button
                class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                on:click={() => goto('/scan')}
        >
            QRコードを読む
        </button>

        <button class="text-sm text-gray-500" on:click={addClick2}>username: {data.username}</button>
    </div>
</div>

<a href="/debug" class="sendMainPage" hidden data-sveltekit-reload>
</a>
