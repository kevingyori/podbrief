const fs = require("fs");
const path = require("path");
const whisper = require("./openaiConfig.ts");

const audioChunksFolder = "../../server/files/slicedAudio";
const outputFilePath = "../../server/files/transcription.txt";

async function getTranscriptionsForAudioChunks() {
  const audioFiles = fs
    .readdirSync(audioChunksFolder)
    .filter((file) => file.endsWith(".mp4"));

  const transcriptionPromises = audioFiles.map((audioFile) => {
    const audioFilePath = path.join(audioChunksFolder, audioFile);
    return transcribeAudio(audioFilePath).then((transcription) => {
      console.log(audioFilePath + " transcribed");
      return transcription;
    });
  });

  Promise.all(transcriptionPromises)
    .then((transcriptions) => {
      const concatenatedTranscriptions = transcriptions.join("\n");
      writeTranscriptionToFile(concatenatedTranscriptions);
    })
    .catch((error) => {
      console.error("Error processing transcriptions:", error);
    });
}

async function transcribeAudio(audioFilePath) {
  const transcription = await whisper.audio.transcriptions.create({
    file: fs.createReadStream(audioFilePath),
    model: "whisper-1",
    language: "en",
  });

  return transcription.text;
}

function writeTranscriptionToFile(transcription) {
  fs.writeFile(outputFilePath, transcription, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log("Transcriptions written to transcription.txt");
    }
  });
}

getTranscriptionsForAudioChunks();

