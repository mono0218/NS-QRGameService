<!-- src/routes/services/ServiceList.svelte -->
<script>
    let services = [
        { id: 1, name: 'Service A', description: 'Description for Service A' },
        { id: 2, name: 'Service B', description: 'Description for Service B' },
        { id: 3, name: 'Service C', description: 'Description for Service C' },
    ];
</script>

<div class="bg-white shadow-md rounded p-4">
    <h2 class="text-xl font-semibold mb-4">サービス一覧</h2>
    <table class="w-full text-left">
        <thead>
        <tr>
            <th class="px-4 py-2">ID</th>
            <th class="px-4 py-2">サービス名</th>
            <th class="px-4 py-2">説明</th>
        </tr>
        </thead>
        <tbody>
        {#each services as service}
            <tr class="border-t">
                <td class="px-4 py-2">{service.id}</td>
                <td class="px-4 py-2">{service.name}</td>
                <td class="px-4 py-2">{service.description}</td>
            </tr>
        {/each}
        </tbody>
    </table>
</div>
