<script lang="ts">
    import {ScanQRCode} from "@kuiper/svelte-scan-qrcode";
    import {createClient} from "@supabase/supabase-js";
    import {PUBLIC_API_SERVER, PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL} from "$env/static/public";
    import {goto} from "$app/navigation";

    let result = "";
    let isLock = false;

    function _onPermissionError() {
        alert("Permission rejected");
        location.reload();
    }

    async function _onResulted() {
        if (isLock) return;
        isLock = true;

        const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY);
        const data = await supabase.auth.getSession();

        if (data.data.session) {
            const raw = await fetch(`${PUBLIC_API_SERVER}/users/scanCode`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "JWT": data.data.session.access_token,
                },
                body: JSON.stringify({ code: result })
            });

            if (!raw.ok) {
                isLock = false;
                alert(isLock);
            } else {
                alert("スキャンに成功しました");
                await goto('/');
            }
        } else {
            alert("ログインしてください");
            await goto('/');
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
    <button
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            on:click={() => goto('/')}
    >
        メインページに戻る
    </button>
</div>
