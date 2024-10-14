<script>
  import { createEventDispatcher } from "svelte";

  export let channel = "";

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
    <button type="submit">🔍</button>
  </form>
  <button on:click={toggle}>💬</button>
</nav>

<style>
  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 0;
    gap: 1rem;
    padding: 15px;
    height: 60px;
    min-height: 60px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  }

  form {
    position: relative;
  }

  form input {
    max-width: 300px;
    width: 100%;
    height: 35px;
    padding: 5px 10px;
    padding-right: 50px;
    color: #fff;
    border-radius: 25px;
    border: 0;
    background: #0e0e10;
    outline: none;
    text-transform: lowercase;
  }

  form button {
    position: absolute;
    top: 50%;
    right: 10px;
    color: #fff;
    border: 0;
    background: transparent;
    cursor: pointer;
    transform: translateY(-50%);
  }

  nav > button {
    color: #fff;
    background: transparent;
    border: 0;
    cursor: pointer;
  }
</style>
