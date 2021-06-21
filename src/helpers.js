export function determineTags(tagsString) {
  let tags = {};
  let splittedTags = tagsString.split(";");
  splittedTags.forEach((tag) => {
    const [key, value] = tag.split("=");
    if (!value.trim()) {
      tags[key] = null;
      return;
    }

    tags[key] = value;
  });

  return tags;
}

export function getMessage(channel, infoString) {
  if (!channel) return;

  let [, message] = infoString.split(`PRIVMSG #${channel} :`);

  if (!message) return "";

  message = message.replace(//g, "");

  return message;

  // const splits = message.trim().split(" ");
  // const fragments = [];

  // for (let i = 0; i < splits.length; i++) {
  //   let word = splits[i];

  //   const bttv = root.bttv.find((b) => b.code === word);
  //   const ffz = root.ffz.find((f) => f.name === word);
  //   const t = root.twitch[word];

  //   if (t) {
  //     fragments.push(`<img src="${t}" title="${word} - Twitch" alt="Emote" />`);
  //     continue;
  //   }

  //   if (bttv) {
  //     fragments.push(
  //       `<img src="https://cdn.betterttv.net/emote/${bttv.id}/1x" title="${bttv.code} - BetterTTV" alt="Emote" />`
  //     );
  //     continue;
  //   }

  //   if (ffz) {
  //     fragments.push(
  //       `<img src="https:${ffz.urls["1"]}" title="${ffz.name} - FrankerFaceZ" alt="Emote" />`
  //     );
  //     continue;
  //   }

  //   word = word.startsWith("@") ? `<strong>${word}</strong>` : word;
  //   fragments.push(word);
  // }

  // return fragments.join(" ");
}
