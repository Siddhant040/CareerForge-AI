
/***
 * AI Config with google genai
 */
// import { GoogleGenAI } from "@google/genai";

// export const getAIClient = () => {
//   const apiKey = process.env.GOOGLE_GENAI_API_KEY;
//   const adc = process.env.GOOGLE_APPLICATION_CREDENTIALS;

//   if (!apiKey && !adc) {
//     throw new Error(
//       "Google GenAI credentials not found. Set GOOGLE_GENAI_API_KEY or GOOGLE_APPLICATION_CREDENTIALS (path to service account JSON). See Backend/src/.env.example."
//     );
//   }

//   return new GoogleGenAI({ apiKey });
// };

/**
 * AI Config with Groq
 */
import Groq from "groq-sdk";

export const groqAIClient = () => {
  const apiKey = process.env.GROQ_API_KEY
  if(!apiKey){
    throw new Error(
      "Groq credentials not found. Set GROQ_API_KEY. See Backend/src/.env.example."
    );
  }
  return new Groq({ apiKey });
}
 