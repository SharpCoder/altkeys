<script type="ts">
    import { progress } from '../stores';

    export var title: string;
    export var author: string;
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
        font-size: 1.75rem;
        line-height: 3.5rem;
        text-align: justify;
    }

    .highlighted {
        color: var(--important);
        border-bottom: 2px solid var(--important);
    }

    header {
        font-size: 1.75rem;
        font-weight: bold;
        color: #888;
        font-style: italic;
        display: none;
    }

    .story {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
    }

</style>
<div class="story">
    <div class="story-metadata">
        <header>{title} | By {author}</header>
    </div>
    <div class="story-content">
        <span class="highlighted">{highlighted_content}</span><span class="remaining">{remaining_content}</span>
    </div>
</div>