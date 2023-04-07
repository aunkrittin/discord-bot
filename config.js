module.exports = {
  app: {
    token:
      "CHANGE HERE",
    global: true,
    guild: "698559672864604230",
  },

  opt: {
    maxVol: 100,
    leaveOnEnd: true,
    leaveOnEndCooldown: 300000,
    leaveOnStop: true,
    leaveOnStopCooldown: 300000,
    selfDeaf: true,
    loopMessage: false,
    volume: 75,
    discordPlayer: {
      ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25,
      },
    },
  },
};
