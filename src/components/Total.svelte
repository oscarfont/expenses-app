<script lang="ts">
    export let valor: number;
</script>

<div class="w-full max-h-1/4 pt-4 font-firasans text-4xl md:text-6xl text-gray-nurse flex gap-2">
    <span class="flex items-center justify-center rounded-full bg-tom-thumb shadow-md p-4">Total</span> 
    <span class="flex items-center justify-center bg-tom-thumb shadow-md rounded-full p-4">{valor.toFixed(2) ?? '0.00'} €</span>
</div>