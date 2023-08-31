const fileSystem = require("fs");
const PATH = require("path");
const whisper = require("./openaiConfig.ts");

const audioChunksFolder = "../../server/files/slicedAudio";
const outputFilePath = "../../server/files/transcription.txt";

async function getTranscriptionsForAudioChunks() {
  const audioFiles = fileSystem.readdirSync(audioChunksFolder).filter(file => file.endsWith(".mp4"));

  const allTranscriptions= [];

  for (const audioFile of audioFiles) {
    const audioFilePath = PATH.join(audioChunksFolder, audioFile);
    const transcription = await transcribeAudio(audioFilePath);
    allTranscriptions.push(transcription);
    console.log(audioFilePath + " transcribed")
  }

  const concatenatedTranscriptions = allTranscriptions.join("\n");
  writeTranscriptionToFile(concatenatedTranscriptions);
}

async function transcribeAudio(audioFilePath){
  const transcription = await whisper.audio.transcriptions.create({
    file: fileSystem.createReadStream(audioFilePath),
    model: "whisper-1",
    language: "en"
  });

  return transcription.text;
}

function writeTranscriptionToFile(transcription) {
  fileSystem.writeFile(outputFilePath, transcription, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Transcriptions written to transcription.txt");
    }
  });
}

getTranscriptionsForAudioChunks();
