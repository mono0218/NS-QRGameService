<script lang="ts">
    import {ScanQRCode} from "@kuiper/svelte-scan-qrcode";
    import {createClient} from "@supabase/supabase-js";
    import {PUBLIC_API_SERVER, PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL} from "$env/static/public";

    let result = "";
    let isLock = false

    function _onPermissionError() {
        alert("Permission rejected");
        location.reload();
    }

    async function _onResulted() {
        if (isLock) {

            return;
        }
        isLock = true

        const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)
        const data = await supabase.auth.getSession()

        if(data.data.session){
            const raw = await fetch(`${PUBLIC_API_SERVER}/users/scanCode`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "JWT": data.data.session?.access_token,
                },
                body:JSON.stringify({code:result})
            })
            if (!raw.ok) {
                console.error("HTTP error " + raw.status)
                return
            }else{
                alert("スキャンに失敗しました")
                isLock = false
            }
        }

    }
</script>

<ScanQRCode bind:scanResult={result} options={{
          onPermissionError: () => _onPermissionError(),
          onResulted: () => _onResulted(),
      }} />
