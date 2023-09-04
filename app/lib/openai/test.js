const fs = require("fs");

//-----------ITT ÁLLÍTJA ÖSSZE A FINAL JSONT -> summaryOverviewokból csináljon egyet, extractelje ki a hostot, guesteket, stb. 
//random válasszon ki quoteokat és bullet pointokat!!!

const outputSummaryTextFile = "../../server/files/summary.txt";

// Write the responses to the summary text file
// const summaryText = responses.join('\n');
// fileSystem.writeFile(outputSummaryTextFile, summaryText, 'utf8', (err) => {
//     if (err) {
//         console.error(`Error writing summary to ${outputSummaryTextFile}:`, err);
//     } else {
//         console.log(`Summary written to ${outputSummaryTextFile}`);
//     }
// });

fs.readFile("../../server/files/summary.json", 'utf8', (err, json) => {
    if (err) {
      console.error('Error reading the JSON file:', err);
      return;
    }
  
    // Parse the JSON data into a JavaScript object
    const podcastJSON = JSON.parse(json);
  
    // Now you can work with the JavaScript object
    console.log(JSON.parse(jsonObject.data[0].response).summaryOverview);
  });