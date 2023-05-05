<script lang="ts">
	import { deserialize } from "$app/forms";
	import type { ActionResult } from "@sveltejs/kit";
	import { storable } from "../store/store";
	import Button from "../../components/Button.svelte";
	import Card from "../../components/Card.svelte";
	import Indicator from "../../components/Indicator.svelte";

    const thereIsLocalStorage: boolean = typeof window !== 'undefined' && localStorage?.storable;
    let user: string = "";
    let loggedInUser = thereIsLocalStorage ? JSON.parse(window.localStorage.storable) : { user: undefined };
    let error = "";

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
            window.location.reload();
        }
    }

    const logOut = () => {
        const store = storable({});
        store.set({});
        window.location.reload();
    }
</script>
<section class="w-full h-full max-width p-2 md:py-4 md:px-8 flex flex-col gap-6 justify-center overflow-auto bg-light-green">
    {#if loggedInUser?.user}
        <!--<Card className={"flex items-center p-4 gap-6"}>
            <img class="w-20 h-20" src={`/${loggedInUser.user}.png`} alt="avatar of user"/>
            <div class="flex flex-col justify-center">
                <span class="font-maitree text-dark-blue text-2xl">Hola</span>
                <Indicator>Ofontito</Indicator>
            </div>
        </Card>
        <Card className={"flex items-center p-4 gap-6"}>
            <CartIcon color={"var(--dark-blue)"} className={"w-20 h-20"}/>
            <div class="flex flex-col justify-center">
                <Indicator>558.7€</Indicator>
                <span class="font-maitree text-dark-blue text-xl">Gastados este año</span>
            </div>
        </Card>
        <Card className={"flex items-center p-4 gap-6"}>
            <ArrowIcon color={"var(--dark-blue)"} className={"w-20 h-20"}/>
            <div class="flex flex-col justify-center">
                <Indicator>-25%</Indicator>
                <span class="font-maitree text-dark-blue text-xl">Respecto a Marzo</span>
            </div>
        </Card>
        <Card className={"flex items-center p-4 gap-6"}>
            <ScaleIcon color={"var(--dark-blue)"} className={"w-20 h-20"}/>
            <div class="flex flex-col justify-center">
                <Indicator>-32.5€</Indicator>
                <span class="font-maitree text-dark-blue text-xl">Debes a claudita</span>
            </div>
        </Card>-->
        <Card className={"flex items-center p-4 gap-6"}>
            <img class="w-20 h-20" src={`/${loggedInUser.user}.png`} alt="avatar of user"/>
            <div class="flex flex-col justify-center">
                <span class="font-maitree text-dark-blue text-2xl">Hola</span>
                <Indicator>{loggedInUser.user}</Indicator>
            </div>
        </Card>
        <Button className={"w-full"} onClick={logOut}>Cerrar sesión</Button>
    {:else}
        <form class="flex flex-col items-center gap-2 p-2" method="POST" action="?/auth" on:submit={handleSubmit}>
            <span class="font-maitree text-dark-blue text-2xl p-2">¡Buenas! ¿quién eres tú 🧐?</span>
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
            <label class="flex flex-col gap-2 p-2">
                <span class="font-maitree text-dark-blue text-2xl p-2">¿Te sabes la contraseña 🤔?</span>
                <input name="secret" id="secret" type="password" class="bg-main-green p-2 text-dark-blue rounded-sm">
                <Button className={"w-full"} type={"submit"}>Inicia sesión</Button>
                {#if error && error !== ""}<span class="font-sintony text-xs text-error-red">{error}</span>{/if}
            </label>
        </form>
    {/if}
</section>