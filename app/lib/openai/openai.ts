const openAI = require("./openaiConfig.ts");
let supabaseAPI = require("../../server/supabaseConfig.ts");
const fileSystem = require("fs")

const inputFile = "../../server/files/slicedTranscription/chunk-1.txt"
const summaryPromptFile = "../../server/files/summaryPrompt.txt";
const outputSummaryFile = "../../server/files/summary.txt";

// Read the summary prompt file
fileSystem.readFile(summaryPromptFile, 'utf8', (err, summaryPrompt) => {
  if (err) {
    console.error(err);
    return;
  }

  // Read the transcription file
  fileSystem.readFile(inputFile, 'utf8', (err, transcription) => {
    if (err) {
      console.error(err);
      return;
    }

    generateChatResponse(summaryPrompt, transcription);
  });
});

const generateChatResponse = async (summaryPrompt, transcription) => {
  const chatCompletion = await openAI.chat.completions.create({
    // model: "gpt-3.5-turbo",
    model: "gpt-4",
    messages: [
      {
        role: "user",
        content: `${summaryPrompt} ${transcription}`,
        // content: "whats up"
      },
    ],
  });
  const summary = chatCompletion.choices[0].message.content;

  //Write the summary to a text file
  fileSystem.writeFile(outputSummaryFile, summary, 'utf8', (err) => {
    if (err) {
      console.error(`Error writing summary to ${outputSummaryFile}:`, err);
    } else {
      console.log(`Summary written to ${outputSummaryFile}`);
    }
  });
};

// generateChatResponse()

// https://github.com/openai/openai-node
// https://github.com/openai/openai-node/discussions/217

//subscribe to podcast table changes in db
//fetch transcript and other stuff from db to build summarization
//save summary to db

// async function fetchTableData(tableName) {
//   try {
//     // Fetch data from the specified table
//     const { data, error } = await supabaseAPI
//       .from(tableName)
//       .select("*")
//       .eq("name", "peter patzer");

//     if (error) {
//       throw error;
//     }

//     console.log("Fetched data:", data);
//   } catch (error) {
//     console.error("Error fetching data:", error.message);
//   }
// }

//  
