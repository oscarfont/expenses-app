<script lang="ts">
    import { page } from '$app/stores';
	import MenuIcon from "./icons/MenuIcon.svelte";
	import CrossIcon from "./icons/CrossIcon.svelte";

	let showModal = false;
    let path: string;
    const thereIsLocalStorage: boolean = typeof window !== 'undefined' && localStorage?.storable;
    let { user } : { user:string } = thereIsLocalStorage ? JSON.parse(window.localStorage.storable) : { user: "ofontito" };
    let error = "";
    const homePath = "/";
    const historyPath = "/history";
    const profilePath = "/profile";

    let menuToggle = false;

    $: path = $page.url.pathname;

    const toggleMenu = () => {
        if(menuToggle){
            menuToggle = false
        }else{
            menuToggle = true
        }
    }
</script>

<nav class={`nav bg-main-green overflow-hidden w-full max-width flex flex-col gap-2 p-2 ${menuToggle ? 'is-open' : 'is-closed'}`}>
    <button on:click={toggleMenu}>
        <CrossIcon className={`w-8 h-8 ${menuToggle ? '' : 'hidden'}`} color={'var(--dark-blue)'}/>
        <MenuIcon className={`w-8 h-8 ${menuToggle ? 'hidden' : ''}`} color={'var(--dark-blue)'}/>
    </button>
    <a  class={`nav-item font-maitree text-lg text-dark-blue ${menuToggle ? 'is-visible' : 'is-hidden'} ${path === homePath ? 'font-bold' : ''}`} 
        href={homePath}>
        Inicio
    </a>
    <a class={`nav-item font-maitree text-lg text-dark-blue ${menuToggle ? 'is-visible' : 'is-hidden'} ${path === historyPath ? 'font-bold' : ''}`} 
        href={historyPath}>
        Histórico
    </a>
    <a class={`nav-item font-maitree text-lg text-dark-blue ${menuToggle ? 'is-visible' : 'is-hidden'} ${path === profilePath ? 'font-bold' : ''}`} 
        href={profilePath}>
        Perfil
    </a>
</nav>

<style>
    .is-open{
        height: 12rem;
        transition: all 0.5s ease-in-out;
    }

    .is-hidden{
        opacity: 0;
        transform: scaleY(0);
        transition: all 0.5s linear;
    }

    .is-visible{
        opacity: 1;
        transform: scaleY(100%) translateX(25%);
        transition: all 0.5s linear;
    }

    .is-closed{
        height: 4rem;
        transition: all 0.5s ease-out;
    }
</style>