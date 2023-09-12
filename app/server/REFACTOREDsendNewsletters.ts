async function ttttttttttttttt() {
    try {
      const { data: users, error: userError } = await supabaseClient
        .from("users")
        .select("user_id, name, email, latest_send_date");
  
      if (userError) {
        throw userError;
      }
  
      for (const user of users) {
        const subscriptions = await getSubscriptionsForUser(user);
  
        for (const subscription of subscriptions) {
          const podcasts = await getPodcastsForSubscription(subscription, user.latest_send_date);
  
          if (podcasts.length > 0) {
            sendEmail(user, subscription, podcasts);
          }
        }
      }
  
      console.log("Newsletters sent successfully");
    } catch (error) {
      console.error("Error sending newsletters:", error);
    }
  }

  ttttttttttttttt()
  
  function sendEmail(user, subscription, podcasts) {
    // Implement your email sending logic here
    // You can access user, subscription, and podcasts objects in this function
    // Use them to compose and send the email
  
    console.log(`Sending email to ${user.email}`);
    console.log(`Subscription: ${subscription.podcast_channels.name} (${subscription.channel_id})`);
    console.log(`Podcasts:`, podcasts);
  
    // Add your email sending code here using user, subscription, and podcasts data
  }
  