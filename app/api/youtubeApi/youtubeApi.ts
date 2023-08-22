const fs = require('fs');
const { YoutubeTranscript } = require('youtube-transcript');
//https://github.com/Kakulukian/youtube-transcript

YoutubeTranscript.fetchTranscript('https://www.youtube.com/watch?v=P8LC5EhqoPw&list=PLWDQtIyZRZu2w8oFtWGz9UZ8Af8FcMt5j&index=1')
.then( transcriptArray => {
    
    const transcript = concatenateTranscript(transcriptArray)
    writeTxt(transcript)

});

//HELPER FUNCTIONS
const concatenateTranscript = (transcriptArray) => {
    let concatenatedText = ''

    for (const textBlob of transcriptArray) {
        concatenatedText += textBlob.text + ' ';
    }

    return concatenatedText
}

const writeTxt = (transcript) => {
    fs.writeFile('transcript.txt', transcript, err => {
        if (err) {
          console.error(err);
        }
      });
}


