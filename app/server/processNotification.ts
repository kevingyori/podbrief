const isChannelSubscribed = require("../lib/dbHelpers/isChannelSubscribed.ts");
const isPodcastInTable = require("../lib/dbHelpers/isEpisodeInTable.ts");

const processPodcastNotification = async (podcastData, podcastQueue) => {
  console.log(`Received notification for podcast ${podcastData.uuid}`);

  //Check if the channel is subscribed
  const isSubscribed = await isChannelSubscribed(
    podcastData.podcastSeries?.uuid
  );

  if (!isSubscribed) {
    return; // Exit the function if channel is not subscribed
  }

  //check if podcast is already present in 'podcasts' table
  const isPodcastAlreadyInTable = await isPodcastInTable(podcastData.uuid);

  if (isPodcastAlreadyInTable) {
    return;
  }

  //enqueue the podcast to processing
  podcastQueue.enqueue(podcastData);
};

module.exports = processPodcastNotification;
