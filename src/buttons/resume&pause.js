module.exports = async ({ inter, queue }) => {
  if (!queue || !queue.playing)
    return inter.reply({
      content: `No music currently playing... try again ? ❌`,
      ephemeral: true,
    });

  const success = queue.setPaused(false);

  if (!success) queue.setPaused(true);

  return inter.reply({
    content: `${
      success
        ? `Current music ${queue.currentTrack.title} paused ✅`
        : `Current music ${queue.currentTrack.title} resumed ✅`
    }`,
    ephemeral: true,
  });
};
