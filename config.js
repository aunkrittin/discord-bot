module.exports = {
  app: {
    token:
      "MTA4OTcyNDQ0NzYxMjc0Mzc5MA.GnPmKN.jqv_dTIx0L2nWuy1Jy8SpGYZCCqMFhWvxBnqHo",
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
    spotifyBridge: true,
    volume: 75,
    discordPlayer: {
      ytdlOptions: {
        quality: "highestaudio",
        highWaterMark: 1 << 25,
      },
    },
  },
};
