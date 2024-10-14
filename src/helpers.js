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

/**
 * 
 * @param {string} channel Channel Name
 * @param {string} infoString IRC info string
 * @returns {string} Splitted Message
 */
export function getMessage(channel, infoString) {
  if (!channel) return;

  let [, message] = infoString.split(`PRIVMSG #${channel.toLowerCase()} :`);

  if (!message) return "";  

  return message;
}
