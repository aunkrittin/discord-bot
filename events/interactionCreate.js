const { EmbedBuilder, InteractionType } = require("discord.js");

module.exports = (client, inter) => {
  if (inter.type === InteractionType.ApplicationCommand) {
    const command = client.commands.get(inter.commandName);

    if (!command)
      return (
        inter.reply({
          embeds: [
            new EmbedBuilder()
              .setColor("#ff0000")
              .setDescription("❌ | Error! Please contact Developers!"),
          ],
          ephemeral: true,
        }),
        client.slash.delete(inter.commandName)
      );
    if (
      command.permissions &&
      !inter.member.permissions.has(command.permissions)
    )
      return inter.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("#ff0000")
            .setDescription(
              `❌ | You need do not have the proper permissions to exacute this command`
            ),
        ],
        ephemeral: true,
      });
    if (command.voiceChannel) {
      if (!inter.member.voice.channel)
        return inter.reply({
          embeds: [
            new EmbedBuilder()
              .setColor("#ff0000")
              .setDescription(`❌ | You are not in a Voice Channel`),
          ],
          ephemeral: true,
        });
      if (
        inter.guild.members.me.voice.channel &&
        inter.member.voice.channel.id !==
          inter.guild.members.me.voice.channel.id
      )
        return inter.reply({
          embeds: [
            new EmbedBuilder()
              .setColor("#ff0000")
              .setDescription(`❌ | You are not in the same Voice Channel`),
          ],
          ephemeral: true,
        });
    }
    command.execute({ inter, client });
  }
  if (inter.type === InteractionType.MessageComponent) {
    console.log(inter.customId);
    const customId = JSON.parse(inter.customId);
    const file_of_button = customId.ffb;
    const queue = player.nodes.get(inter.guildId);
    if (file_of_button) {
      delete require.cache[
        require.resolve(`../src/buttons/${file_of_button}.js`)
      ];
      const button = require(`../src/buttons/${file_of_button}.js`);
      if (button) return button({ client, inter, customId, queue });
    }
  }
};
