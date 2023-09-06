const path = require('path');


module.exports = {

  //gpt
  summaryPromptFile: path.join(__dirname, './files/summaryPrompt.txt'),
  outputSummaryChunksJSONFile: path.join(__dirname, './files/summaryChunks.json'),
  transcriptionDirectory: path.join(__dirname, './files/slicedTranscription/'),

  //mapreduce
  outputSummaryTextFile: path.join(__dirname, './files/combinedSummary.txt'),
  outputFinalSummaryFile: path.join(__dirname, './files/finalSummary.json'),
  summaryChunksFile: path.join(__dirname, './files/summaryChunks.json'),
};
