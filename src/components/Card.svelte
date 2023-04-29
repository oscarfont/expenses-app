<script lang="ts">
    export let className: string = '';
</script>
<div class={`bg-main-green rounded ${className}`}>
    <slot />
</div>