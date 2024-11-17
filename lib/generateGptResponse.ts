"use server";

import OpenAI from "openai";

const FetchToGPT = async (prompt: string) => {
  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }); // Use a server-side key
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Use a valid model name like "gpt-4-turbo"
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    console.log(completion);
    const message = completion.choices?.[0]?.message?.content;
    if (!message) {
      throw new Error("No response from GPT");
    }

    console.log("GPT Response:", message);
    return message;
  } catch (error) {
    console.error("Error fetching GPT response:", error);
    return null;
  }
};

export default FetchToGPT;
