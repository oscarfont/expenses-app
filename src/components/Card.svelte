<script lang="ts">
    export let className: string = '';
</script>
<div class={`p-4 bg-main-green rounded ${className}`}>
    <slot />
</div>