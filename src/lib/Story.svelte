<script type="ts">
    import { progress } from '../stores';

    export var content: string;

    // The index at which to stop highlighting.
    let highlightIndex: number;

    progress.subscribe(value => {
        highlightIndex = value;
    });

    let index = 0;
    let highlighted_content: string = '';
    let remaining_content: string = '';

    $: {
        index = Math.max(Math.min(highlightIndex, content.length), 0);
        highlighted_content = content.substr(0, index);
        remaining_content = content.substr(index);
    }

</script>

<style>
    .story-content {
        font-size: 2rem;
    }

    .highlighted {
        color: red;
    }

</style>

<div class="story-content">
    <span class="highlighted">{highlighted_content}</span><span class="remaining">{remaining_content}</span>
</div>