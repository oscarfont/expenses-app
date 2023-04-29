<script lang="ts">
	import type { ActionResult } from "@sveltejs/kit";
	import UnkownUserIcon from "../components/icons/UnkownUserIcon.svelte";
	import { deserialize } from "$app/forms";
	import Badge from "../components/Badge.svelte";
	import Button from "../components/Button.svelte";
	import Indicator from "../components/Indicator.svelte";
	import Card from "../components/Card.svelte";
	import ScaleIcon from "../components/icons/ScaleIcon.svelte";
	import CartIcon from "../components/icons/CartIcon.svelte";
	import WarningIcon from "../components/icons/WarningIcon.svelte";

    export let data;
    const mes = 'Abril';
    const thereIsLocalStorage: boolean = typeof window !== 'undefined' && localStorage?.storable;
    const { user } = thereIsLocalStorage ? JSON.parse(window.localStorage.storable) : { user: undefined };

    const handleSubmit = async (event: SubmitEvent) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);

        formData.append('user', user);

        const response = await fetch('?/addExpense', {
            method: 'POST',
            body: formData,
        });
        
        const result: ActionResult = deserialize(await response.text());

        if(result.type === "success") window.location.reload();
    }
</script>

<!--<section class="w-full h-full max-width flex flex-col overflow-y-auto">
    <header class="w-full max-h-1/4 pt-2 grid grid-cols-12 font-firasans text-4xl text-gray-nurse bg-pewter-dark">
        <span class="flex items-center justify-center col-span-10 md:col-span-8 border-t-4 border-tom-thumb">Siguiente compra</span> 
        <span class="col-span-2 p-1 md:col-span-4 border-t-4 border-tom-thumb ">
            {#if data?.defaulter}
                <img class="w-32 rounded-sm p-2" src={`/${data?.defaulter}.png`} alt="avatar of defaulter"/>
            {:else}
            <UnkownUserIcon color={'var(--tom-thumb)'} className={'w-32 h-32 p-2'} stroke={"2"}/>
            {/if}
        </span>
    </header>
    <body class="max-h-1/2">
        <form class="flex flex-col py-4 gap-8" method="POST" action="?/addExpense" on:submit={handleSubmit}>
            <div class="w-full flex flex-col gap-2 px-8 font-maitree text-3xl text-tom-thumb">
                <span class="py-4 flex items-center gap-4">
                    ¡Hola,
                    {#if thereIsLocalStorage}
                        <img class="w-16 rounded-sm" src={`/${user}.png`} alt="avatar of user"/>
                    {:else}
                        <UnkownUserIcon color={'var(--tom-thumb)'} className={'w-16 h-16'} stroke={"2"}/>
                    {/if}!
                </span>
                <span class="flex items-center">¿Cuánto te has gastado?</span>
            </div>
            <div class="w-full flex flex-col gap-2 justify-center px-8">
                <label class="w-full flex flex-col">
                    <input name="fecha" id="fecha" type="date" class="bg-pewter-dark p-4 font-sintony text-tom-thumb rounded-sm">
                </label>
                <div class="w-full flex gap-4">
                    <label class="w-full flex flex-col">
                        <input name="gasto" id="gasto" type="number" class="bg-pewter-dark p-4 font-sintony text-tom-thumb rounded-sm" step=".01">
                      </label>
                      <button type="submit" class="bg-tom-thumb rounded-sm" disabled={user === undefined}>
                          <SendIcon color={'var(--gray-nurse)'} className={'w-12 h-12 p-2'}/>
                      </button>
                </div>
            </div> 
        </form>
        <section class="w-full flex flex-col text-4xl py-4">
            <span class="w-full flex px-8 py-4 font-firasans text-tom-thumb bg-pewter-dark">Balance {mes}</span>
            <div class="w-full flex justify-between px-8 bg-pewter-dark">
                <div class="flex flex-col gap-4 items-center p-2 font-maitree text-gray-nurse">
                    <img class="w-24 rounded-sm" src={`/ofontito.png`} alt="avatar of user"/> 
                    <Badge value={data?.personBalance.get('ofontito') ?? 0.00}/>
                </div>
                <div class="flex flex-col gap-4 items-center p-2 font-maitree text-gray-nurse">
                    <img class="w-24 rounded-sm" src={`/claudita.png`} alt="avatar of user"/> 
                    <Badge value={data?.personBalance.get('claudita') ?? 0.00}/>
                </div>
            </div>
            <div class="w-full max-h-1/4 flex gap-2 font-firasans text-4xl md:text-4xl bg-pewter-dark px-8 py-8">
                <span class="flex items-center justify-center text-tom-thumb">Gasto total:</span> 
                <span class="flex items-center justify-center">
                    <Indicator>
                        {data?.monthTotal.toFixed(2) ?? '0.00'} €
                    </Indicator>
                </span>
            </div>
        </section>
    </body>
</section>-->

<section class="w-full h-full max-width p-2 md:py-4 md:px-8 flex flex-col gap-6 overflow-y-auto bg-light-green">
    <Card className={"p-4"}>
        <head class="w-full px-2 py-8 flex gap-4 justify-between border-b-2 border-solid border-dark-blue">
            <span class="flex gap-4">
                <img class="w-12 md:w-16 rounded-sm" src={`/ofontito.png`} alt="avatar of user"/>
                <span class="flex flex-col justify-center">
                    <Badge value={data?.personBalance.get('ofontito') ?? 0.00}/>
                </span>
            </span>
            <span class="flex gap-4">
                <img class="w-12 md:w-16 rounded-sm" src={`/claudita.png`} alt="avatar of user"/>
                <span class="flex flex-col justify-center">
                    <Badge value={data?.personBalance.get('claudita') ?? 0.00}/>
                </span>
            </span>
        </head>
        <section class="flex flex-col px-2 py-6 gap-4">
            <span class="flex gap-4 font-maitree text-3xl text-dark-blue items-center">
                <ScaleIcon color={"var(--dark-blue)"} className={'w-8 h-8'}/>
                Abril
            </span>
            <Indicator>
                {data?.monthTotal.toFixed(2) ?? '0.00'} €
            </Indicator>
            <span class="font-sintony text-dark-blue">
                01/04 - 31/04
            </span>
        </section>
    </Card>
    <Card className={"p-4"}>
        <div class="w-full flex justify-around md:gap-8">
            <span class="flex items-center justify-center">
                {#if data?.defaulter}
                    <img class="w-16 h-16 md:w-20 md:h-20 rounded-sm" src={`/${data?.defaulter}.png`} alt="avatar of defaulter"/>
                {:else}
                    <UnkownUserIcon color={'var(--dark-blue)'} className={'w-16 h-16 md:w-20 md:h-20 p-2'} stroke={"2"}/>
                {/if}
            </span>
            <div class="flex flex-col">
                <Indicator>
                    {data?.personBalance.get(data?.defaulter) ?? '0.00'} €
                </Indicator>
                <span class="font-maitree text-dark-blue text-md">Gastados este mes</span>
                <span class="font-sintony text-dark-blue text-xs font-bold">Paga la siguiente compra</span>
            </div>
            <span class="flex items-center justify-center">
                <CartIcon color={"var(--dark-blue)"} className={"w-16 h-16 md:w-18 md:h-18"}/>
            </span>
        </div>
    </Card>
    <form class="flex flex-col p-2 gap-8" method="POST" action="?/addExpense" on:submit={handleSubmit}>
        <div class="w-full flex flex-col gap-6 justify-center">
            <div class="w-full flex gap-2">
                <span class="bg-main-green rounded-full">
                    {#if user}
                        <img class="w-16 h-16 md:w-20 md:h-20 p-2 rounded-sm" src={`/${user}.png`} alt="avatar of defaulter"/>
                    {:else}
                        <UnkownUserIcon color={'var(--dark-blue)'} className={'w-16 h-16 md:w-18 md:h-18 p-2'} stroke={"2"}/>
                    {/if}
                </span>
                <span class="w-full p-2">
                    <Button disabled={user === undefined} className={"w-full"}>Añadir gasto</Button>
                </span>
            </div>
            {#if user}
                <label class="w-full flex flex-col">
                    <input name="fecha" id="fecha" type="date" class="bg-main-green p-4 font-sintony text-dark-blue rounded-sm">
                </label>
                <div class="w-full flex flex-col gap-4">
                    <label class="w-full flex flex-col">
                        <input name="gasto" id="gasto" type="number" class="bg-main-green p-4 font-sintony text-dark-blue rounded-sm" step=".01">
                    </label>
                </div>
            {:else}
                <Card className={"border border-solid border-dark-blue p-2"}>
                    <div class="w-full flex items-center justify-center gap-2">
                        <WarningIcon color={"var(--dark-blue)"} className={"w-12 h-12 md:w-16 md:h-16"}/>
                        <span class="font-maitree text-dark-blue text-md whitespace-nowrap">Para añadir gastos</span>
                        <span class="flex-1 p-2">
                            <Button className={"w-full"}>
                                <a href="/profile">Inicia sesión</a>
                            </Button>
                        </span>
                    </div>
                </Card>
            {/if}
        </div> 
    </form>
</section>