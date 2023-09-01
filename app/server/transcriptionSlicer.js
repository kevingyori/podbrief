const fs = require('fs');
const path = require('path');

const inputTrancription = "./files/transcription.txt";
const outputDirectory = "./files/slicedTranscription";
const maxChunkSize = 20000; //~4 chars equal to 1 token. TODO: refactor it, so it splits the text based on token count

// Function to delete all files in the target directory
function deleteFilesInDirectory(directory) {
  if (fs.existsSync(directory)) {
    fs.readdirSync(directory).forEach((file) => {
      const filePath = path.join(directory, file);
      if (fs.statSync(filePath).isFile()) {
        fs.unlinkSync(filePath);
        console.log(`Deleted file: ${filePath}`);
      }
    });
  }
}

// Delete existing files in the target directory
deleteFilesInDirectory(outputDirectory);

// Read the input text file
fs.readFile(inputTrancription, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Split the data into chunks of maxChunkSize characters
  const chunks = [];
  for (let i = 0; i < data.length; i += maxChunkSize) {
    chunks.push(data.slice(i, i + maxChunkSize));
  }

  // Create the output directory if it doesn't exist
  if (!fs.existsSync(outputDirectory)) {
    fs.mkdirSync(outputDirectory, { recursive: true });
  }

  // Write the chunks to individual files in the output directory
  chunks.forEach((chunk, index) => {
    const fileName = `chunk-${index + 1}.txt`;
    const filePath = path.join(outputDirectory, fileName);

    fs.writeFile(filePath, chunk, (writeErr) => {
      if (writeErr) {
        console.error(`Error writing chunk ${index + 1}:`, writeErr);
      } else {
        console.log(`Chunk ${index + 1} written to ${filePath}`);
      }
    });
  });
});