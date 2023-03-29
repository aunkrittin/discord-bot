const { QueryType } = require("discord-player");

module.exports = async (client, message) => {
  if (message.author.bot || message.channel.name !== "music-commands") return;
  const song = message.content;

  const res = await player.search(song, {
    requestedBy: message.member,
    searchEngine: QueryType.YOUTUBE,
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
    volume: client.config.opt.volume,
    leaveOnEnd: client.config.opt.leaveOnEnd,
    leaveOnEndCooldown: client.config.opt.leaveOnEndCooldown,
    leaveOnStop: client.config.opt.leaveOnStop,
    leaveOnStopCooldown: client.config.opt.leaveOnStopCooldown,
    selfDeaf: client.config.opt.selfDeaf,
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

  if (!queue.node.isPlaying()) await queue.node.play();
};
