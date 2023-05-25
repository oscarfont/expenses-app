<script lang="ts">
	import Badge from '../../components/Badge.svelte';
	import Card from '../../components/Card.svelte';
	import FileIcon from '../../components/icons/FileIcon.svelte';
	import HistoryHeader from '../../components/loading/HistoryHeader.svelte';
	import HistoryTable from '../../components/loading/HistoryTable.svelte';
	import { getHistoricalData } from '../services/HistoryService';
</script>
{#await getHistoricalData()}
<section class="w-full h-full max-h-screen max-width p-2 md:py-4 md:px-8 flex flex-col gap-4 overflow-auto">
    <HistoryHeader />
    <HistoryTable />
</section>
{:then data}
    <section class="w-full h-full max-h-screen max-width p-2 md:py-4 md:px-8 flex flex-col gap-4 overflow-auto">
        <Card className={"p-4 flex flex-col gap-4 md:gap-6"}>
            <span class="flex gap-4 font-maitree text-3xl text-dark-blue items-center">
                <FileIcon color={"var(--dark-blue)"} className={'w-8 h-8'}/>
                {data?.month}
            </span>
            <div class="w-full md:p-2 flex gap-4 justify-between">
                <span class="flex gap-4">
                    <img class="w-12 md:w-16 rounded-sm" src={`/ofontito.png`} alt="avatar of user"/>
                    <span class="flex flex-col justify-center">
                        <Badge value={new Map(Object.entries(data?.totals)).get("ofontito") ?? 0.00}/>
                    </span>
                </span>
                <span class="flex gap-4">
                    <img class="w-12 md:w-16 rounded-sm" src={`/claudita.png`} alt="avatar of user"/>
                    <span class="flex flex-col justify-center">
                        <Badge value={new Map(Object.entries(data?.totals)).get("claudita") ?? 0.00}/>
                    </span>
                </span>
            </div>
        </Card>
        <Card className={"overflow-y-scroll"}>
            <table class="w-full">
                <thead class="border-b-2 border-dark-blue font-maitree text-dark-blue text-xl">
                    <tr>
                    <th class="p-2">Persona</th>
                    <th class="p-2">Fecha</th>
                    <th class="p-2">Valor</th>
                    </tr>
                </thead>
                <tbody class="font-sintony text-dark-blue text-lg">
                    {#each data.rows as row}
                        <tr class="border-b-2 border-dark-blue">
                            <td class="text-center p-2 flex justify-center"><img class="w-8 rounded-sm" src={`/${row.person}.png`} alt="avatar of defaulter"/></td>
                            <td class="text-center p-2">{row.date}</td>
                            <td class="text-center p-2">{row.value.toFixed(2)}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </Card>
    </section>
{/await}