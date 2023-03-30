<script>
	import FileIcon from "./icons/FileIcon.svelte";
    import HomeIcon from "./icons/HomeIcon.svelte";
	import UserIcon from "./icons/UserIcon.svelte";
</script>

<footer class="w-full bg-tom-thumb grid grid-rows-1 grid-cols-3">
    <a href="/">
        <HomeIcon color={'var(--gray-nurse)'}/>
    </a>
    <a href="/history">
        <FileIcon color={'var(--gray-nurse)'}/>
    </a>
    <button>
        <UserIcon color={'var(--gray-nurse)'}/>
    </button>
</footer>

<style>
    .bg-tom-thumb{
        background-color: var(--tom-thumb);
    }
</style>