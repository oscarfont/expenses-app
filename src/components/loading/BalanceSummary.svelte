<script>
	import Card from "../Card.svelte";
	import ScaleIcon from "../icons/ScaleIcon.svelte";
</script>
<Card className={"p-4"}>
    <header class="w-full px-2 py-8 flex gap-4 justify-between border-b-2 border-solid border-dark-blue">
        <span class="flex gap-4">
            <span class="w-12 h-12 md:w-16 md:h-16 rounded-full bg-light-green animate-pulse"></span>
            <span class="flex flex-col justify-center">
                <span class="w-14 h-9 rounded-full bg-light-green p-2 animate-pulse"></span>
            </span>
        </span>
        <span class="flex gap-4">
            <span class="w-12 md:w-16 rounded-full bg-light-green animate-pulse"></span>
            <span class="flex flex-col justify-center">
                <span class="w-14 h-9 rounded-full bg-light-green p-2 animate-pulse"></span>
            </span>
        </span>
    </header>
    <section class="flex flex-col px-2 py-6 gap-4">
        <span class="flex gap-4 font-maitree text-3xl text-dark-blue items-center">
            <ScaleIcon color={"var(--dark-blue)"} className={'w-8 h-8'}/>
            <div class="rounded-sm bg-light-green w-32 h-8 animate-pulse"></div>
        </span>
        <span class="rounded-sm bg-light-green w-32 h-12 animate-pulse"></span>
        <span class="rounded-sm bg-light-green w-48 h-8 animate-pulse"></span>
    </section>
</Card>