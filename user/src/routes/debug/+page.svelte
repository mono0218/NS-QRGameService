<script lang="ts">
    /** @type {import('./$types').PageLoad} */
    export let data:{
        data:any
    }
</script>

<div>
    {JSON.stringify(data.data)}
    <div class="mt-16 flex flex-col items-center space-y-4">
        <a href="/" data-sveltekit-reload class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            メインページに戻る
        </a>
    </div>
</div>

