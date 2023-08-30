//slices the audio into 25mb chunks (whisper upper limit)
const fileS = require('fs');
const PATH = require('path');
const ffmpegPath = require('ffmpeg-static').path;
const ffmpeg = require('fluent-ffmpeg');

ffmpeg.setFfmpegPath(ffmpegPath);

// const inputFilePath = './files/downloaded.mp3';
const inputFilePath = './files/downloaded.mp3';
const outputDirectory = './files/slicedmp3';

// Desired file size in bytes (25MB)
const targetFileSize = 25 * 1024 * 1024;

// Get the audio duration (in seconds) using ffprobe (part of ffmpeg)
ffmpeg.ffprobe(inputFilePath, (err, metadata) => {
  if (err) {
    console.error('Error getting audio duration:', err);
    return;
  }

  const audioDuration = parseFloat(metadata.format.duration);
  
  // Calculate the number of segments
  const numberOfSegments = Math.ceil(metadata.format.size / targetFileSize);

  // Calculate the duration of each segment
  const segmentDuration = audioDuration / numberOfSegments;

  // Create output directory if it doesn't exist
  if (!fileS.existsSync(outputDirectory)) {
    fileS.mkdirSync(outputDirectory, { recursive: true });
  }

  // Generate and execute ffmpeg commands for slicing
  for (let i = 0; i < numberOfSegments; i++) {
    const segmentStart = i * segmentDuration;
    const segmentOutputPath = PATH.join(outputDirectory, `segment_${i + 1}.mp3`);

    ffmpeg()
      .input(inputFilePath)
      .setStartTime(segmentStart)
      .setDuration(segmentDuration)
      .output(segmentOutputPath)
      .on('end', () => {
        console.log(`Segment ${i + 1} complete`);
      })
      .on('error', (err) => {
        console.error(`Error processing segment ${i + 1}:`, err);
      })
      .run();
  }
});
