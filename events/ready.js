const { ActivityType } = require("discord.js");

module.exports = async (client) => {
  console.log(
    `Logged to the client ${client.user.username}\n-> Ready on ${client.guilds.cache.size} servers for a total of ${client.users.cache.size} users`
  );
  client.user.setActivity({
    name: "icutmyhair ❤️",
    type: ActivityType.Streaming,
    url: "https://www.twitch.tv/icutmyhair_",
  });

  const channel = client.channels.cache.get("1090136184837128202");
  const fetched = await channel.messages.fetch({ limit: 100 });
  const filtered = fetched.filter((m) => m.id !== "1090453725484683284");
  channel.bulkDelete(filtered);
};
