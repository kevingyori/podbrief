const axios = require('axios');
const fs = require('fs');
const path = require('path');

const url = 'https://traffic.megaphone.fm/GLT5025099642.mp3?updated=1511217022';
// const downloadPath = path.join(__dirname, 'downloaded.mp3'); // Change the filename and path as needed

const downloadPath = path.join("../../server/files", 'downloaded.mp3');

axios({
  method: 'get',
  url: url,
  responseType: 'stream',
})
  .then(response => {
    const writer = fs.createWriteStream(downloadPath);

    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  })
  .then(() => {
    console.log('File downloaded successfully!');
  })
  .catch(error => {
    console.error('Error downloading the file:', error);
  });
