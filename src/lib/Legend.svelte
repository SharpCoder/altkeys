<script type="ts">
    import type { KeyboardModule } from "./kbd";
    import { Layouts } from './keyboards';
    import { layout } from '../stores';
    import { DefaultKeyboard } from './keyboards/default';


    let mod: KeyboardModule = DefaultKeyboard;
    layout.subscribe(newLayout => {
        mod = Layouts[newLayout] ?? DefaultKeyboard;    
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
        opacity: 0.75;
    }

    .legend-item, .legend-item-space {
        display: flex;
        margin-right: 15px;
        margin-top: 15px;
        background-color: var(--white);
        color: var(--black);
    }

    .legend-item-space .legend-space {
        padding: 0px 20px;
        width: auto;
    }

    .legend-origin, .legend-replacement, .legend-space {
        justify-content: center;
        align-items: center;
        text-align: center;
        vertical-align: middle;
        width: 1.25rem;
        line-height: 2.25rem;
        font-size: 1.25rem;
    }

    .legend-origin {
        padding-right: 5px;
    }

    .legend-replacement {
        padding-left: 5px; 
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
        <div class="legend-space" data-selected={target === ' '}>Space</div>
    </div>
</div>