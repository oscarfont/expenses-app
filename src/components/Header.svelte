<script lang="ts">
    import { page } from '$app/stores';
    import { storable } from '../routes/store/store'
	import type { ActionResult } from "@sveltejs/kit";
	import { deserialize } from "$app/forms";
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

<!--
    <Modal bind:showModal>
        {#if loggedUser !== undefined}
            <div class="w-full h-full flex flex-col justify-center items-center p-2">
                <span class="font-firasans text-tom-thumb text-2xl p-2">¡Buenas {loggedUser}! 😊</span>
                <img class="w-24 py-2" src={`/${loggedUser}.png`} alt="avatar of user"/>  
            </div>
        {:else}
            <form class="flex flex-col p-2" method="POST" action="?/auth" on:submit={handleSubmit}>
                <span class="font-firasans text-tom-thumb text-2xl p-2">¡Buenas! ¿quién eres tú 🧐?</span>
                <label class="flex gap-4">
                    <span class="flex gap-2 p-2">
                        <input type="radio" bind:group={user} id="persona-ofontito" value="ofontito"/> 
                        <img class="w-24" src={`/ofontito.png`} alt="avatar of user"/>       
                    </span>
                    <span class="flex gap-2 p-2">
                        <input type="radio" bind:group={user} id="persona-claudita" value="claudita"/> 
                        <img class="w-24" src={`/claudita.png`} alt="avatar of user"/>       
                    </span>
                </label>
                <label class="flex flex-col p-2">
                <span class="font-firasans text-tom-thumb text-2xl p-2">¿Te sabes la contraseña 🤔?</span>
                <div class="flex gap-2">
                        <input name="secret" id="secret" type="password" class="bg-pewter-dark p-2 text-tom-thumb rounded-sm">
                        <button type="submit" class="bg-tom-thumb rounded-sm">
                            <SendIcon color={'var(--gray-nurse)'} className={'w-12 h-12 p-2'}/>
                        </button>
                </div>
                {#if error && error !== ""}<span class="font-sintony text-xs text-error-red">{error}</span>{/if}
                </label>
            </form>
        {/if}
    </Modal>
-->

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