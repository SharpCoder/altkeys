<script type="ts">
    import { progress } from '../stores';
    
    export let onLayoutChange: (str) => void;
    export let defaultLayout: string;

    function reset() {
        progress.set(0);
    }

    function handleChangeLayout(event: any) {
        onLayoutChange(event.target.value);
    }
</script>

<style>
    select {
        border: 2px solid var(--white);
        padding: 4px;
        width: 120px;
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
            <select bind:value={defaultLayout} on:change={handleChangeLayout}>
                <option value="half-qwerty">Half-Qwerty</option>
                <option value="dvorak">Dvorak</option>
                <option value="default">System Default</option>
            </select>
        </div>
        <div class="action-item">
            <button on:click={reset} >
                Reset
            </button>
        </div>
    </div>
</div>