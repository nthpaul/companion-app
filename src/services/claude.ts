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
    // Add retry logic with exponential backoff
    const maxRetries = 3;
    let retryCount = 0;
    let lastError;

    while (retryCount < maxRetries) {
      try {
        const response = await anthropic.messages.create({
          model: "claude-3-opus-20240229",
          max_tokens: 1024,
          messages: [
            {
              role: "user",
              content: message,
            },
          ],
          system:
            "You are a compassionate AI therapist. Respond with empathy and understanding, while helping users explore their thoughts and feelings. Keep responses concise but meaningful.",
          temperature: 0.7, // Add some variability
        });

        // Check the response structure
        if (response?.content?.[0]?.text) {
          return response.content[0].text;
        } else {
          throw new Error("Invalid response structure");
        }
      } catch (error) {
        lastError = error;
        if (error?.message?.includes("overloaded")) {
          // Wait before retrying (exponential backoff)
          await new Promise((resolve) =>
            setTimeout(resolve, Math.pow(2, retryCount) * 1000)
          );
          retryCount++;
        } else {
          throw error; // Non-overload errors are thrown immediately
        }
      }
    }
    throw lastError; // If we've exhausted retries
  } catch (error) {
    console.error("Claude API error:", error);
    return "I apologize, but I'm having trouble responding right now. Please try again in a moment.";
  }
};

export { getChatResponse };
