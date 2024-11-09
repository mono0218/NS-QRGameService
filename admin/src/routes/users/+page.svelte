<script>
    let users = [
        { id: 1, name: 'User A', point: 100 },
        { id: 2, name: 'User B', point: 100 },
        { id: 3, name: 'User C', point: 100 },
    ];
</script>

<div class="bg-white shadow-md rounded p-4">
    <h2 class="text-xl font-semibold mb-4">ユーザー一覧</h2>
    <table class="w-full text-left">
        <thead>
        <tr>
            <th class="px-4 py-2">ID</th>
            <th class="px-4 py-2">名前</th>
            <th class="px-4 py-2">ポイント</th>
        </tr>
        </thead>
        <tbody>
        {#each users as user}
            <tr class="border-t">
                <td class="px-4 py-2">{user.id}</td>
                <td class="px-4 py-2">{user.name}</td>
                <td class="px-4 py-2">{user.point}</td>
            </tr>
        {/each}
        </tbody>
    </table>
</div>
