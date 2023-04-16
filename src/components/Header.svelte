<script>
	import Modal from "./Modal.svelte";
	import FileIcon from "./icons/FileIcon.svelte";
    import HomeIcon from "./icons/HomeIcon.svelte";
	import UserIcon from "./icons/UserIcon.svelte";

	let showModal = false;
</script>

<footer class="w-full max-width bg-tom-thumb flex flex-col green-shadow">
    <span class="w-full h-3 bg-transparent border-gray"></span>
    <span class="w-full bg-tom-thumb grid grid-rows-1 grid-cols-3">
        <a href="/">
            <HomeIcon color={'var(--pewter)'} className={'w-16 h-16 p-2'}/>
        </a>
        <a href="/history">
            <FileIcon color={'var(--pewter)'} className={'w-16 h-16 p-2'}/>
        </a>
        <button on:click={() => (showModal = true)}>
            <UserIcon color={'var(--pewter)'} className={'w-16 h-16 p-2'}/>
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

<style>
    .bg-tom-thumb{
        background-color: var(--tom-thumb);
    }
    
    .border-gray{
        border-bottom: 4px solid var(--pewter)
    }

    .green-shadow{
        -webkit-box-shadow: -1px 0px 5px 0px var(--tom-thumb);
        -moz-box-shadow: -1px 0px 5px 0px var(--tom-thumb);
        box-shadow: -1px 0px 5px 0px var(--tom-thumb);
    }
</style>