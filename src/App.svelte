<script>
  import { onMount } from "svelte";
  import { determineTags, getMessage } from "./helpers";

  import Chat from "./components/Chat.svelte";
  import Header from "./components/Header.svelte";
  import Preview from "./components/Preview.svelte";

  let socket = null;
  const state = {
    user: null,
    channel: null,
    chatMessage: "",
    lastChannel: null,
    hiddenChat: true,
    playerSource: null,
    messages: [],
  };

  const onSocketOpen = () => {
    if (!socket) return;

    const token =
      localStorage.getItem("token") || "4tsb6t6e3dvndjciewqvkfjvh9vpr8";
    let username = "botleca";

    if (state.user) {
      username = state.user.login;
    }

    socket.send(`PASS oauth:${token}`);
    socket.send(`NICK ${username}`);
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

  onMount(async () => {
    if (location.hash) {
      const [, search] = location.hash.split(/#/);
      const params = search.split(/&/);

      for (let i = 0; i < params.length; i++) {
        const param = params[i];
        const [tag, value] = param.split(/=/);

        if (tag === "access_token") {
          localStorage.setItem("token", value);
          break;
        }
      }

      window.location = window.origin;
    }

    const token = localStorage.getItem("token");

    if (token) {
      fetch("https://api.twitch.tv/helix/users", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Client-Id": "rlyyav6daabm5yx0d5mtoxh9f6xx6k",
        },
      })
        .then((data) => data.json())
        .then((response) => {
          state.user = response.data[0];
          console.log(response.data[0]);
        })
        .catch((error) => console.error(error));
    }

    socket = new WebSocket("wss://irc-ws.chat.twitch.tv:443", "irc");
    socket.onopen = onSocketOpen;
    socket.onmessage = onSocketMessage;
  });

  const onSubmit = () => {
    if (!state.channel) return;

    if (!state.hiddenChat) {
      if (state.lastChannel) socket.send(`PART #${state.lastChannel}`);
      socket.send(`JOIN #${state.channel}`);
    }

    state.playerSource = `https://player.twitch.tv/?channel=${state.channel}&parent=light-itch.onrender.com`;
    state.lastChannel = state.channel;
    state.channel = "";
  };

  const onToggle = () => {
    state.hiddenChat = !state.hiddenChat;

    if (!state.playerSource) return;

    if (!state.hiddenChat && state.lastChannel)
      socket.send(`JOIN #${state.lastChannel}`);

    if (state.hiddenChat && state.lastChannel)
      socket.send(`PART #${state.lastChannel}`);
  };

  const onMessageSubmit = () => {
    if (!socket || !state.chatMessage || !state.user) return;

    socket.send(`PRIVMSG #${state.lastChannel} :${state.chatMessage}`);

    state.messages = [
      ...state.messages,
      {
        name: state.user.display_name,
        color: "#000",
        message: state.chatMessage,
      },
    ];

    state.chatMessage = "";
  };
</script>

<main class="app">
  <Header
    bind:channel={state.channel}
    on:submit={onSubmit}
    on:toggle={onToggle}
  />
  <section class="container">
    <Preview source={state.playerSource} />
    {#if !state.hiddenChat}
      <Chat
        bind:value={state.chatMessage}
        on:submit={onMessageSubmit}
        user={state.user}
        messages={state.messages}
      />
    {/if}
  </section>
</main>

<style>
  .container {
    display: flex;
    color: #fff;
    height: calc(100vh - 60px);
  }
</style>
