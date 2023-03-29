const { EmbedBuilder } = require("discord.js");
module.exports = async ({ client, inter, queue }) => {
  if (!queue || !queue.node.isPlaying())
    return inter.reply({
      content: `No music currently playing... try again ? ❌`,
      ephemeral: true,
    });

  const track = queue.currentTrack;

  const methods = ["disabled", "track", "queue"];

  // const timestamp = queue.getPlayerTimestamp();

  // const trackDuration =
  // timestamp.progress == "Infinity" ? "infinity (live)" : track.duration;

  // const progress = queue.node.createProgressBar();

  const embed = new EmbedBuilder()
    .setAuthor({
      name: track.title,
      iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }),
    })
    .setThumbnail(track.thumbnail)
    .setDescription(
      `Volume **${queue.options.volume}**%\nLoop mode **${
        methods[queue.repeatMode]
      }**\nRequested by ${track.requestedBy}`
    )
    .setFooter({
      text: "icutmyhair ❤️",
      iconURL: inter.member.avatarURL({ dynamic: true }),
    })
    .setColor("ff0000")
    .setTimestamp();

  inter.reply({ embeds: [embed], ephemeral: true });
};
