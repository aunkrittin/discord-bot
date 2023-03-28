const {
  ApplicationCommandOptionType,
  ActionRowBuilder,
  ButtonBuilder,
  EmbedBuilder,
} = require("discord.js");

player.on("error", (queue, error) => {
  console.log(`Error emitted from the queue ${error.message}`);
});

player.on("connectionError", (queue, error) => {
  console.log(`Error emitted from the connection ${error.message}`);
});

player.on("trackStart", async (queue, track) => {
  if (!client.config.opt.loopMessage && queue.repeatMode !== 0) return;

  const embed = new EmbedBuilder()
    .setTitle(track.title)
    .setFields([
      { name: "Author", value: track.author, inline: true },
      { name: "Duration", value: track.duration, inline: true },
    ])
    .setImage(track.thumbnail)
    .setURL(track.url)
    .setColor("#13f857")
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

  const channel = await client.channels.fetch("1090136184837128202");
  const message = await channel.messages.fetch("1090179733792235570");
  const messageId = "1090179733792235570";
  // console.log(message.id, messageId);
  if (messageId === message.id) {
    console.log("exist message");
    message.edit({ embeds: [embed], components: [row1, row2] });
  } else {
    console.log("not exist message");
  }
});

player.on("trackAdd", (queue, track) => {
  queue.metadata
    .send(`Track ${track.title} added in the queue ✅`)
    .then((msg) => {
      setTimeout(() => msg.delete(), 3000);
    });
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
