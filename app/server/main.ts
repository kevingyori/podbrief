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
//ez el van szeparálva a fenti summarization készítéstől 
//pl péntek délután 
//iterate through all the users
//check if user has new podcasts to send -->EZ A KOMPLEXEBB RÉSZ -> 
    //previous péntek date -> take all subscriptions of the user, check all podcast summaries in db after that date
    //az a legegyszerűbb, ha megkapja az összes podcastot ami a cahnnelhez tartozik, mert akkor varázsolni kell, h melyikekekt kapja meg melyikeket nem, lehet ki se adtak lehet 1 hét alatt 3at
    //valszeg az a legegyszerűbb ha minden usernek lesz egy columnja h mikor kapta meg az előző emailt, és mindig csak azt csekkolni!
    
    //optimalizálás: azt el lehet kerülni, h pl ha 10en kérték a huberman labset, tízszer lekérje hubermant? minimal caching?


async function main() {
  try {
    //fetch episode data after new episode notification from podcast api
    const result = await fetchEpisodeDataAndInsertToDB("episode uuid here");

    const episodeUUID =  await result.uuid;

    if (result.audioUrl) {

      await downloadPodcastAudio(result.audioUrl);

    console.log(result.audioUrl)
    } else {
      console.error("audioUrl is undefined in the result.");
    }

    // might have bugs because of promise?
    // //slice audio
    await audioSlicer();

    // //transcript with whisper
    const resolveTranscription = await getTranscriptionWhisper();

    // //slice transcription
    await sliceTranscription(resolveTranscription);

    //gpt summarizes transcription chunks
    const resolveChunkSummary = await summarizeWithGpt(pathConfig.summaryPromptFile, pathConfig.outputSummaryChunksJSONFile, pathConfig.transcriptionDirectory)

    // //create final summary
    const finalSummary = await mapReduceSummary(pathConfig.outputSummaryTextFile, pathConfig.outputFinalSummaryFile, pathConfig.summaryChunksFile)

    // //save json to db
    const resolveSummarySave = await saveFinalSummaryToDB(finalSummary, episodeUUID);

    //CHECK IF ALL FILES ARE EXISTING -> DELETE ALL -> pathconfig beállítani!
    
  } catch (error) {
    console.error("Main function error:", error);
  }
}

main();
