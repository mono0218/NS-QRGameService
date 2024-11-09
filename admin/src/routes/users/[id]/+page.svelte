<script>
    import { onMount } from 'svelte';
    import { page } from '$app/stores';

    let user = null;
    let userPoints = [];

    const fetchUserData = async (userId) => {
        user = {
            id: userId,
            username: 'mono0218',
            created_time: '2023-09-06 01:02:03',
            updated_time: '2023-09-06 01:02:03'
        };

        userPoints = [
            { id: '1', service_id: '3a26da0b', point: 100, created_time: '2023-09-06' },
            { id: '2', service_id: '3a26da1b', point: 200, created_time: '2023-09-07' },
        ];
    };

    onMount(() => {
        const userId = $page.params.id;
        fetchUserData(userId);
    });
</script>

<div class="min-h-screen bg-white text-black p-6">
    <div class="max-w-4xl mx-auto bg-gray-100 border-2 border-gray-500 rounded-lg p-6 shadow-md">
        <h1 class="text-3xl font-semibold mb-4 border-b-2 border-gray-500 pb-2">ユーザー詳細</h1>

        {#if user}
            <div class="mb-8 border-2 border-gray-500 rounded-md p-4 space-y-2">
                <p class="text-lg font-semibold border-b-2 border-gray-400 pb-2">
                    ID: <span class="font-normal">{user.id}</span>
                </p>
                <p class="text-lg font-semibold border-b-2 border-gray-400 pb-2">
                    ユーザー名: <span class="font-normal">{user.username}</span>
                </p>
                <p class="text-lg font-semibold border-b-2 border-gray-400 pb-2">
                    作成日時: <span class="font-normal">{user.created_time}</span>
                </p>
                <p class="text-lg font-semibold">
                    更新日時: <span class="font-normal">{user.updated_time}</span>
                </p>
            </div>

            <h2 class="text-2xl font-semibold mb-4 border-b-2 border-gray-500 pb-2">ユーザーポイント</h2>
            <ul class="space-y-4">
                {#each userPoints as point}
                    <li class="bg-gray-200 border-2 border-gray-500 p-4 rounded-md space-y-2">
                        <p class="text-lg font-semibold border-b-2 border-gray-400 pb-2">
                            サービスID: <span class="font-normal">{point.service_id}</span>
                        </p>
                        <p class="text-lg font-semibold border-b-2 border-gray-400 pb-2">
                            ポイント: <span class="font-normal">{point.point}</span>
                        </p>
                        <p class="text-lg font-semibold">
                            作成日時: <span class="font-normal">{point.created_time}</span>
                        </p>
                    </li>
                {/each}
            </ul>
        {:else}
            <p>ユーザー情報を読み込み中...</p>
        {/if}
    </div>
</div>
