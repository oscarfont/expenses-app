<script lang="ts">
    import type { PageData } from './$types';
    export let data: PageData;
    const mes = 'Abril';
</script>
<section class="w-full h-full max-width flex flex-col">
    <header class="w-full flex py-2 font-firasans text-4xl bg-pewter-dark">
        <span class="w-full py-2 px-8 text-gray-nurse border-t-4 border-tom-thumb">Historico {mes}</span>
    </header>
    <body class="w-full h-full p-8 overflow-y-auto">
        <table class="w-full border-collapse border border-tom-thumb overflow-y-scroll">
            <thead class="border border-tom-thumb font-maitree text-tom-thumb text-xl">
              <tr>
                <th class="p-2">Persona</th>
                <th class="p-2">Fecha</th>
                <th class="p-2">Valor</th>
              </tr>
            </thead>
            <tbody class="font-sintony text-tom-thumb text-lg">
                {#each data.rows as row}
                    <tr class="border border-tom-thumb">
                        <td class="text-center p-2 flex justify-center"><img class="w-8 rounded-sm" src={`/${row.person}.png`} alt="avatar of defaulter"/></td>
                        <td class="text-center p-2">{row.date}</td>
                        <td class="text-center p-2">{row.value.toFixed(2)}</td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </body>
    <footer class="flex flex-col justify-end">
        <span class="bg-pewter-dark font-maitree text-3xl text-tom-thumb px-8 py-2">Totales</span>
        <div class="w-full flex justify-between px-8 bg-pewter-dark">
            <div class="flex flex-col gap-4 items-center p-2 font-maitree text-gray-nurse text-2xl">
                <img class="w-24 rounded-sm" src={`/ofontito.png`} alt="avatar of user"/> {data?.totals?.get('ofontito')?.toFixed(2) ?? "0.00"}
            </div>
            <div class="flex flex-col gap-4 items-center p-2 font-maitree text-gray-nurse text-2xl">
                <img class="w-24 rounded-sm" src={`/claudita.png`} alt="avatar of user"/> {data?.totals?.get('claudita')?.toFixed(2) ?? "0.00"}
            </div>
        </div>
    </footer>
</section>