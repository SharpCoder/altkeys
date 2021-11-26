<script type="ts">
    import { layout } from '../stores';
    import type { KeyboardModule } from './kbd';
import { Layouts } from './keyboards';
    import { HalfQwerty } from './keyboards/half-qwerty';
    
    let mod: KeyboardModule = HalfQwerty;
    layout.subscribe(newLayout => {
        mod = Layouts[newLayout] ?? HalfQwerty;
    });

</script>

<style>
    h1 {
        font-size: 2rem;
    }
    h2 {
        font-size: 1rem;
    }

    h3 {
        color: var(--accent);
    }

</style>
<div>
    <h1>Alt Keys</h1>
    <h2>Learn new keyboard layouts</h2>
    {#if mod.layered}
    <h3>Hold ALT to apply the mappings</h3>
    {/if}
</div>