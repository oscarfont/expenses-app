<script>
	import Total from "../components/Total.svelte";

    export let data;
</script>

<section class="w-full h-full max-width flex flex-col border-x-solid border-x-2 border-red-500">
    <header class="w-full max-h-1/4 pt-2 grid grid-cols-12 font-firasans text-4xl text-emerald-light bg-pewter-dark shadow-md">
        <span class="flex items-center justify-center col-span-10 md:col-span-8 border-t-4 border-emerald-light ">Siguiente compra</span> 
        <span class="col-span-2 p-1 md:col-span-4 border-t-4 border-emerald-light ">
            <img class="w-24 rounded-full p-2" src={`/${data?.defaulter}.png`} alt="avatar of defaulter"/>
        </span>
    </header>
    <body class="max-h-1/2">
        <form class="flex flex-col" method="POST">
            <div class="w-full flex justify-center gap-2 font-maitree text-2xl text-tom-thumb">
                <span class="py-8 flex items-center">¡Hola, </span>
                <span class="py-8 flex items-center gap-2"><img class="w-16 rounded-full" src={`/ofontito.png`} alt="avatar of user"/>!</span>
                <span class="flex items-center">¿Cuanto te has gastado?</span>
            </div>
            <div class="flex">
                <label class="flex flex-col">
                  <input name="gasto" id="gasto" type="number" step=".01">
                </label>
                <button type="submit">SEND</button>
            </div> 
        </form>
        <section class="flex flex-col">
            <div>Balance</div>
            <div>ofontito: {data?.personBalance.get('ofontito')}</div>
            <div>claudita: {data?.personBalance.get('claudita')}</div>
        </section>
    </body>
    <footer class="max-h-1/4 flex flex-col">
        <Total valor={3.75}/>
    </footer>
</section>