<script type="ts">
    import { progress } from '../stores';
    import { Layouts } from './keyboards';
    
    export let onLayoutChange: (str) => void;
    export let defaultLayout: string;

    let keyboards = [];

    for (const keyboard in Layouts) {
        keyboards.push({ value: keyboard, name: Layouts[keyboard].name });
    }

    function reset() {
        progress.set(0);
    }

    function handleChangeLayout(event: any) {
        onLayoutChange(event.target.value);
        document.getElementById("keyboard-picker").blur();

    }
</script>

<style>
    select {
        border: 2px solid var(--white);
        padding: 4px;
        width: 200px;
    }

    select, option, button {

        font-size: 1.2rem;
    }

    button {
        padding: 4px;
        border: 2px solid var(--white);
    }

    .action-list-container {
        padding-top: 10px;
    }

    .action-list {
        display: flex;
        flex-direction: row;
    }

    .action-item {
        margin-right: 15px;
    }
</style>

<div class="action-list-container">
    
    <div class="action-list">
        <div class="action-item">
            <select id="keyboard-picker" bind:value={defaultLayout} on:change={handleChangeLayout}>
                {#each keyboards as kb}
                    <option value={kb.value}>{kb.name}</option>
                {/each}
            </select>
        </div>
        <div class="action-item">
            <button on:click={reset} >
                Reset
            </button>
        </div>
    </div>
</div>