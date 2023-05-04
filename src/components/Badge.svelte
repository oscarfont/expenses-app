<script lang="ts">
    export let value: number = 0.00;
</script>

<span class="rounded-full bg-light-green border border-solid border-dark-blue text-dark-blue font-sintony text-sm md:text-lg p-2">
    {(value > 0 ? '+' : '') + value.toFixed(2) + ' €'}
</span>