<script>
	import Card from "../Card.svelte";
	import FileIcon from "../icons/FileIcon.svelte";
</script>
<Card className={"p-4 flex flex-col gap-4 md:gap-6"}>
    <span class="flex gap-4 font-maitree text-3xl text-dark-blue items-center">
        <FileIcon color={"var(--dark-blue)"} className={'w-8 h-8'}/>
        <div class="rounded-sm bg-light-green w-32 h-8 animate-pulse"></div>
    </span>
    <div class="w-full md:p-2 flex gap-4 justify-between">
        <span class="flex gap-4">
            <span class="w-12 h-12 md:w-16 md:h-16 rounded-full bg-light-green animate-pulse"></span>
            <span class="flex flex-col justify-center">
                <span class="w-14 h-9 rounded-full bg-light-green p-2 animate-pulse"></span>
            </span>
        </span>
        <span class="flex gap-4">
            <span class="w-12 h-12 md:w-16 md:h-16 rounded-full bg-light-green animate-pulse"></span>
            <span class="flex flex-col justify-center">
                <span class="w-14 h-9 rounded-full bg-light-green p-2 animate-pulse"></span>
            </span>
        </span>
    </div>
</Card>