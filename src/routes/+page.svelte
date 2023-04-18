<script lang="ts">
	import type { ActionResult } from "@sveltejs/kit";
	import SendIcon from "../components/icons/SendIcon.svelte";
	import UnkownUserIcon from "../components/icons/UnkownUserIcon.svelte";
	import { deserialize } from "$app/forms";

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

        console.log(result);
    }
</script>

<section class="w-full h-full max-width flex flex-col border-x-solid border-x-2 border-tom-thumb">
    <header class="w-full max-h-1/4 pt-2 grid grid-cols-12 font-firasans text-4xl text-gray-nurse bg-pewter-dark">
        <span class="flex items-center justify-center col-span-10 md:col-span-8 border-t-4 border-tom-thumb">Siguiente compra</span> 
        <span class="col-span-2 p-1 md:col-span-4 border-t-4 border-tom-thumb ">
            <img class="w-32 rounded-sm p-2" src={`/${data?.defaulter}.png`} alt="avatar of defaulter"/>
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
                    <img class="w-24 rounded-sm" src={`/ofontito.png`} alt="avatar of user"/> {data?.personBalance.get('ofontito')}
                </div>
                <div class="flex flex-col gap-4 items-center p-2 font-maitree text-gray-nurse">
                    <img class="w-24 rounded-sm" src={`/claudita.png`} alt="avatar of user"/> {data?.personBalance.get('claudita')}
                </div>
            </div>
            <div class="w-full max-h-1/4 flex gap-2 font-firasans text-4xl md:text-4xl bg-pewter-dark px-8 py-8">
                <span class="flex items-center justify-center text-tom-thumb">Gasto total:</span> 
                <span class="flex items-center justify-center text-gray-nurse">{data?.monthTotal.toFixed(2) ?? '0.00'} €</span>
            </div>
        </section>
    </body>
</section>