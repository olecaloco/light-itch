<script>
  import { createEventDispatcher } from "svelte";
  import { afterUpdate } from "svelte";

  export let messages;
  export let user;
  export let value = "";
  const dispatch = createEventDispatcher();
  let chat;

  afterUpdate(() => {
    chat.scrollTop = chat.scrollHeight - chat.clientHeight;
  });

  const submit = () => dispatch("submit");

  const isMe = (name) => {
    if (user) {
      return name === user.display_name;
    }

    return false;
  };
</script>

<aside>
  <ul bind:this={chat}>
    {#each messages as message, index (index)}
      <li class:me={isMe(message.name)}>
        <span style="color: {message.color}"
          >{isMe(message.name) ? "[You] " : ""}{message.name}:</span
        >
        {message.message}
      </li>
    {/each}
  </ul>

  {#if !user}
    <a
      href="https://id.twitch.tv/oauth2/authorize?client_id=rlyyav6daabm5yx0d5mtoxh9f6xx6k&redirect_uri=http://localhost:5000&scope=chat:read+chat:edit&response_type=token"
      >Login to Chat</a
    >
  {:else}
    <form on:submit|preventDefault={submit}>
      <input type="text" bind:value placeholder="Chat message" required />
      <button type="submit">Send</button>
    </form>
  {/if}
</aside>

<style>
  aside {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 15px;
    width: 380px;
    height: 100%;
    border-left: 1px solid rgba(255, 255, 255, 0.05);
  }

  ul {
    margin-top: 0;
    padding-left: 0;
    width: 100%;
    height: 100%;
    list-style: none;
    overflow: hidden;
  }

  ul li {
    margin-bottom: 8px;
  }

  ul li.me span {
    padding-left: 5px;
    padding-right: 5px;
    background: #fff;
  }

  ul li span {
    font-weight: bold;
    margin-right: 15px;
  }

  form {
    display: flex;
    align-items: center;
  }

  input {
    flex: 1 1 100%;
    max-width: 100%;
    height: 35px;
    padding: 5px 10px;
    color: #fff;
    border-radius: 25px;
    border: 0;
    background: #0e0e10;
    outline: none;
  }

  button {
    margin-left: 10px;
    padding: 7px 10px;
    background: white;
    color: black;
    border: 1px solid #fff;
    border-radius: 4px;
    cursor: pointer;
  }

  a {
    display: block;
    text-align: center;
    color: #fff;
    text-decoration: none;
  }
</style>
