<script>
  import { afterUpdate } from "svelte/internal";

  export let messages;
  let chat;

  afterUpdate(() => {
    chat.scrollTop = chat.scrollHeight;
  });
</script>

<aside id="chat">
  <ul bind:this={chat}>
    {#each messages as message, index (index)}
      <li>
        <strong style="color: {message.color}">{message.name}</strong>
        <span>:</span>
        <span class="message">{message.message}</span>
      </li>
    {/each}
  </ul>
</aside>

<style>
  #chat {
    position: relative;
    flex: 0 0 340px;
    padding: 15px;
    max-width: 340px;
    width: 100%;
    height: 100%;
    border-left: 1px solid rgba(255, 255, 255, 0.05);
    overflow-y: hidden;
  }

  ul {
    display: flex;
    flex-direction: column;
    margin-top: 0;
    margin-bottom: 0;
    padding-left: 0;
    width: 100%;
    height: calc(100% - 17px);
    list-style: none;
    overflow-y: hidden;
  }

  ul li {
    margin-bottom: 5px;
    font-size: 0.75rem;
    line-height: 1.5;
    overflow-wrap: anywhere;
  }

  ul li:last-child {
    margin-bottom: 0;
  }

  ul li span:last-child {
    margin-right: 5px;
  }

  ul li span.message {
    color: #fff;
  }

  @media screen and (max-width: 960px) {
    #chat {
      flex: 1 1 0;
      max-width: 100%;
      border-left: 0;
      padding: 8px;
    }

    #chat ul {
      height: 100%;
    }
  }

  @media screen and (max-height: 320px) {
    #chat {
      display: none;
    }
  }
</style>
