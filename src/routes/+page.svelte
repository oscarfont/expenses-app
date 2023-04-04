<section class="w-full h-full max-width flex flex-col border-x-solid border-x-2 border-red-500">
    <header>
        Siguiente compra: ofontito
    </header>
    <body>
        <section class="flex flex-col">
            <div>Balance</div>
            <div>ofontito: -8.00</div>
            <div>claudita: +8.00</div>
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