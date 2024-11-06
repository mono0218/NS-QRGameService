<script lang="ts">
    import { ScanQRCode } from "@kuiper/svelte-scan-qrcode";
    import { PUBLIC_API_SERVER,} from "$env/static/public";

    /** @type {import('./$types').PageLoad} */
    export let data:{
        jwt:string
    }

    let result = "";
    let isLock = false;

    function _onPermissionError() {
        alert("Permission rejected");
        location.reload();
    }

    async function _onResulted() {
        if (isLock) return;
        isLock = true;

        if (data.jwt) {
            const raw = await fetch(`${PUBLIC_API_SERVER}/v1/qrcode`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-API-KEY": data.jwt,
                },
                body: JSON.stringify({ code: result })
            });

            if (!raw.ok) {
                isLock = false;
                alert("エラーが発生しました");
                location.reload();
            } else {
                alert("スキャンに成功しました");

                const button = document.querySelector(".sendMainPage") as HTMLAnchorElement
                button.click()
            }
        }
    }
</script>

{#if isLock}
    <!-- 読み込み中モーダル -->
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white p-8 rounded shadow-lg text-center">
            <p class="text-lg font-bold">読み込み中...</p>
        </div>
    </div>
{/if}

<ScanQRCode bind:scanResult={result} enableQRCodeReaderButton={false} options={{
  onPermissionError: _onPermissionError,
  onResulted: _onResulted,
}} />

<div class="mt-16 flex flex-col items-center space-y-4">
    <a href="/" data-sveltekit-reload class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        メインページに戻る
    </a>
</div>


<a href="/" class="sendMainPage" hidden data-sveltekit-reload>
</a>
