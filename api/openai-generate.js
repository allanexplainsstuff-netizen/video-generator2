import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      error: "Method not allowed"
    });
  }

  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        error: "Missing prompt"
      });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    });

    return res.status(200).json({
      success: true,
      provider: "openai",
      result: response.choices[0].message.content
    });

  } catch (error) {
    console.error("OpenAI API error:", error);

    return res.status(500).json({
      success: false,
      error: error.message || "OpenAI request failed"
    });
  }
}
