<script>
    import { goto } from "$app/navigation";
    export let data;
    $: ({ countries } = data);
    let point = 0;
</script>

<div class="container mx-auto p-6 space-y-8">
    <div class="text-center space-y-2">
        <h1 class="text-3xl font-black">ゲームセンター</h1>
        <h2 class="text-xl">in 新宿代々木</h2>
    </div>

    <img src="/img.png" alt="">

    <div class="flex flex-col items-center space-y-4">
        <p class="text-lg">ポイント合計: {point}</p>

        <button
                class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                on:click={() => goto('/scan')}
        >
            QRコードを読む
        </button>

        <p class="text-sm text-gray-500">UUID: </p>
    </div>
</div>
