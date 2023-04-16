<script>
    import "../app.css";
	import Header from "../components/Header.svelte";
</script>

<main class="bg-pewter-light w-screen h-screen flex flex-col items-center">
    <slot />
    <Header />
</main>