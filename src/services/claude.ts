import Anthropic from "@anthropic-ai/sdk";
import { Message } from "../pages/chat";

const anthropic = new Anthropic({
  apiKey: process.env.EXPO_PUBLIC_ANTHROPIC_API_KEY,
});

const getChatResponse = async (
  message: string,
  previousMessages: Message[]
) => {
  try {
    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 1000,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: message,
            },
          ],
        },
      ],
      system:
        "You are a compassionate AI therapist. Respond with empathy and understanding, while helping users explore their thoughts and feelings. Keep responses concise but meaningful.",
    });

    return response.content[0]?.text;
  } catch (error) {
    console.error("Claude API error:", error);
    throw error;
  }
};

export { getChatResponse };
