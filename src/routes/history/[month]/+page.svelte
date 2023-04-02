<script lang="ts">
    import type { PageData } from './$types';
    export let data: PageData;
    console.log(data);
</script>
<section class="w-full h-full max-width flex flex-col justify-end border-x-solid border-x-2 border-red-500">
    <table class="table-auto overflow-y-scroll">
        <thead>
          <tr>
            <th>Persona</th>
            <th>Fecha</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
            {#each data.rows as row}
                <tr>
                    <td>{row.person}</td>
                    <td>{row.date}</td>
                    <td>{row.value}</td>
                </tr>
            {/each}
        </tbody>
        <tfoot>
            <tr>
                <td>Total</td>
                <td></td>
                <td></td>
            </tr>
            {#each [...data.totals.keys()] as person}
                <tr>
                    <td>{person}</td>
                    <td></td>
                    <td>{data.totals.get(person)}</td>
                </tr>
            {/each}
        </tfoot>
    </table>
</section>