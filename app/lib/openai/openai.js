const openAI = require("./openaiConfig.ts");
const supabaseAPI = require("../../server/supabaseConfig.ts");
const fileSystem = require("fs");
const path = require("path");
const uniqid = require("uniqid")

const summaryPromptFile = "../../server/files/summaryPrompt.txt";
const outputSummaryChunksJSONFile = "../../server/files/summaryChunks.json";
const transcriptionDirectory = "../../server/files/slicedTranscription/";

// Read the summary prompt file
fileSystem.readFile(summaryPromptFile, 'utf8', (err, summaryPrompt) => {
  if (err) {
    console.error(err);
    return;
  }

  // Read the list of transcription files in the directory
  fileSystem.readdir(transcriptionDirectory, async (err, files) => {
    if (err) {
      console.error(err);
      return;
    }

    // Create an array to store promises for generating responses
    const responsePromises = [];

    // Create an array to store responses for JSON output
    const jsonResponseData = [];

    // Iterate over each file in the directory
    files.forEach((file) => {
      const filePath = path.join(transcriptionDirectory, file);

      // Read the transcription file
      const transcription = fileSystem.readFileSync(filePath, 'utf8');

      // Generate a chat response for each transcription
      const responsePromise = generateChatResponse(summaryPrompt, transcription);
      responsePromises.push(responsePromise);
    });

    try {
      // Wait for all responses to be generated
      const responses = await Promise.all(responsePromises);

      // Prepare data for JSON output
      responses.forEach((response, index) => {

        jsonResponseData.push({
          index: index + 1,
          response: JSON.parse(response)
        });

      });

      const podcastJSON = {
        id: uniqid(),
        name: "",
        date: "",
        //stb
        data: jsonResponseData
      }

      // Write the responses to the summary JSON file
      fileSystem.writeFile(outputSummaryChunksJSONFile, JSON.stringify(podcastJSON, null, 2), 'utf8', (err) => {
        if (err) {
          console.error(`Error writing summary to ${outputSummaryChunksJSONFile}:`, err);
        } else {
          console.log(`Summary written to ${outputSummaryChunksJSONFile}`);
        }
      });
    } catch (error) {
      console.error("Error generating chat responses:", error);
    }
  });
});

const generateChatResponse = async (summaryPrompt, transcription) => {

  const schema = {
    "type": "object",
    "properties": {
      "summaryOverview": {
        "type": "string",
        "description": "The detailed synopsys",
      },
      "keyTakeaways": {
        "type": "array",
        "description": "The key takeaways",
        "items": {"type": "string"}
      },
      "actionableInsights": {
        "type": "array",
        "description": "The actionable insights",
        "items": {"type": "string"}
      },
      "memorableQuotes":{
        "type" : "array", 
        "description": "the memorable quotes",
        "items": {"type" : "object"}
      }

      //memorable quotes objects in array
      //actionable insights
    }
  }

  const chatCompletion = await openAI.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `${summaryPrompt} ${transcription}`,
      },
    ],
    functions: [{ name: "podcast_contents", parameters: schema}],
    function_call: {name: "podcast_contents"}
  });

  const summary = chatCompletion.choices[0].message.function_call.arguments

  // console.log(JSON.parse(summary))

  return summary

  // return chatCompletion.choices[0].message.content;
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
