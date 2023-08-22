let openAI = require("./openaiConfig.ts")

const generateChatResponse = async () => {
    const chatCompletion = await openAI.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{"role": "user", "content": `"summarize it for me: It is it well, I saw you when you walked in today. I was like, God damn, you look good. You look good, dude. Like your muscles look good. You look like your vascular. You look fit. And that's. And I'm starting to feel fit, that's what's interesting. I know what they do, and so, like, I think I'm in shape. And then the next thing you know, you think you're in shape and then you start having like Ralphie, I start throwing punches at me."`}],
      });
    console.log(chatCompletion.choices[0].message); 
}

generateChatResponse()