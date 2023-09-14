const supabaseClient = require("./supabaseConfig.ts");
const sendTempEmail = require("../lib/awsSes/sendTemplatedEmail.ts");

async function sendNewsletters() {
  try {
    // Fetch all users

    const users = await getUsers("user_id, email, latest_send_date");

    // Loop through users and fetch their subscriptions
    for (const user of users) {
      const podcastSummariesOfUser = [];

      //subscriptions: array of objects
      const subscriptionsOfUser = await getSubsriptionsOfUser(user.user_id);

      for (const subscription of subscriptionsOfUser) {
        const podcastsOfChannel = await getPodcastsOfChannel(
          subscription.channel_id,
          user.latest_send_date
        );

        podcastSummariesOfUser.push(...podcastsOfChannel);
      }

      if (podcastSummariesOfUser.length < 1) continue; //skip users that don't have new episodes

      //ÉS MAJD MENTSE IS LE DB - be külön táblába végső-végső email STRINGEKET (konkrétan a kész handlebarst) minden usernek! user id-t meg email string id columnokat is csinálni hozzá! h vissza lehessen keresni error keresés, monitoring, minőségellenőrzés szempontjából
      //ha ez elfailel csak kussban logolja majd aztán folytassa, ne akassza meg a flowt
      //nincs username lol so itt a kódban kicserélni emailre!
      //a podcast name columnt átnevezni TITLE-re! kódban mindenhol kicserélni!
      //miért quotedba rakja sokszor a szöveget az email lol (lehet csak mert többször küldöm ki ugyanazt és az első emaillel egyezik)
      //unsubscribe from email! csinálni hozzá paget url-lel, contact formot is kéne pl ha emailben akarnak panaszkodni akkor be legyen linkelve az email id!!!
      //chatgpt - t kérdezni h nincs e vmi jobb módja a sorban kiküldök 100 emailt dolognak! ha meg egyszerre küldi ki akkor meg vigyázz h pl 1 email/s az amazon rate!
      //!!!!!!végén UPDATE LATEST SEND DATE minden usernek és akkor kövi iterációnál már ezt nézi.!!!!!!!
      //text part htmlData fallbacknek is megcsinálni!

      try {
        //try-catch: If an error occurs because of missing summary, it will be caught, logged, BUT the loop will CONTINUE with the next user.
        const finalEmailJson = createFinalJsonAndSanitize(
          user,
          podcastSummariesOfUser
        );
        //try-catch: If an error occurs with sending the email, it will be caught, logged, BUT the loop will CONTINUE with the next user.
        await sendTempEmail(finalEmailJson);
      } catch (error) {
        console.error(
          `Error occurred while sending email for user ${user.email}:`,
          error
        );
      }
    }

    console.log("Newsletters sent successfully");
  } catch (error) {
    console.error(
      "Error occurred while retrieving podcasts/sending newslletters:",
      error
    );
  }
}

const getUsers = async (columns) => {
  const { data: users, error: userError } = await supabaseClient
    .from("users")
    .select(columns);

  if (userError) {
    throw userError;
  }

  return users;
};

const getSubsriptionsOfUser = async (userID) => {
  const { data: subscriptions, error: subscriptionError } = await supabaseClient
    .from("subscriptions")
    .select("channel_id, podcast_channels(name)") //podcast_channels(name, popularity, lastEpisodeDate, stc)
    .eq("user_id", userID);

  if (subscriptionError) {
    throw subscriptionError;
  }

  return subscriptions;
};

const getPodcastsOfChannel = async (channelID, userLatestSendDate) => {
  const { data: podcastsOfChannel, error: podcastError } = await supabaseClient
    .from("podcasts")
    .select(
      "name, podcast_created_at, summary, image_url, date_published, audio_url"
    )
    .eq("channel_id", channelID)
    .gte("podcast_created_at", userLatestSendDate); //we're using podcast_created_at, not date_published!

  if (podcastError) {
    throw podcastError;
  }

  return podcastsOfChannel;
};

const createFinalJsonAndSanitize = (user, podcastSummaries) => {
  const sanitizedPodcastSummaries = podcastSummaries.map((podcast) => {
    if (!podcast.summary) {
      throw new Error(`Summary is missing for podcast ${podcast.name}`);
    }

    let summary;
    //supabase should validate json when saving to db, but just to be sure
    try {
      summary = JSON.parse(podcast.summary);
    } catch (error) {
      console.error(`Error parsing summary for podcast ${podcast.name} for user ${user.user_id}:`, error);
      return null
    }

    const sanitizedPodcast = {
      title: podcast.name || "No Title Provided",
      podcast_created_at: podcast.podcast_created_at || "No Date Provided",
      audio_url: podcast?.audio_url || "No Audio URL Provided",
      image_url: podcast?.image_url || "No Image URL Provided",
      date_published: podcast?.date_published || "No Publish Date Provided",
      summaryOverview: summary?.summaryOverview || "No Summary Overview Provided",
      actionableInsights: summary?.actionableInsights || "No Actionable Insights Provided",
      keyTakeaways: summary?.keyTakeaways || "No Key Takeaways Provided",
      memorableQuotes: summary?.memorableQuotes || "No Memorable Quotes Provided",
    }

    return sanitizedPodcast
  });

  const finalEmailJson = {
    userEmail: user.email,
    podcasts: sanitizedPodcastSummaries,
  };

  return finalEmailJson;
};

sendNewsletters();
