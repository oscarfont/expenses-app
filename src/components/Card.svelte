<script lang="ts">
    export let className: string = '';
</script>
<div class={`p-4 bg-gray-nurse rounded ${className}`}>
    <slot />
</div>