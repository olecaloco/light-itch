<script>
  import interactjs from "interactjs";
  import { afterUpdate, onDestroy } from "svelte";

  export let messages;
  let chat;
  let wrapper;
  let floating = false;

  $: floatLabel = floating ? "Unfloat" : "Float";

  onDestroy(() => {
    if (floating) {
      interactjs('#chat').unset();
    }
  })

  afterUpdate(() => {
    chat.scrollTop = chat.scrollHeight - chat.clientHeight;
  });

  const initializeFloatingChat = () => {
    floating = true;
    const position = { x: 0, y: 0 };

    interactjs("#chat").draggable({
      listeners: {
        move(event) {
          position.x += event.dx;
          position.y += event.dy;

          event.target.style.transform = `translate(${position.x}px, ${position.y}px)`;
        },
      },
    });
  };

  const toggleMode = () => {
    if (floating) {
      interactjs("#chat").unset();
      wrapper.style.transform = "initial";
      floating = false;
      return;
    }

    initializeFloatingChat();
  };
</script>

<aside class:floating id="chat" bind:this={wrapper}>
  <button on:click={toggleMode}>{floatLabel}</button>
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

  #chat.floating {
    position: fixed;
    top: 90px;
    right: 0;
    height: 300px;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.5);
  }

  #chat button {
    position: absolute;
    right: 100%;
    margin-right: 10px;
    color: #00aeff;
    border: none;
    border-radius: 4px;
    background: rgba(0,0,0,0.5);
    cursor: pointer;
  }

  #chat button:hover {
    background: #fff;
  }

  #chat.floating button {
    bottom: 100%;
    right: 0;
    margin-right: 0;
    margin-bottom: 10px;
  }

  ul {
    margin-top: 0;
    margin-bottom: 0;
    padding-left: 0;
    width: 100%;
    height: 100%;
    list-style: none;
    overflow: hidden;
  }

  ul li {
    margin-bottom: 5px;
    font-size: 13px;
    line-height: 1.5;
  }

  ul li:last-child {
    margin-bottom: 0;
  }

  ul li span:last-child {
    margin-right: 5px;
  }
</style>
