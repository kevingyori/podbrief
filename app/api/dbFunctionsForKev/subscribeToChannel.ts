const supabase = require("../../server/supabaseConfig.ts");

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
        console.log(
          "channel " + channelID + " is already present in 'podcast_channels'. Proceed to subscribeToChannel"
        );
        return
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

const subscribeToChannel = async (userID, channelID, channelName) => {
  try {
    //add channel to podcasts_channels table if not already present
    await insertChannelToPodcastChannelsTable(channelID, channelName);

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
    console.error(error);
  }
};

//user ids: 5d1085fb-618c-4b47-b50b-82292ee12041 | "82f29294-46f1-490c-85b0-125c1c0d8dd8"
// subscribeToChannel(
//     "638243b9-9c77-4bc0-9094-b32a441d3143",
//     "d1ef1cb0-6828-4efd-b66c-8ba98534c5f2",
//     "We're here to help"
//   );

const unSubscribeFromChannel = async (userID, channelID) => {
    try {
        const { data, error } = await supabase
          .from('subscriptions')
          .delete()
          .eq('user_id', userID)
          .eq('channel_id', channelID)
    
        if (error) {
          throw error;
        }

        return data;
      } catch (error) {
        console.error(error);
      }
}

unSubscribeFromChannel("638243b9-9c77-4bc0-9094-b32a441d3143","d1ef1cb0-6828-4efd-b66c-8ba98534c5f2")