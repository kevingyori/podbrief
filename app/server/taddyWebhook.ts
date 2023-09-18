//https://taddy.org/developers/podcast-api/webhooks
//https://github.com/taddyorg/example-project
//mock webhook setup - yarn leszedni

//TESZTELNI egymás után 3 podcast notificationt!!! 1 nagyon hosszú, 1 közepes, 1 NAGYON rövid ebben a sorrendben, hogy teszteljem a multiple notification processinget!
//ngrok api endpoint for testing purposes from live taddy ha lokálban teszteltem
//majd kicserélni rendes domainre a taddy dashboardon

const express = require("express");
require("dotenv").config({ path: require("find-config")(".env") });
const mainPodcastSummaryProcess = require("./main.ts");
const isChannelSubscribed = require("../lib/dbHelpers/isChannelSubscribed.ts");
const isPodcastInTable = require("../lib/dbHelpers/isEpisodeInTable.ts");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON request body

// Middleware to verify TADDY Webhook Secret
const verifyTaddySecret = (req, res, next) => {
  const taddySecret = req.headers["x-taddy-webhook-secret"];

  if (taddySecret !== process.env.TADDY_WEBHOOK_SECRET) {
    return res.status(403).send("Forbidden: Invalid TADDY Webhook Secret");
  }

  next();
};

app.post("/podbrief/processEpisode", verifyTaddySecret, async (req, res) => {
  const podcastData = req.body.data;

  if (podcastData) {
    try {
      console.log(podcastData);

      res
        .status(200)
        .send(`Notification processed successfully for ${podcastData.uuid}`);

      //check if episode is already present in podcasts table (or maybe not needed? supabase sends error anyway?)

      // Check if the channel is subscribed
      const isSubscribed = await isChannelSubscribed(podcastData.podcastSeries?.uuid);

      if (!isSubscribed) {
        return; // Exit the function if channel is not subscribed
      }

      //check if podcast is already present in 'podcasts' table
      const isPodcastAlreadyInTable = await isPodcastInTable(podcastData.uuid)

      if(isPodcastAlreadyInTable){
        return
      }

      //start the creating of the podcast summary and save everything to DB
      await mainPodcastSummaryProcess(podcastData);

    } catch (error) {
      console.error(
        `Error processing Podcast (Webhook) for ${podcastData.uuid}:`,
        error
      );
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.status(400).send("Bad Request: Invalid notification format");
  }
});

app.use((req, res) => {
  res.status(404).send("Not Found");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
