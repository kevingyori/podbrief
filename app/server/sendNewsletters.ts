const supabaseClient = require("./supabaseConfig.ts");

async function sendNewsletters() {
  try {
    // Fetch all users
    const { data: users, error: userError } = await supabaseClient
      .from("users")
      .select("user_id, name, email, latest_send_date");

    if (userError) {
      throw userError;
    }

    // Loop through users and fetch their subscriptions
    for (const user of users) {

      //subscriptions: array of objects
      const { data: subscriptions, error: subscriptionError } =
        await supabaseClient
          .from("subscriptions")
          .select("channel_id, podcast_channels(name)") //podcast_channels(name, popularity, lastEpisodeDate, stc)
          .eq("user_id", user.user_id);

      if (subscriptionError) {
        throw subscriptionError;
      }

        for (const subscription of subscriptions) {

          const { data: podcasts, error: podcastError } = await supabaseClient
            .from("podcasts")
            .select("name, podcast_created_at")
            .eq("channel_id", subscription.channel_id)
            .gte("podcast_created_at", user.latest_send_date); //we're using podcast_created_at, not date_published!

          if (podcastError) {
            throw podcastError;
          }

          console.log(
            `Podcasts for user ${user.name}'s (${user.email}) subscription to channel ${subscription.podcast_channels.name} ${subscription.channel_id}:`,
            podcasts
          );

        }

        //if podcasts length < 1 continue, ne dobja be az emailbe!
        //minden emailhez ezt a subscriptions objectet kell adni!!! és handlebars kiloopolja!!
        // sendTempEmail() argumentbe bepasszolni amit kell
        //valahol itt update latest_send_date minden usernek és akkor kövi iterációnál már ezt nézi.
    }

    console.log("Podcasts logged successfully");
  } catch (error) {
    console.error("Error occurred while retrieving podcasts/sending newslletters:", error);
  }
}

sendNewsletters();
