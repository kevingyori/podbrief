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

  const updateSubscribersCount = async (channelID, operation) => {
    try {

      const {data, error: queryError} = await supabase
        .from("podcast_channels")
        .select("subscribers_count")
        .eq("channel_id", channelID)

        let subCount = data[0].subscribers_count

        if(operation === "add"){
            subCount++
        }

        if(operation === "remove"){
          subCount--
        }

        if (queryError) {
          throw queryError
        }

        const {error: updateError} = await supabase
          .from("podcast_channels")
          .update({"subscribers_count": subCount})
          .eq("channel_id", channelID)

        if (updateError){
          throw updateError
        }
  
    } catch (error) {
      console.error('Error updating subscribers count:', error);
    }
  }

//podcast_channelsbe több infó pl channel url, channel img, stb -> ezt külön le kell kérni miután először insertelte
    //---> channelName nem kell argumentsbe mert úgyis query id alapján!!!

//unsubscribe db function miután törölt subscriptionsből nézze meg h van e még feliratkozó a csatornára. ha nincs akkor TÖRÖLJE onnan! (feleslegesen generálunk epizódokat)
//vagy trackelni podcast channelsben h hány feliratkozója van a csatornának? és amikor jön a notification de 0 feliratkozója van akkor return?
//kérdezni gpt-t h melyik a jobb megoldás, a 2. jobban tetszik nekem
//populatelni megint db-t

const subscribeToChannel = async (userID, channelID, channelName) => {
  try {
    //add channel to podcasts_channels table IF NOT ALREADY PRESENT
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

    //add +1 to subscribers_count
    await updateSubscribersCount(channelID, "add")

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

subscribeToChannel(
    "82f29294-46f1-490c-85b0-125c1c0d8dd8",
    "06cbcb9e-dbf1-43c7-ad6a-ec4263255f2c",
    "Climate Pod"
);

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

        if(data.length > 0){
          await updateSubscribersCount(channelID, "remove")
        }

        return data;
      } catch (error) {
        console.error(error);
      }
}

// unSubscribeFromChannel("82f29294-46f1-490c-85b0-125c1c0d8dd8","06cbcb9e-dbf1-43c7-ad6a-ec4263255f2c")