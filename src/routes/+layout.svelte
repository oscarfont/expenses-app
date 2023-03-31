<script>
    import "../app.css";
	import Header from "../components/Header.svelte";
</script>

<main class="w-screen h-screen flex flex-col items-center">
    <slot />
    <Header />
</main>