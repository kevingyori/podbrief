const fileSystem =  require("fs");
const whisper =  require("./openaiConfig.ts");

async function main() {
  const transcription = await whisper.audio.transcriptions.create({
    file: fileSystem.createReadStream("../../server/files/slicedAudio/audio-chunk-0.mp3"),
    model: "whisper-1",
  });

  console.log(transcription.text);

  writeTranscription(transcription.text)
}
main();

//ELVILEG MEG LEHET PROMPTOLNI ITT IS DIRECTLY? és akkor nem kéne külön gpt-vel promptolni

const writeTranscription = (transcription) => {
    fileSystem.writeFile("transcription.txt", transcription, (err) => {
      if (err) {
        console.error(err);
      }
    });
  };