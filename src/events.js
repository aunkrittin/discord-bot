const {
  ApplicationCommandOptionType,
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
} = require("discord.js");
const fs = require("fs");

player.on("error", (queue, error) => {
  console.log(`Error emitted from the queue ${error.message}`);
  const errorMessage = `Error emitted from the queue ${error.message}\n`;
  fs.appendFile("error.log", errorMessage, (err) => {
    if (err) throw err;
    console.log("Error logged to file");
  });
});

player.on("connectionError", (queue, error) => {
  console.log(`Error emitted from the connection ${error.message}`);
});

player.on("stopped", (queue, track, payload) => {
  console.log(`do stopped event`);
});

player.on("trackStart", async (queue, track) => {
  console.log(`do trackStart event`);
  const channel = await client.channels.fetch("1090136184837128202");
  const message = await channel.messages.fetch("1090179733792235570");
  // const messageId = "1090179733792235570";
  const songs = queue.tracks.length;
  const nextSongs =
    songs > 5
      ? `And **${songs - 5}** other song(s)...`
      : `In the playlist **${songs}** song(s)...`;

  if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return;

  // console.log(message.embeds[0]);
  const embed = new EmbedBuilder()
    .setTitle("icutmyhair#2000 ❤️")
    .setDescription(nextSongs)
    .setFields([
      { name: "Author", value: track.author, inline: true },
      { name: "Duration", value: track.duration, inline: true },
    ])
    .setImage(track.thumbnail)
    .setURL(track.url)
    .setColor("#13f857")
    .setTimestamp()
    .setFooter({
      text: `Requested by ${track.requestedBy.username}`,
    });

  const back = new ButtonBuilder()
    .setLabel("Back")
    .setCustomId(JSON.stringify({ ffb: "back" }))
    .setStyle("Primary");

  const skip = new ButtonBuilder()
    .setLabel("Skip")
    .setCustomId(JSON.stringify({ ffb: "skip" }))
    .setStyle("Primary");

  const resumepause = new ButtonBuilder()
    .setLabel("Resume & Pause")
    .setCustomId(JSON.stringify({ ffb: "resume&pause" }))
    .setStyle("Danger");

  const save = new ButtonBuilder()
    .setLabel("Save")
    .setCustomId(JSON.stringify({ ffb: "savetrack" }))
    .setStyle("Success");

  const volumeup = new ButtonBuilder()
    .setLabel("Volume up")
    .setCustomId(JSON.stringify({ ffb: "volumeup" }))
    .setStyle("Primary");

  const volumedown = new ButtonBuilder()
    .setLabel("Volume Down")
    .setCustomId(JSON.stringify({ ffb: "volumedown" }))
    .setStyle("Primary");

  const loop = new ButtonBuilder()
    .setLabel("Loop")
    .setCustomId(JSON.stringify({ ffb: "loop" }))
    .setStyle("Danger");

  const np = new ButtonBuilder()
    .setLabel("Now Playing")
    .setCustomId(JSON.stringify({ ffb: "nowplaying" }))
    .setStyle("Secondary");

  const queuebutton = new ButtonBuilder()
    .setLabel("Queue")
    .setCustomId(JSON.stringify({ ffb: "queue" }))
    .setStyle("Secondary");

  const row1 = new ActionRowBuilder().addComponents(
    back,
    queuebutton,
    resumepause,
    np,
    skip
  );
  const row2 = new ActionRowBuilder().addComponents(
    volumedown,
    loop,
    save,
    volumeup
  );

  message.edit({ embeds: [embed], components: [row1, row2] });
});

player.on("trackAdd", async (queue, track) => {
  queue.metadata
    .send(`Track ${track.title} added in the queue ✅`)
    .then((msg) => {
      setTimeout(() => msg.delete(), 3000);
    });

  const channel = await client.channels.fetch("1090136184837128202");
  const message = await channel.messages.fetch("1090179733792235570");
  const messageId = "1090179733792235570";

  const songs = queue.tracks.length;
  const nextSongs =
    songs > 5
      ? `And **${songs - 5}** other song(s)...`
      : `In the playlist **${songs}** song(s)...`;

  const tracks = queue.tracks.map(
    (track, i) =>
      `**${i + 1}** - ${track.title} | ${track.author} (requested by : ${
        track.requestedBy.username
      })`
  );

  // const embed = new EmbedBuilder()
  //   .setTitle("icutmyhair#2000 ❤️")
  //   .setDescription(
  //     `Current ${queue.current.title}\n\n${tracks
  //       .slice(0, 5)
  //       .join("\n")}\n\n${nextSongs}`
  //   )
  //   .setFields([
  //     { name: "Author", value: track.author, inline: true },
  //     { name: "Duration", value: track.duration, inline: true },
  //   ])
  //   .setImage(track.thumbnail)
  //   .setURL(track.url)
  //   .setColor("#13f857")
  //   .setTimestamp()
  //   .setFooter({
  //     text: `Requested by ${track.requestedBy.username}`,
  //   });

  // if (messageId === message.id) {
  //   console.log("exist message");
  //   message.edit({ embeds: [embed] });
  // } else {
  //   console.log("not exist message");
  // }
});

player.on("botDisconnect", async (queue, track) => {
  queue.metadata
    .send(
      "I was manually disconnected from the voice channel, clearing queue... ❌"
    )
    .then((msg) => {
      setTimeout(() => msg.delete(), 3000);
    });
  console.log("botDisconnect");

  const channel = await client.channels.fetch("1090136184837128202");
  const message = await channel.messages.fetch("1090179733792235570");
  const messageId = "1090179733792235570";

  const newEmbed = new EmbedBuilder()
    .setTitle("พิมพ์ลงชื่อเพื่อเล่นเพลง")
    .setImage(channel.guild.iconURL())
    .setColor("#13f857")
    .setFooter({
      text: `Made by @icutmyhair#2000`,
    });

  message.edit({ embeds: [newEmbed] });
});

player.on("channelEmpty", (queue) => {
  queue.metadata
    .send("Nobody is in the voice channel, leaving the voice channel... ❌")
    .then((msg) => {
      setTimeout(() => msg.delete(), 3000);
    });
});

player.on("queueEnd", (queue) => {
  queue.metadata.send("I finished reading the whole queue ✅").then((msg) => {
    setTimeout(() => msg.delete(), 3000);
  });
});

player.on("tracksAdd", (queue, tracks) => {
  queue.metadata
    .send(`All the songs in playlist added into the queue ✅`)
    .then((msg) => {
      setTimeout(() => msg.delete(), 3000);
    });
});
