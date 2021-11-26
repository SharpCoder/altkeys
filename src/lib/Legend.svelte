<script type="ts">
    import type { KeyboardModule } from "./kbd";
    import { Layouts } from './keyboards';
    import { layout } from '../stores';
    import { HalfQwerty } from './keyboards/half-qwerty';


    let mod: KeyboardModule = HalfQwerty;
    layout.subscribe(newLayout => {
        mod = Layouts[newLayout];    
    });

    export let target: string;

    let mappings = [];
    $: {
        mappings = [];
        for (const mapping in mod.mapping) {
            mappings.push({
                origin: mapping,
                replacement: mod.mapping[mapping],
            });
        }
    }

</script>

<style>
    .legend {
        display: flex;
        flex-wrap: wrap;
        opacity: 0.5;
    }

    .legend-item, .legend-item-space {
        display: flex;
        margin-right: 15px;
        margin-top: 35px;
        outline: 2px solid var(--white);
        background-color: var(--white);
        color: var(--black);
    }

    .legend-item-space .legend-origin {
        padding: 0px 20px;
    }

    .legend-origin, .legend-replacement {
        min-width: 20px;
        min-height: 20px;
        justify-content: center;
        align-items: center;
        text-align: center;
        vertical-align: middle;
        font-size: 1.25rem;
        outline: 2px solid var(--black);
    }

    .legend-replacement {
        outline: 2px solid var(--black);
        background-color: #ccc;
    }

    .legend-origin[data-selected=true],
    .legend-replacement[data-selected=true] {
        background-color: var(--important);;
    }

    @media(max-width: 600px) {
        .legend-item[data-selected=false] {
            display: none;
        }
    }
</style>

<div class="legend">
    {#each mappings as key} 
        <div class="legend-item" data-selected={(target.toLowerCase() === key.origin || target.toLowerCase() === key.replacement) && mod.layered === true}>
            <div class="legend-origin" data-selected={target.toLowerCase() === key.origin && mod.layered === true}>
                {key.origin}
            </div>
            <div class="legend-replacement" data-selected={target.toLowerCase() === key.replacement}>
                {key.replacement}
            </div>
        </div>
    {/each}
    <div class="legend-item-space">
        <div class="legend-origin" data-selected={target === ' '}>Space</div>
    </div>
</div>