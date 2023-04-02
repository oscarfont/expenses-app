<script>
	import FileIcon from "./icons/FileIcon.svelte";
    import HomeIcon from "./icons/HomeIcon.svelte";
	import UserIcon from "./icons/UserIcon.svelte";
</script>

<footer class="w-full max-width bg-tom-thumb flex flex-col green-shadow">
    <span class="w-full h-3 bg-transparent border-gray"></span>
    <span class="w-full bg-tom-thumb grid grid-rows-1 grid-cols-3">
        <a href="/">
            <HomeIcon color={'var(--gray-nurse)'} className={'w-16 h-16 p-2'}/>
        </a>
        <a href="/history/Marzo">
            <FileIcon color={'var(--gray-nurse)'} className={'w-16 h-16 p-2'}/>
        </a>
        <button>
            <UserIcon color={'var(--gray-nurse)'} className={'w-16 h-16 p-2'}/>
        </button>
    </span>
</footer>

<style>
    .bg-tom-thumb{
        background-color: var(--tom-thumb);
    }
    
    .border-gray{
        border-bottom: 4px solid var(--gray-nurse)
    }

    .green-shadow{
        -webkit-box-shadow: -1px 0px 5px 0px var(--tom-thumb);
        -moz-box-shadow: -1px 0px 5px 0px var(--tom-thumb);
        box-shadow: -1px 0px 5px 0px var(--tom-thumb);
    }
</style>