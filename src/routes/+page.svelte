<script>
	import Total from "../components/Total.svelte";

    export let data;
</script>

<section class="w-full h-full max-width flex flex-col border-x-solid border-x-2 border-red-500">
    <header class="w-full max-h-1/4 pt-4 grid grid-cols-12 font-firasans text-4xl text-gray-nurse">
        <span class="flex items-center justify-center col-span-10 md:col-span-8 md:ml-2 rounded-full bg-tom-thumb shadow-md">Siguiente compra</span> 
        <span class="col-span-2 p-1 md:col-span-4">
            <img class="w-24 rounded-full bg-tom-thumb shadow-md p-2" src={`/${data?.defaulter}.png`} alt="avatar of defaulter"/>
        </span>
    </header>
    <body class="max-h-1/2">
        <form class="flex flex-col" method="POST">
            Hola <img class="w-16 rounded-full" src={`/ofontito.png`} alt="avatar of user"/>
            <div class="flex">
                <label class="flex flex-col">
                    ¿Cuanto te has gastado?
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