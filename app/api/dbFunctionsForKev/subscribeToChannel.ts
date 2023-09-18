const supabase = require("../../server/supabaseConfig.ts");

const subscribeToChannel = async (userID, channelID, channelName) => {
  try {
    //add channel to podcasts_channels table if not already present
    insertChannelToPodcastChannelsTable(channelID, channelName);

    // Check if the subscription already exists
    const { data, error } = await supabase
      .from("subscriptions")
      .select()
      .eq("channel_id", channelID)
      .eq("user_id", userID);

    if (error) {
      throw new Error(error);
    }

    if (data.length > 0) {
      throw new Error("user " + userID + " already subscribed");
    }

    // If subscription doesn't exist, proceed with insertion
    const { data: insertedData, error: insertError } = await supabase
      .from("subscriptions")
      .insert([{ channel_id: channelID, user_id: userID }]);

    if (insertError) {
      throw insertError;
    }

    return insertedData;
  } catch (error) {
    console.error("Error:", error);
  }
};

// subscribeToChannel(
//     "82f29294-46f1-490c-85b0-125c1c0d8dd8",
//     "d1ef1cb0-6828-4efd-b66c-8ba98534c5f2"
//   );

const insertChannelToPodcastChannelsTable = async (channelID, channelName) => {
  try {
    const { data, error } = await supabase
      .from("podcast_channels")
      .select()
      .eq("channel_id", channelID);

    if (error) {
      throw new Error(error);
    }

    if (data.length > 0) {
      throw new Error(
        "channel " + channelID + " is already present in 'podcast_channels'"
      );
    }

    const { data: insertedData, error: insertError } = await supabase
      .from("podcast_channels")
      .insert([{ channel_id: channelID, name: channelName }]);

    if (insertError) {
      throw insertError;
    }

    return insertedData;
  } catch (error) {
    console.error(error);
  }
};

const unSubscribeFromChannel = async () => {
    
};
