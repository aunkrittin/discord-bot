module.exports = async ({ inter, queue }) => {
  if (!queue)
    return inter.reply({
      content: `No music currently playing... try again ? ❌`,
      ephemeral: true,
    });

  let isPaused = false;
  if (queue.node.isPlaying()) {
    isPaused = true;
    queue.node.pause();
  } else {
    isPaused = false;
    queue.node.resume();
  }

  return inter.reply({
    content: `${
      isPaused
        ? `Current music ${queue.currentTrack.title} paused ✅`
        : `Current music ${queue.currentTrack.title} resumed ✅`
    }`,
    ephemeral: true,
  });
};
