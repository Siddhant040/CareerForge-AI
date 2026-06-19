


// import { getAIClient } from "../../config/ai.config.js";
import { z } from "zod";
import { zodToJsonSchema } from "zod-to-json-schema";


// const interviewSchema = z.object({
//     matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
//     technicalQuestions: z.array(z.object({
//         question: z.string().describe("The technical question can be asked in the interview"),
//         intention: z.string().describe("The intention of interviewer behind asking this question"),
//         answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
//     })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
//     behavioralQuestions: z.array(z.object({
//         question: z.string().describe("The technical question can be asked in the interview"),
//         intention: z.string().describe("The intention of interviewer behind asking this question"),
//         answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
//     })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
//     skillGaps: z.array(z.object({
//         skill: z.string().describe("The skill which the candidate is lacking"),
//         severity: z.enum([ "low", "medium", "high" ]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
//     })).describe("List of skill gaps in the candidate's profile along with their severity"),
//     preparationPlan: z.array(z.object({
//         day: z.number().describe("The day number in the preparation plan, starting from 1"),
//         focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
//         tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
//     })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
//     title: z.string().describe("The title of the job for which the interview report is generated"),
// })

// async function generateInterviewReport({ resume, jobDescription, selfDescription }, options = {}) {
//   try {
//     const ai = getAIClient();

//     const prompt = `
// Analyze the candidate below and RETURN ONLY A SINGLE JSON OBJECT using these camelCase keys: matchScore, technicalQuestions, behavioralQuestions, skillGaps, preparationPlan, title.

// Resume:
// ${JSON.stringify(resume)}

// Job Description:
// ${JSON.stringify(jobDescription)}

// Self Description:
// ${JSON.stringify(selfDescription)}

// Return ONLY a JSON object matching the structure exactly. If unsure, return empty strings/arrays but keep keys.
// Do not return markdown or extra commentary.
// `;

//     const modelName = options.model || "gemini-2.5-flash";

//     const response = await ai.models.generateContent({
//       model: modelName,
//       contents: prompt,
//       config: {
//         responseMimeType: "application/json",
//         responseSchema: zodToJsonSchema(interviewSchema),
//         temperature: options.temperature ?? 0,
//       },
//     });

//     console.log("RAW RESPONSE TEXT:");
//     console.log(response?.text ?? "");

//     const tryParseJson = (text) => {
//       try {
//         return JSON.parse(text);
//       } catch (err) {
//         const first = text.indexOf("{");
//         const last = text.lastIndexOf("}");
//         if (first !== -1 && last !== -1 && last > first) {
//           const candidate = text.slice(first, last + 1);
//           return JSON.parse(candidate);
//         }
//         throw err;
//       }
//     };

//     const parsed = tryParseJson(response.text || "");

//     // Normalize possible snake_case and simple arrays
//     const normalize = (s) => {
//       const src = s || {};
//       const toArray = (v) => (Array.isArray(v) ? v : []);

//       const matchScore = src.matchScore ?? src.match_score ?? 0;

//       const mapQ = (q) => {
//         if (!q) return { question: "", intent: "", answer: "" };
//         if (typeof q === "string") return { question: q, intent: "", answer: "" };
//         return { question: q.question || q.q || "", intent: q.intent || q.intention || "", answer: q.answer || "" };
//       };

//       const technicalQuestions = toArray(src.technicalQuestions || src.technical_interview_questions).map(mapQ);
//       const behavioralQuestions = toArray(src.behavioralQuestions || src.behaviouralQuestions || src.behavioural_interview_questions).map(mapQ);

//       const skillGaps = toArray(src.skillGaps || src.skill_gaps || src.skillsGap).map((it) => {
//         if (typeof it === "string") return { skill: it, severity: "medium" };
//         return { skill: it.skill || "", severity: it.severity || it.level || "medium" };
//       });

//       const preparationPlan = toArray(src.preparationPlan || src.seven_day_preparation_plan).map((p, i) => {
//         if (typeof p === "string") {
//           const m = p.match(/Day\s*(\d+)\s*[:\-]?\s*(.*)/i);
//           const day = m ? Number(m[1]) : i + 1;
//           const focus = m ? m[2] : p;
//           return { day, focus, tasks: [] };
//         }
//         return { day: p.day || i + 1, focus: p.focus || "", tasks: Array.isArray(p.tasks) ? p.tasks : [] };
//       });

//       return {
//         matchScore,
//         technicalQuestions,
//         behavioralQuestions,
//         skillGaps,
//         preparationPlan,
//         title: src.title || src.jobTitle || "",
//       };
//     };

//     const normalized = normalize(parsed);

//     const validated = interviewSchema.parse(normalized);

//     console.log("VALIDATED REPORT (camelCase):");
//     console.dir(validated, { depth: null });

//     return validated;
//   } catch (error) {
//     console.error("Interview Report Generation Failed");
//     console.error(error);
//     throw error;
//   }
// }

// export { generateInterviewReport };

