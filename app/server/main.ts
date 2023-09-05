const supabase = require("./supabaseConfig.ts");
const fetchEpisodeDataAndInsertToDB = require("../lib/podcastAPI/getEpisodeInfo.ts");
const downloadPodcastAudio = require("./downloadMP3.ts")
const audioSlicer = require("./audioSlicer")

//Backend flow
//user magic link signup -> user infos to db
//channel subs from user -> channel info from podcast api -> info to db

//webhooks -> watch all channels in db

//itt fog lefutni sorban a
//new podcast episode webhook (noti and uuid save to db) -> realtime sub: podcast api: episode infos to db -> download audio on db change (move the .ts file to server) -> slice audio ->
//transcript with whisper -> slice -> prompt chatgpt for all chunks (summaryChunks.json) -> mapreduce json -> pick bullet points, summary overview with gpt
//-> write to db, delete unneccessary files

//sending newwsletter

async function main() {
  try {

    //fetch episode data after new episode notification from podcast api
    const result = await fetchEpisodeDataAndInsertToDB("episode uuid here");

    const episodeUUID = result.uuid;

    //download audio
    await downloadPodcastAudio(result.audioUrl)

    //slice audio //slice után törölje az audiot??
    await audioSlicer()

    //ide oc a final summary json kell, nem a podcast api response
    await saveFinalSummaryToDB(result, episodeUUID);

  } catch (error) {
    console.error("Main function error:", error);
  }
}

main();

async function saveFinalSummaryToDB(finalJson, podcastID) {
  try {
    const { data, error } = await supabase
      .from("podcasts")
      .update({ summary: finalJson }) // JSONB UTÁNANÉZNI
      .eq("uuid", podcastID)
      .select();

    if (error) {
      console.error("Error updating the database:", error);
      throw error;
    }

    console.log("Database update successful:", data);
    return data;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
}
