<script>
  export let source;
</script>

{#if !source}
  <div>
    <h4>
      Get started by typing the username of your twitch streamer in the input field above.
    </h4>
  </div>
{:else}
  <iframe
    src={source}
    scrolling="no"
    frameborder="0"
    allowfullscreen
    title="Player"
  />
{/if}

<style>
  div {
    padding: 0 15px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h4 {
    width: 300px;
    max-width: 100%;
    line-height: 1.5;
  }

  iframe {
    flex: 1 1 0%;
    height: 100%;
  }
</style>
