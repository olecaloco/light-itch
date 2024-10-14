<script>
  import { createEventDispatcher } from "svelte";

  export let channel = "";
  export let hiddenChat;

  $: label = hiddenChat ? "Show Chat" : "Hide Chat";

  const dispatch = createEventDispatcher();

  const submit = () => dispatch("submit");
  const toggle = () => dispatch("toggle");
</script>

<nav>
  <form on:submit|preventDefault={submit}>
    <input
      name="channel"
      type="search"
      required
      placeholder="Enter channel name"
      bind:value={channel}
    />
    <button type="submit">Submit</button>
  </form>
  <button on:click={toggle}>{label}</button>
</nav>

<style>
  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0;
    padding: 15px;
    height: 60px;
    min-height: 60px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  form input {
    max-width: 100%;
    width: 300px;
    height: 35px;
    padding: 5px 10px;
    color: #fff;
    border-radius: 25px;
    border: 0;
    background: #0e0e10;
    outline: none;
  }

  form button {
    color: #fff;
    border: 0;
    background: transparent;
    cursor: pointer;
  }

  nav > button {
    color: #fff;
    background: transparent;
    border: 0;
    cursor: pointer;
  }
</style>
