<script>
  import { onMount } from "svelte/internal";
  import { determineTags, getMessage } from "./helpers";

  import Chat from "./components/Chat.svelte";
  import Header from "./components/Header.svelte";
  import Preview from "./components/Preview.svelte";

  let socket = null;

  const state = {
    channel: null,
    chatMessage: "",
    lastChannel: null,
    hiddenChat: true,
    playerSource: null,
    messages: [],
  };
  
  const search = window.location.search;
  const params = new URLSearchParams(search);
  const channel = params.get('channel');

  if (channel) {
    state.channel = channel;
  }


  const onSocketOpen = () => {
    if (!socket) return;
    socket.send(`NICK justinfan0000`);
    socket.send("CAP REQ :twitch.tv/tags");
  };

  const onSocketMessage = (response) => {
    if (!socket) return;

    if (response.data.includes("PRIVMSG")) {
      const { data } = response;
      const [tagsString, infoString] = data.split(/:(.+)/);

      const tags = determineTags(tagsString);
      const message = getMessage(state.lastChannel, infoString);

      if (state.messages.length === 100) {
        state.messages = state.messages.filter((m, i) =>
          i === 0 ? false : true
        );
      }

      state.messages = [
        ...state.messages,
        {
          name: tags["display-name"],
          color: tags.color ?? "#615959",
          message: message,
        },
      ];
    } else if (response.data.includes("JOIN")) {
      state.messages = [];
    } else if (response.data.includes("PING")) {
      socket.send("PONG :tmi.twitch.tv");
    }
  };

  onMount(() => {
    socket = new WebSocket("wss://irc-ws.chat.twitch.tv:443", "irc");
    socket.onopen = onSocketOpen;
    socket.onmessage = onSocketMessage;

    if (state.channel) {
      onSubmit();
    }
  });

  const onSubmit = () => {
    if (!state.channel) return;

    if (!state.hiddenChat) {
      if (state.lastChannel) socket.send(`PART #${state.lastChannel}`);
      socket.send(`JOIN #${state.channel}`);
    }

    // Push the state to history
    const url = new URL(window.location.href);
    url.searchParams.set('channel', state.channel);
    window.history.pushState({}, `Light Itch - ${state.channel}`, url.toString());

    const { hostname } = window.location;
    state.playerSource = `https://player.twitch.tv/?channel=${state.channel}&parent=${hostname}`;
    state.lastChannel = state.channel;

    document.title = `Light Itch - ${state.channel}`;
  };

  const onToggle = () => {
    state.hiddenChat = !state.hiddenChat;

    if (!socket) return;
    if (!state.playerSource) return;

    if (!state.hiddenChat && state.lastChannel)
      socket.send(`JOIN #${state.lastChannel}`);

    if (state.hiddenChat && state.lastChannel)
      socket.send(`PART #${state.lastChannel}`);
  };
</script>

<main class="app">
  <Header
    bind:channel={state.channel}
    on:submit={onSubmit}
    on:toggle={onToggle}
    hiddenChat={state.hiddenChat}
  />
  <section class="container">
    <Preview source={state.playerSource} />
    {#if !state.hiddenChat}
      <Chat messages={state.messages} />
    {/if}
  </section>
</main>

<style>
  .container {
    display: flex;
    color: #fff;
    height: calc(100vh - 60px);
  }

  @media screen and (max-width: 960px) {
    .container {
      flex-direction: column;
    }
  }
</style>
