<script type="ts">
    import { layout } from '../stores';
    import type { KeyboardModule } from './kbd';
    import { Layouts } from './keyboards';
    import { DefaultKeyboard } from './keyboards/default';
    
    let mod: KeyboardModule = DefaultKeyboard;
    layout.subscribe(newLayout => {
        mod = Layouts[newLayout] ?? DefaultKeyboard;
    });

</script>

<style>
    h1 {
        font-size: 2rem;
    }

    h3 {
        color: var(--accent);
    }

    .container {
        display: flex;
        align-items: center;
        padding-top: 25px;
    }

    .grow {
        flex-grow: 1;
    }

</style>
<div class="container">
    <div class="grow">
        <h1>Alt Keys</h1>
        {#if mod.layered}
        <h3>Hold ALT to apply the mappings</h3>
        {/if}
    </div>
</div>