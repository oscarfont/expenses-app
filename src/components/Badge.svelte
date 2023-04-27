<script lang="ts">
    export let value: number = 0.00;
</script>

<span class="rounded-full bg-gray-nurse border border-solid border-tom-thumb text-tom-thumb font-sintony text-lg p-2">
    {(value > 0 ? '+' : '') + value.toFixed(2) + ' €'}
</span>