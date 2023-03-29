const { Player } = require("discord-player");
const { Client, GatewayIntentBits } = require("discord.js");

global.client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.MessageContent,
  ],
  disableMentions: "everyone",
});

// require("dotenv").config();
client.config = require("dotenv").config();

// global.player = new Player(client, client.config.opt.discordPlayer);
global.player = new Player(client, {
  ytdlOptions: client.config.parsed?.YOUTUBE_DL_OPTIONS,
});

require("./src/loader");
require("./src/events");
client.login(client.config.parsed?.TOKEN);
