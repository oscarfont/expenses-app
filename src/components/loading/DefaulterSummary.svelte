<script>
	import Card from "../Card.svelte";
	import CartIcon from "../icons/CartIcon.svelte";
</script>

<Card className={"p-4"}>
    <div class="w-full flex justify-around md:gap-8">
        <span class="flex items-center justify-center">
            <div class="rounded-full w-16 h-16 md:w-20 md:h-20 bg-light-green animate-pulse"></div>
        </span>
        <div class="flex flex-col">
            <span class="rounded-sm bg-light-green w-32 h-12 animate-pulse"></span>
            <span class="font-maitree text-dark-blue text-md">Gastados este mes</span>
            <span class="font-sintony text-dark-blue text-xs font-bold">Paga la siguiente compra</span>
        </div>
        <span class="flex items-center justify-center">
            <CartIcon color={"var(--dark-blue)"} className={"w-16 h-16 md:w-18 md:h-18"}/>
        </span>
    </div>
</Card>