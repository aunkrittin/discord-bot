const { QueryType } = require("discord-player");

module.exports = async (client, message) => {
  if (message.author.bot || message.channel.name !== "music-commands") return;
  const song = message.content;

  const res = await player.search(song, {
    requestedBy: message.member,
    searchEngine: QueryType.AUTO,
  });

  if (!res || !res.tracks.length)
    return message
      .reply({
        content: `No results found ${message.member}... try again ? ❌`,
        ephemeral: true,
      })
      .then((msg) => {
        setTimeout(() => msg.delete(), 3000);
      });

  const queue = await player.nodes.create(message.guild, {
    metadata: {
      channel: message.channel,
      client: message.guild.members.me,
      requestedBy: message.user,
    },
    volume: client.config.parsed?.VOLUME,
    leaveOnEnd: client.config.parsed?.LEAVE_ON_END,
    leaveOnEndCooldown: client.config.parsed?.LEAVE_ON_END_COOLDOWN,
    leaveOnStop: client.config.parsed?.LEAVE_ON_STOP,
    leaveOnStopCooldown: client.config.parsed?.LEAVE_ON_END_COOLDOWN,
    selfDeaf: client.config.parsed?.SELF_DEAF,
  });

  try {
    if (!queue.connection) await queue.connect(message.member.voice.channel);
  } catch {
    await player.deleteQueue(message.guildId);
    return message
      .reply({
        content: `I can't join the voice channel ${message.member}... try again ? ❌`,
        ephemeral: true,
      })
      .then((msg) => {
        setTimeout(() => msg.delete(), 3000);
      });
  }

  // await message.reply({
  //   content: `Loading your ${res.playlist ? "playlist" : "track"}... 🎧`,
  // });

  setTimeout(() => {
    message.delete();
  }, 3000);

  if (res.playlist) {
    queue.addTrack(res.tracks);
  } else {
    queue.addTrack(res.tracks[0]);
  }

  if (queue.node.isPlaying() === false) await queue.node.play();
};
