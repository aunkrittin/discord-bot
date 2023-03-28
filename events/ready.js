module.exports = async (client) => {
  console.log(
    `Logged to the client ${client.user.username}\n-> Ready on ${client.guilds.cache.size} servers for a total of ${client.users.cache.size} users`
  );
  client.user.setActivity(client.config.app.playing);
  const channel = client.channels.cache.get("1090136184837128202");
  const fetched = await channel.messages.fetch({ limit: 100 });
  const filtered = fetched.filter((m) => m.id !== "1090179733792235570");
  channel.bulkDelete(filtered);
};
