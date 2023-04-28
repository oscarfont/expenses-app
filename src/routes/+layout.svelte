<script>
    import "../app.css";
	import Header from "../components/Header.svelte";
</script>

<main class="bg-light-green w-screen h-screen flex flex-col items-center">
    <Header />
    <slot />
</main>