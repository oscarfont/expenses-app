<script>
    export let data;
</script>

<section class="w-full h-full max-width flex flex-col border-x-solid border-x-2 border-red-500">
    <header class="font-maitree">
        Siguiente compra: {data?.defaulter}
    </header>
    <body>
        <section class="flex flex-col">
            <div>Balance</div>
            <div>ofontito: {data?.personBalance.get('ofontito')}</div>
            <div>claudita: {data?.personBalance.get('claudita')}</div>
        </section>
    </body>
    <footer class="flex flex-col">
        <form method="POST">
            <label>
              Hola
              <select name="persona" id="persona">
                <option value="ofontito">ofontito</option>
                <option value="claudita">claudita</option>
              </select>        
            </label>
            <label>
               ¿Cuanto te has gastado?
              <input name="gasto" id="gasto" type="number" step=".01">
            </label>
            <button type="submit">Enviar</button>
        </form>
    </footer>
</section>