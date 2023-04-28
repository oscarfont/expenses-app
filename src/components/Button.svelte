<script lang="ts">
    export let className: string = "";
    export let onClick: Function = () => {};
    export let type: "button" | "submit" | "reset" | null | undefined = "button";
    export let disabled: boolean = false;
</script>

<button class={`rounded-full bg-dark-blue font-firasans text-lg font-bold text-light-blue p-2 ${className}`} 
        type={type} 
        disabled={disabled}
        on:click={() => onClick()}>
    <slot />
</button>