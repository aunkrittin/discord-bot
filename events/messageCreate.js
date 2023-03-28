const { QueryType } = require("discord-player");
const { ApplicationCommandOptionType } = require("discord.js");
const { CommandInteraction } = require("discord.js");

module.exports = async (client, message) => {
  if (message.author.bot || message.channel.name !== "music-commands") return;

  if (message.content) {
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

    const queue = await player.createQueue(message.guild, {
      metadata: message.channel,
      spotifyBridge: true,
      initialVolume: 75,
      leaveOnEnd: true,
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

    // await message
    //   .reply({
    //     content: `Loading your ${res.playlist ? "playlist" : "track"}... 🎧`,
    //   })

    setTimeout(() => {
      message.delete();
    }, 3000);

    res.playlist ? queue.addTracks(res.tracks) : queue.addTrack(res.tracks[0]);

    if (!queue.playing) await queue.play();
  }
};