import { groqAIClient } from "../../config/ai.config.js"
 import { jobDescription, resume, selfDescription } from "./temp.js"; 


const interviewReportSchema = z.object({
  matchScore: z.number().describe("A score between 0 and 100 indicating how well the candidate's profile matches the job describe"),
  technicalQuestions: z.array(z.object({
    question: z.string().describe("The technical question can be asked in the interview"),
    intention: z.string().describe("The intention of interviewer behind asking this question"),
    answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
  })).describe("Technical questions that can be asked in the interview along with their intention and how to answer them"),
  behavioralQuestions: z.array(z.object({
    question: z.string().describe("The technical question can be asked in the interview"),
    intention: z.string().describe("The intention of interviewer behind asking this question"),
    answer: z.string().describe("How to answer this question, what points to cover, what approach to take etc.")
  })).describe("Behavioral questions that can be asked in the interview along with their intention and how to answer them"),
  skillGaps: z.array(z.object({
    skill: z.string().describe("The skill which the candidate is lacking"),
    severity: z.enum(["low", "medium", "high"]).describe("The severity of this skill gap, i.e. how important is this skill for the job and how much it can impact the candidate's chances")
  })).describe("List of skill gaps in the candidate's profile along with their severity"),
  preparationPlan: z.array(z.object({
    day: z.number().describe("The day number in the preparation plan, starting from 1"),
    focus: z.string().describe("The main focus of this day in the preparation plan, e.g. data structures, system design, mock interviews etc."),
    tasks: z.array(z.string()).describe("List of tasks to be done on this day to follow the preparation plan, e.g. read a specific book or article, solve a set of problems, watch a video etc.")
  })).describe("A day-wise preparation plan for the candidate to follow in order to prepare for the interview effectively"),
  title: z.string().describe("The title of the job for which the interview report is generated"),
})


export async function generateInterviewReport({ resume, jobDescription, selfDescription } = {}) {

  const prompt = `
  
Analyze this candidate.

Resume:
${resume}

Job Description:
${jobDescription}

Self Description:
${selfDescription}

Return ONLY valid JSON matching:

{
 ...
}


Return ONLY valid JSON.

Example:

{
  "matchScore": 85,
  "technicalQuestions": [
    {
      "question": "Explain JWT Authentication",
      "intention": "Check authentication knowledge",
      "answer": "Explain access token, refresh token and verification flow"
    }
  ],
  "behavioralQuestions": [
    {
      "question": "Describe a challenge you faced",
      "intention": "Evaluate problem solving",
      "answer": "Use STAR method"
    }
  ],
  "skillGaps": [
    {
      "skill": "Docker",
      "severity": "high"
    }
  ],
  "preparationPlan": [
    {
      "day": 1,
      "focus": "Authentication",
      "tasks": [
        "Review JWT",
        "Practice interview questions"
      ]
    }
  ],
  "title": "Software Engineer"
}

Return ONLY JSON.
No markdown.
No explanations.
`;

  return groqAIClient().chat.completions.create({
    model: "llama-3.3-70b-versatile",
      response_format: {
    type: "json_object"
  },
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],





  });
}

export async function main() {
  const maxAttempts = 3;
  let lastError = null;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await generateInterviewReport({ resume, jobDescription, selfDescription });

      const content = response.choices[0]?.message?.content;
      console.log(`AI raw content (attempt ${attempt}):`, content);

      let jsonData;
      try {
        jsonData = JSON.parse(content);
      } catch (err) {
        console.warn(`Attempt ${attempt}: AI returned invalid JSON`);
        throw new Error("AI returned malformed JSON");
      }

      const parsed = interviewReportSchema.safeParse(jsonData);
      if (!parsed.success) {
        console.warn(`Attempt ${attempt}: AI response failed schema validation`);
        console.warn(parsed.error.format());
        throw new Error("Invalid AI response");
      }

      // Check for clearly-empty/placeholder outputs and retry if found.
      const { matchScore, technicalQuestions, behavioralQuestions, skillGaps, title } = parsed.data;
      const looksEmpty =
        (typeof matchScore === "number" && matchScore === 0) &&
        Array.isArray(technicalQuestions) && technicalQuestions.length === 0 &&
        Array.isArray(behavioralQuestions) && behavioralQuestions.length === 0 &&
        Array.isArray(skillGaps) && skillGaps.length === 0 &&
        (!title || title.toLowerCase() === "unknown");

      if (looksEmpty) {
        console.warn(`Attempt ${attempt}: AI returned an empty/placeholder report`);
        throw new Error("AI generated an empty report");
      }

      // success
      console.log("Validated AI report:", parsed.data);
      return parsed.data;
    } catch (err) {
      lastError = err;
      if (attempt < maxAttempts) {
        console.log(`Retrying AI generation (attempt ${attempt + 1}/${maxAttempts})...`);
        // small backoff
        await new Promise((r) => setTimeout(r, 1000 * attempt));
        continue;
      }
    }
  }

  console.error("AI generation failed after retries:", lastError);
  throw new Error(`AI generation failed: ${lastError?.message || "unknown error"}`);


}