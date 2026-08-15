import OpenAI from "openai";
import "dotenv/config";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

async function main() {
  try {
    const response = await client.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "user",
          content: "Differences between SQL and MongoDB",
        },
      ],
    });

    console.log(response.choices[0].message.content);
  } catch (err) {
    console.error("ERROR:", err.message);
  }
}

main();
