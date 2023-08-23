const fs = require("fs");
const { YoutubeTranscript } = require("youtube-transcript");
//https://github.com/Kakulukian/youtube-transcript

//for testing
const url1 = `https://www.youtube.com/watch?v=P8LC5EhqoPw&list=PLWDQtIyZRZu2w8oFtWGz9UZ8Af8FcMt5j&index=1`; //short manual cc
const url2 = `https://www.youtube.com/watch?v=EWWXs3H1iZA&list=PLWDQtIyZRZu2w8oFtWGz9UZ8Af8FcMt5j&index=3&pp=iAQB`; //lengthy manual cc
const url3 = `https://www.youtube.com/watch?v=ovDuX-qRn8M`; //short automatic cc

YoutubeTranscript.fetchTranscript(url3).then((transcriptArray) => {
  let transcript = concatenateTranscript(transcriptArray);
  // transcript = transcript.trim().replace(/\s+/g, ' ') //removes unneccessary whitespaces and breaks
  writeTxt(transcript);
});

//HELPER FUNCTIONS
const concatenateTranscript = (transcriptArray) => {
  let concatenatedText = "";

  for (const textBlob of transcriptArray) {
    concatenatedText += textBlob.text + " ";
  }

  return concatenatedText;
};

const writeTxt = (transcript) => {
  fs.writeFile("transcript.txt", transcript, (err) => {
    if (err) {
      console.error(err);
    }
  });
};

//----YT TRANSCRIPTION ----
//tesztelni ytdl+whisper megoldást, gyorsabb vagy lassabb, mennyire lehet skálázni ha egyszerre sokat kell majd,
// mennyire erőforrás-igényes, mennyivel pontosabb és ez megéri e. mp3-at úgyis tárolja a supabase so emiatt nem kell aggódni
//(az viszont fix jobb mint a sima api h bármelyik videóhoz tud generálni)
//pár ytdl-core funkciót MINDENKÉPP HASZNÁLNI pl yt videó description, yt videó cím, dátum, stb
//https://github.com/fent/node-ytdl-core
//https://github.com/fent/node-ytdl-core/issues/712
//kombinálni whisperrel