<script lang="ts">
  import ActionList from './lib/ActionList.svelte';
  import Header from './lib/Header.svelte';
  import Story from './lib/Story.svelte';
  import { kbd_addhook, kbd_configure, kbd_init } from './lib/kbd';
  import { Sherlock1, Sherlock2, Sherlock3, Sherlock4 } from './lib/stories/sherlock';
  import { layout, progress } from './stores';
  import { DefaultKeyboard } from './lib/keyboards/default';
  import Legend from './lib/Legend.svelte';
  import { Layouts } from './lib/keyboards/index';

  const isLocal = window.location.port === '3000';
  
  const stories = [Sherlock1, Sherlock2, Sherlock3, Sherlock4];
  const storyIdx = Math.round(Math.random() * (stories.length - 1));
  const story = stories[storyIdx];
  let { name, author, content } = story;
  let index = 0;
  let lastKey = '';

  progress.subscribe(value => {
    index = value;
  });

  function processKey(code: string) {
    lastKey = code.charAt(0);

    if (code.charAt(0) === content.charAt(index)) {
      progress.set(index + 1);
    }
  }

  function changeLayout(newLayout) {
    localStorage.setItem('layout', newLayout);
    layout.set(newLayout);
  }

  kbd_init();

  layout.subscribe((newLayout) => {
    kbd_configure(Layouts[newLayout] ?? DefaultKeyboard);
  });

  layout.set(localStorage.getItem('layout') ?? 'half-qwerty');

  kbd_addhook(processKey);

</script>

<style>

  main {
    flex-grow: 1;
    width: 100vw;
    height: 100%;
    margin: 0;
    position: relative;
  }

  .content {
    padding: 0px 100px;
  }

  .main-area {
    display: flex;
  }

  .top {
    position: sticky;
    display: flex;
    top: 0;
    background-color: var(--black);
    padding-bottom: 20px;
  }

  .grow {
    flex-grow: 1;
  }

  .last-key {
    font-size: 3rem;
  }

  .action-area {
    display: flex;
    height: 60px;
    padding-top: 20px;
    align-items: center;
  }
</style>

{#if !isLocal}
  <script src="https://proud-twenty.altkeys.net/script.js" data-site="UVFYDOHD" defer></script>
{/if}

<main>
  <div class="content">
    <div class="top">
      <div class="grow">
        <Header />
        <div class="action-area">
          <div class="grow">
            <ActionList defaultLayout={localStorage.getItem('layout') ?? 'half-qwerty'} onLayoutChange={changeLayout} />
          </div>
          <div class="last-key">
            {lastKey}
          </div>
          
        </div>
        <Legend target={content.charAt(index)} />
        
      </div>
    </div>
    <div class="main-area">
      <Story title={name} author={author} content={content} />
    </div>
  </div>
</main>

