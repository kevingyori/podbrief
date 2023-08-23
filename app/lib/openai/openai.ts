const openAI = require("./openaiConfig.ts");
let supabaseAPI = require("../../server/supabaseConfig.ts");


const generateChatResponse = async () => {
  const chatCompletion = await openAI.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: `"summarize it for me: It is it well, I saw you when you walked in today. I was like, God damn, you look good. You look good, dude. Like your muscles look good. You look like your vascular. You look fit. And that's. And I'm starting to feel fit, that's what's interesting. I know what they do, and so, like, I think I'm in shape. And then the next thing you know, you think you're in shape and then you start having like Ralphie, I start throwing punches at me."`,
      },
    ],
  });
  console.log(chatCompletion.choices[0].message);
};

// generateChatResponse()

// https://github.com/openai/openai-node
// https://github.com/openai/openai-node/discussions/217

//subscribe to podcast table changes in db
//fetch transcript and other stuff from db to build summarization
//save summary to db

async function fetchTableData(tableName) {
  try {
    // Fetch data from the specified table
    const { data, error } = await supabaseAPI
      .from(tableName)
      .select("*")
      .eq("name", "peter patzer");

    if (error) {
      throw error;
    }

    console.log("Fetched data:", data);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
}

fetchTableData("users");
