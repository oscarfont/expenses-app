<script lang="ts">
    export let className: string = "";
    export let onClick: Function = () => {};
    export let type: "button" | "submit" | "reset" | null | undefined = "button";
    export let disabled: boolean = false;
</script>

<button class={`rounded-full bg-tom-thumb font-firasans text-lg font-bold text-gray-nurse p-2 ${className}`} 
        type={type} 
        disabled={disabled}
        on:click={() => onClick()}>
    <slot />
</button>