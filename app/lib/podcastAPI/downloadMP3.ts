const axios = require('axios');
const fs = require('fs');
const path = require('path');

const url = "https://chrt.fm/track/597CEG/www.buzzsprout.com/1964407/13459963-should-we-pay-300-million-for-this-athletic-equipment-business-acquisitions-anonymous-223.mp3";
// const url = "http://open.live.bbc.co.uk/mediaselector/6/redir/version/2.0/mediaset/audio-nondrm-download/proto/http/vpid/p03jn4gx.mp3"
// const url = "https://pdst.fm/e/chrt.fm/track/28555/pdrl.fm/2a922f/traffic.megaphone.fm/HS5602143885.mp3?updated=1692405370"
// const downloadPath = path.join(__dirname, 'downloaded.mp3'); // Change the filename and path as needed

const downloadPath = path.join("../../server/files", 'downloaded.mp4');

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
    console.log('Audio downloaded successfully!');
  })
  .catch(error => {
    console.error('Error downloading the auido:', error);
  });
