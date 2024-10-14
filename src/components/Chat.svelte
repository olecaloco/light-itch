<script>
  import { afterUpdate } from "svelte/internal";

  export let messages;
  let chat;
  let wrapper;

  afterUpdate(() => {
    chat.scrollTop = chat.scrollHeight - chat.clientHeight;
  });
</script>

<aside id="chat" bind:this={wrapper}>
  <ul bind:this={chat}>
    {#each messages as message, index (index)}
      <li>
        <strong style="color: {message.color}">{message.name}</strong>
        <span>:</span>
        {message.message}
      </li>
    {/each}
  </ul>
</aside>

<style>
  #chat {
    position: relative;
    flex: 0 0 340px;
    padding: 15px;
    width: 340px;
    height: 100%;
    border-left: 1px solid rgba(255, 255, 255, 0.05);
  }

  ul {
    margin-top: 0;
    margin-bottom: 0;
    padding-left: 0;
    width: 100%;
    height: calc(100% - 17px);
    list-style: none;
    overflow: hidden;
  }

  ul li {
    margin-bottom: 5px;
    font-size: 0.75rem;
    line-height: 1.5;
  }

  ul li:last-child {
    margin-bottom: 0;
  }

  ul li span:last-child {
    margin-right: 5px;
  }

  @media screen and (max-width: 960px) {
    #chat {
      max-height: 500px;
    }
  }
</style>
