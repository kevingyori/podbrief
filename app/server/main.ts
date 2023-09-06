const pathConfig = require("./pathConfig.ts")
const fetchEpisodeDataAndInsertToDB = require("../lib/podcastAPI/getEpisodeInfo.ts");
const downloadPodcastAudio = require("./downloadMP3.ts");
const audioSlicer = require("./audioSlicer");
const getTranscriptionWhisper = require("../lib/openai/whisper");
const sliceTranscription = require("./transcriptionSlicer");
const summarizeWithGpt = require ("../lib/openai/gpt")
const mapReduceSummary = require("../lib/openai/mapReduceSummary")
const saveFinalSummaryToDB = require("./saveFinalSummaryToDB.ts")

//Backend flow
//user magic link signup -> user infos to db
//channel subs from user -> channel info from podcast api -> info to db

//webhooks -> watch all channels in db

//itt fog lefutni sorban a
//new podcast episode webhook (noti and uuid save to db) -> realtime sub: podcast api: episode infos to db -> download audio on db change -> slice audio ->
//transcript with whisper -> slice -> prompt chatgpt for all chunks (summaryChunks.json) -> mapreduce json -> pick bullet points, summary overview with gpt
//-> write to db
//run a function to check if all files are OK-> delete unneccessary files

//sending newsletter

async function main() {
  try {
    //fetch episode data after new episode notification from podcast api
    const result = await fetchEpisodeDataAndInsertToDB("episode uuid here");

    const episodeUUID =  await result.uuid;

    // Check if audioUrl is defined
    if (result.audioUrl) {

      await downloadPodcastAudio(result.audioUrl);

    console.log(result.audioUrl)
    } else {
      console.error("audioUrl is undefined in the result.");
    }

    //slice audio
    await audioSlicer();

    //transcript with whisper
    const resolveTranscription= await getTranscriptionWhisper();

    //!!!ITT NEM VÁR A GETTRANSCRIPTIONRE!!!!
    //lehet csak a whisper api a probléme (connection error), csak mert eddig jó volt, no?
    //de azért megpróbálni biztosabbá tenni, throw error, thrwo promise, stb
    //async await syntax?

    //slice transcription
    await sliceTranscription(resolveTranscription);

    //gpt summarizes transcription chunks
    // await summarizeWithGpt(pathConfig.summaryPromptFile, pathConfig.outputSummaryChunksJSONFile, pathConfig.transcriptionDirectory)

    //VALSZEG ITT NEM VÁR A mapReduceSummary a summarizeWithGpt-re!!!

    // //create final summary
    // const finalSummary = await mapReduceSummary(pathConfig.outputSummaryTextFile, pathConfig.outputFinalSummaryFile, pathConfig.summaryChunksFile)

    // //save json to db
    // await saveFinalSummaryToDB(finalSummary, episodeUUID);
    
  } catch (error) {
    console.error("Main function error:", error);
  }
}

main();
