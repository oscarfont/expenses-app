<script lang="ts">
	import Modal from "./Modal.svelte";
	import FileIcon from "./icons/FileIcon.svelte";
    import HomeIcon from "./icons/HomeIcon.svelte";
	import UserIcon from "./icons/UserIcon.svelte";
    import { page } from '$app/stores';
	import SendIcon from "./icons/SendIcon.svelte";
    import { storable } from '../routes/store/store'
	import type { ActionResult } from "@sveltejs/kit";
	import { deserialize } from "$app/forms";

	let showModal = false;
    let path: string;
    const thereIsLocalStorage: boolean = typeof window !== 'undefined' && localStorage?.storable;
    let { user } : { user:string } = thereIsLocalStorage ? JSON.parse(window.localStorage.storable) : { user: "ofontito" };
    const loggedUser = thereIsLocalStorage ? JSON.parse(window.localStorage.storable)?.user : undefined;
    let error = "";
    const homePath = "/";
    const historyPath = "/history";
    const activeColor = "var(--gray-nurse)";
    const activeStroke = "2";

    $: path = $page.url.pathname;

    const handleSubmit = async (event: SubmitEvent) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);

        formData.append('user', user);

        const response = await fetch('?/auth', {
            method: 'POST',
            body: formData,
        });

        if(!response.ok) error = `Contraseña incorrecta. ¿Seguro que eres ${user}...? 🤔`;
        
        const result: ActionResult = deserialize(await response.text());

        if (result.type === 'success') {
            const store = storable({user: user, token: result.data?.token});
            store.set({user: user, token: result.data?.token});
        }

        window.location.reload();
    }
</script>

<footer class="w-full max-width bg-pewter-dark flex flex-col">
    <span class="w-full h-3 bg-transparent border-b-4 border-solid border-tom-thumb"></span>
    <span class="w-full bg-pewter-dark grid grid-rows-1 grid-cols-3">
        <a href={homePath} class="flex justify-end">
            <HomeIcon color={path === homePath ? activeColor : 'var(--tom-thumb)'} className={'w-16 h-16 p-2'} stroke={path === homePath ? activeStroke : "1"}/>
        </a>
        <a href={historyPath} class="flex justify-center">
            <FileIcon color={path === historyPath ? activeColor : 'var(--tom-thumb)'} className={'w-16 h-16 p-2'} stroke={path === historyPath ? activeStroke : "1"}/>
        </a>
        <button on:click={() => (showModal = true)} class="flex justify-start">
            <UserIcon color={showModal ? activeColor : 'var(--tom-thumb)'} className={'w-16 h-16 p-2'} stroke={showModal ? activeStroke : "1"}/>
        </button>
    </span>
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
</footer>