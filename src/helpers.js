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
}
