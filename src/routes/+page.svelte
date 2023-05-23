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
	import CalendarIcon from "../components/icons/CalendarIcon.svelte";
	import EuroIcon from "../components/icons/EuroIcon.svelte";
	import { getBalanceData } from "./services/BalanceService";

    const thereIsLocalStorage: boolean = typeof window !== 'undefined' && localStorage?.storable;
    const { user } = thereIsLocalStorage ? JSON.parse(window.localStorage.storable) : { user: undefined };
    //const startParts = data?.startDate.split('/');
    //const start = `${startParts[0]}/${startParts[1]}`;
    //const endParts = data?.endDate.split('/');
    //const end = `${endParts[0]}/${endParts[1]}`;

    const handleSubmit = async (event: SubmitEvent) => {
        try{
            event.preventDefault();
            const formData = new FormData(event.target as HTMLFormElement);

            formData.append('user', user);

            const response = await fetch('?/addExpense', {
                method: 'POST',
                body: formData,
            });
            
            const result: ActionResult = deserialize(await response.text());

            if(result.type === "success") window.location.reload();
        }catch(e: any){
            throw e;
        }
    }
</script>

{#await getBalanceData()}
    Loading...
{:then data}
    <section class="w-full h-full max-width p-2 md:py-4 md:px-8 flex flex-col gap-6 overflow-y-auto bg-light-green">
        <Card className={"p-4"}>
            <head class="w-full px-2 py-8 flex gap-4 justify-between border-b-2 border-solid border-dark-blue">
                <span class="flex gap-4">
                    <img class="w-12 md:w-16 rounded-sm" src={`/ofontito.png`} alt="avatar of user"/>
                    <span class="flex flex-col justify-center">
                        <!--<Badge value={data?.personBalance.get('ofontito') ?? 0.00}/>-->
                        {data.personBalance}
                    </span>
                </span>
                <span class="flex gap-4">
                    <img class="w-12 md:w-16 rounded-sm" src={`/claudita.png`} alt="avatar of user"/>
                    <span class="flex flex-col justify-center">
                        <!--<Badge value={data?.personBalance.get('ofontito') ?? 0.00}/>-->
                        {data.personBalance}
                    </span>
                </span>
            </head>
            <section class="flex flex-col px-2 py-6 gap-4">
                <span class="flex gap-4 font-maitree text-3xl text-dark-blue items-center">
                    <ScaleIcon color={"var(--dark-blue)"} className={'w-8 h-8'}/>
                    {"April"}
                </span>
                <Indicator>
                    {data?.monthTotal.toFixed(2) ?? '0.00'} €
                </Indicator>
                <span class="font-sintony text-dark-blue">
                    {data?.startDate} - {data?.endDate}
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
                        {data?.defaulterTotal.toFixed(2) ?? '0.00'} €
                    </Indicator>
                    <span class="font-maitree text-dark-blue text-md">Gastados este mes</span>
                    <span class="font-sintony text-dark-blue text-xs font-bold">Paga la siguiente compra</span>
                </div>
                <span class="flex items-center justify-center">
                    <CartIcon color={"var(--dark-blue)"} className={"w-16 h-16 md:w-18 md:h-18"}/>
                </span>
            </div>
        </Card>
        {#if user}
            <form class="flex flex-col p-2 gap-8" method="POST" action="?/addExpense" on:submit={handleSubmit}>
                <div class="w-full flex flex-col gap-6 justify-center">
                    <label class="w-full flex gap-2 items-center">
                        <CalendarIcon color={"var(--dark-blue)"} className={'w-8 h-8'} />
                        <input name="fecha" id="fecha" type="date" class="flex-grow bg-main-green p-4 font-sintony text-dark-blue rounded-sm">
                    </label>
                    <div class="w-full flex flex-col gap-4">
                        <label class="w-full flex gap-2 items-center">
                            <EuroIcon color={"var(--dark-blue)"} className={'w-8 h-8'} />
                            <input name="gasto" id="gasto" type="number" class="flex-grow bg-main-green p-4 font-sintony text-dark-blue rounded-sm" step=".01" required>
                        </label>
                    </div>
                    <div class="w-full flex gap-2 items-center">
                        <span class="bg-main-green rounded-sm flex-none">
                            <img class="w-16 h-16 md:w-20 md:h-20 p-2 rounded-sm" src={`/${user}.png`} alt="avatar of defaulter"/>
                        </span>
                        <span class="w-full p-2">
                            <Button className={"w-full"} type={"submit"}>Añadir gasto</Button>
                        </span>
                    </div>
                </div> 
            </form>
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
    </section>
{/await}