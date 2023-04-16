<script lang="ts">
	import Modal from "./Modal.svelte";
	import FileIcon from "./icons/FileIcon.svelte";
    import HomeIcon from "./icons/HomeIcon.svelte";
	import UserIcon from "./icons/UserIcon.svelte";
    import { page } from '$app/stores';

	let showModal = false;
    let path: string;
    let persona = "ofontito";
    const homePath = "/";
    const historyPath = "/history";
    const activeColor = "var(--gray-nurse)";
    const activeStroke = "2";

    $: path = $page.url.pathname;
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
        <form class="flex flex-col p-2" method="POST">
            <span class="font-firasans text-tom-thumb text-2xl p-2">¡Buenas! ¿quién eres tú 🧐?</span>
            <div class="flex gap-4">
                <label class="flex gap-2 p-2">
                    <input type="radio" bind:group={persona} value="ofontito"/> 
                    <img class="w-24" id="persona-ofontito" src={`/ofontito.png`} alt="avatar of user"/>       
                </label>
                <label class="flex gap-2 p-2">
                    <input type="radio" bind:group={persona} value="claudita"/> 
                    <img class="w-24" id="persona-claudita" src={`/claudita.png`} alt="avatar of user"/>       
                </label>
            </div>
            <label class="flex flex-col p-2">
               <span class="font-firasans text-tom-thumb text-2xl p-2">¿Te sabes la contraseña 🤔?</span>
              <input name="secret" id="secret" type="password">
            </label>
            <button type="submit">Enviar</button>
        </form>
    </Modal>
</footer>