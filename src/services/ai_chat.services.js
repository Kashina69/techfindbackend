import { GoogleGenerativeAI } from "@google/generative-ai";

const api_key = process.env.GEMINI_API_KEY;
if (!api_key) {
  throw new Error("GEMINI_API_KEY is not defined in environment variables");
}

const gen_ai = new GoogleGenerativeAI(api_key);
const model = gen_ai.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

const format_chat_history = (history) => {
  return history.map(msg => `${msg.role}: ${msg.content}`).join('\n');
};

const create_prompt = (query, components, requirement, min_price, max_price, history) => {
  return `
    <context>
      You are a PC expert in a shop helping customers with their PC building needs.
      Stay focused on computer components and the customer's requirements.
      If asked about unrelated topics, respond: "I think we're getting off topic. Let's focus on your PC build."
    </context>

    <chat_history>
      ${format_chat_history(history)}
    </chat_history>

    <current_scenario>
      Build Requirements:
      - Purpose: ${requirement}
      - Budget Range: ${min_price} to ${max_price}
      - Suggested Components: ${components}
      
      Customer Query: ${query}
    </current_scenario>
  `;
};

/**
 * Generates AI responses for PC building queries
 * @param {string} query - User's question
 * @param {string} components - List of PC components
 * @param {string} requirement - Build purpose
 * @param {string} min_price - Minimum budget
 * @param {string} max_price - Maximum budget
 * @param {Array} history - Chat history
 * @returns {Promise<string>} AI response
 */

export default async function ai_chat(
  query,
  components,
  requirement,
  min_price,
  max_price,
  history = []
) {
  if (!query || !components || !requirement) {
    throw new Error("Missing required parameters");
  }

  try {
    const prompt = create_prompt(
      query,
      components,
      requirement,
      min_price,
      max_price,
      history
    );

    const result = await model.generateContent({
      contents: [{
        role: "user",
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        maxOutputTokens: 500,    // Good for detailed explanations
        temperature: 0.7,        // Balanced between creativity and accuracy
        topK: 40,               // Helps maintain response relevance
        topP: 0.95              // Helps with response quality
      }
    });

    const response_text = result.response.text();
    console.log("AI Response:", response_text);
    return response_text;

  } catch (error) {
    console.error("AI Chat Error:", error);

    const error_messages = {
      'API key': "Authentication failed: Invalid API key",
      'quota': "API quota exceeded: Please try again later",
      'blocked': "Content blocked: Response contained inappropriate content",
      'invalid': "Invalid request: Please check your input parameters"
    };

    // Find matching error or return default message
    const error_message = Object.entries(error_messages)
      .find(([key]) => error.message.includes(key))?.[1]
      || "Failed to generate response";

    throw new Error(error_message);
  }
}

/* Usage Example:
await ai_chat(
  "Is this GPU good for gaming?",
  "CPU: 5600G, GPU: RX 6600, RAM: 16GB DDR4, PSU: 650W, Storage: 1TB NVMe Gen3",
  "Gaming",
  "₹50000",
  "₹60000",
);
*/
