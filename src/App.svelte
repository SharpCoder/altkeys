<script lang="ts">
  import ActionList from './lib/ActionList.svelte';
  import Header from './lib/Header.svelte';
  import { kbd_addhook, kbd_configure, kbd_init } from './lib/kbd';
  import { Sample } from './lib/stories/sample';
  import Story from './lib/Story.svelte';
  import { progress } from './stores';
  import { HalfQwerty } from './lib/keyboards/half-qwerty';

  let story_name = Sample.name;
  let story_content = Sample.content;
  let index = 0;

  progress.subscribe(value => {
    index = value;
  });

  function processKey(code: string) {
    if (code.charAt(0) === story_content.charAt(index)) {
      progress.set(index + 1);
    }
  }

  kbd_init();
  kbd_configure(HalfQwerty);
  kbd_addhook(processKey);

</script>

<style>

  main {
    flex-grow: 1;
    width: 100vw;
    height: 100%;
    margin: 0;
  }

  .content {
    padding: 50px 100px;
  }

  .main-area {
    padding-top: 75px;
  }
</style>

<main>
  <div class="content">
    <div class="top">
      <Header />
      <ActionList />
    </div>
    <div class="main-area">
      <Story content={story_content} />
    </div>
  </div>
</main>

