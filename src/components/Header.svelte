<script lang="ts">
	import Modal from "./Modal.svelte";
	import FileIcon from "./icons/FileIcon.svelte";
    import HomeIcon from "./icons/HomeIcon.svelte";
	import UserIcon from "./icons/UserIcon.svelte";
    import { page } from '$app/stores';

	let showModal = false;
    let path: string;
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
            <label class="flex flex-col p-2">
              ¡Buenas! ¿quién eres tú 🧐?
              <select name="persona" id="persona">
                <option value="ofontito">ofontito</option>
                <option value="claudita">claudita</option>
              </select>        
            </label>
            <label class="flex flex-col p-2">
               ¿Te sabes la contraseña súper secreta 🤔?
              <input name="secret" id="secret" type="password">
            </label>
            <button type="submit">Enviar</button>
        </form>
    </Modal>
</footer>