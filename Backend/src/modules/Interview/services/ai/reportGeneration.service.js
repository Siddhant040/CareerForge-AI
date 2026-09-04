import { groqAIClient } from "../../../../config/ai.config.js";
import interviewReportSchema from "../../schema/interviewReport.schema.js";

const MODEL = "openai/gpt-oss-120b";
const MAX_ATTEMPTS = 3;
const MAX_TOKENS = 8192;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function buildPrompt({
  candidateProfile,
  jobDescription,
  jobAnalysis,
  matchScore,
}) {
  return `
You are an expert technical interviewer and interview-preparation coach.

Your task is to generate a structured interview preparation report for a candidate applying to a job.

Use ONLY the information provided in:
1. CandidateProfile
2. Job Description
3. JobAnalysis
4. Backend-calculated MatchScore

IMPORTANT FACTUAL ACCURACY RULES:

1. NEVER invent candidate information.
2. Candidate skills, experience, education, projects, and professional background must come ONLY from CandidateProfile.
3. Never assume that a technology, skill, or responsibility mentioned in the Job Description is possessed by the candidate.
4. The MatchScore is calculated by the backend. DO NOT generate, change, recalculate, or include MatchScore in your response.
5. Skill gaps may ONLY come from the provided partialMatches and missingSkills in JobAnalysis.
6. Do not create new skill gaps that are not present in partialMatches or missingSkills.
7. Do not claim that the candidate has experience with a missing or partially matched skill.
8. Do not fabricate companies, projects, certifications, achievements, responsibilities, production incidents, team situations, or other experiences.

QUESTION REQUIREMENTS:

9. Generate EXACTLY 10 technical interview questions.
10. Generate EXACTLY 10 behavioral interview questions.
11. Do not generate fewer or more than 10 questions in either category.
12. Avoid duplicate or nearly identical questions.
13. Questions must be relevant to the Job Description and appropriate for the candidate's current profile.
14. Technical questions should test relevant technical knowledge, practical understanding, and important skills required by the job.
15. Behavioral questions should evaluate competencies relevant to the role, such as problem solving, communication, ownership, teamwork, adaptability, or dealing with challenges.

QUESTION OBJECT STRUCTURE:

16. Every question must contain exactly these three fields:
   - question
   - intention
   - answer

17. "question" is the interview question.
18. "intention" briefly explains what the interviewer is evaluating.
19. "answer" is NOT a full model answer.
20. "answer" must be a brief preparation summary of approximately 1-3 sentences.
21. The answer should tell the candidate the key concepts, points, or approach they should cover when answering.
22. Do not provide long tutorials, lengthy explanations, or full implementations in the answer field.

BEHAVIORAL QUESTION ACCURACY:

BEHAVIORAL QUESTION ACCURACY:

23. Never create a fictional past experience for the candidate.

24. If CandidateProfile contains a relevant real experience, the behavioral question may refer to that experience.

25. If CandidateProfile does NOT contain a relevant experience, ask a general behavioral question and instruct the candidate to prepare a real example from their own experience.

26. When preparing the "answer" for a behavioral question, do not write a fictional story or fabricated candidate response. The answer should provide brief preparation guidance.

27. Do not assume or invent specific details such as production incidents, technical challenges, teammates, stakeholders, responsibilities, solutions, or outcomes unless they are explicitly present in CandidateProfile.

28. If a relevant experience is not available in CandidateProfile, the answer should tell the candidate to prepare a real example from their own experience, for example:
   "Prepare a real example from your internship or project. Explain the situation, your actions, and the result using the STAR structure."
SKILL GAP REQUIREMENTS:

29. Generate skillGaps using ONLY skills present in JobAnalysis.partialMatches or JobAnalysis.missingSkills.
30. Each skill gap must contain:
   - skill
   - severity
31. Severity must be exactly one of:
   - low
   - medium
   - high
32. Severity should reflect the importance of the skill to the Job Description and its impact on interview readiness.
33. Do not include skills that are already clearly matched unless they also appear in partialMatches.

PREPARATION PLAN REQUIREMENTS:

34. Generate a practical day-wise preparation plan.
35. Every preparation day must have a unique focus.
36. Every day must contain 3-5 practical tasks.
37. Tasks must be concise, specific, and actionable.
38. The preparation plan must prioritize the candidate's identified skill gaps.
39. The preparation plan should also reinforce important matched skills required by the Job Description.
40. Do not invent external resources, books, courses, URLs, or specific content that was not provided.
41. The plan should focus on what the candidate should study, practice, build, or revise.

TITLE REQUIREMENT:

42. Generate a concise title describing the target role.
43. Infer the role from the Job Description.
44. Do not invent a company name or candidate information.

OUTPUT REQUIREMENTS:

45. Return ONLY valid JSON.
46. Do not return Markdown.
47. Do not wrap the JSON in \`\`\`json.
48. Do not add explanations before or after the JSON.
49. Follow the exact JSON structure provided below.
50. Make sure ALL required fields are present.
51. Make sure technicalQuestions contains exactly 10 items.
52. Make sure behavioralQuestions contains exactly 10 items.
53. Make sure skillGaps is always present, even when there are no gaps. In that case return [].
54. Make sure preparationPlan is always present.
55. Make sure title is always present.
56. Before returning the response, internally verify that the JSON contains all required fields and exactly 10 technical and 10 behavioral questions.

CANDIDATE PROFILE:
${JSON.stringify(candidateProfile, null, 2)}

JOB DESCRIPTION:
${jobDescription}

JOB ANALYSIS:
${JSON.stringify(jobAnalysis, null, 2)}

BACKEND-CALCULATED MATCH SCORE:
${matchScore}

RETURN EXACTLY THIS STRUCTURE:

{
  "technicalQuestions": [
    {
      "question": "string",
      "intention": "string",
      "answer": "string"
    }
  ],
  "behavioralQuestions": [
    {
      "question": "string",
      "intention": "string",
      "answer": "string"
    }
  ],
  "skillGaps": [
    {
      "skill": "string",
      "severity": "low"
    }
  ],
  "preparationPlan": [
    {
      "day": 1,
      "focus": "string",
      "tasks": [
        "string",
        "string",
        "string"
      ]
    }
  ],
  "title": "string"
}

Remember:

- EXACTLY 10 technical questions.
- EXACTLY 10 behavioral questions.
- Brief 1-3 sentence preparation summaries in answer.
- No fictional candidate experiences.
- Skill gaps ONLY from JobAnalysis.
- Do NOT return matchScore.
- Return JSON only.
`;
}

export async function generateInterviewReport({
  candidateProfile,
  jobDescription,
  jobAnalysis,
  matchScore,
}) {
  if (!candidateProfile) {
    throw new Error("Candidate profile is required");
  }

  if (!jobDescription) {
    throw new Error("Job description is required");
  }

  if (!jobAnalysis) {
    throw new Error("Job analysis is required");
  }

  if (typeof matchScore !== "number") {
    throw new Error("Match score is required");
  }

  const prompt = buildPrompt({
    candidateProfile,
    jobDescription,
    jobAnalysis,
    matchScore,
  });

  let lastError = null;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const completion = await groqAIClient()
        .chat.completions.create({
          model: MODEL,
          temperature: 0,
          max_tokens: MAX_TOKENS,
          response_format: {
            type: "json_object",
          },
          messages: [
            {
              role: "system",
              content:
                "You generate accurate and structured interview preparation reports. Return JSON only and follow the requested schema exactly.",
            },
            {
              role: "user",
              content: prompt,
            },
          ],
        });

      const content = completion.choices?.[0]?.message?.content;

      if (!content) {
        throw new Error("AI returned an empty response");
      }

      let parsedResponse;

      try {
        parsedResponse = JSON.parse(content);
      } catch (error) {
        throw new Error("AI returned malformed JSON", {
          cause: error,
        });
      }

      const validation = interviewReportSchema.safeParse(parsedResponse);

      if (!validation.success) {
        throw new Error(
          `Report validation failed: ${validation.error.message}`,
        );
      }

      return validation.data;
    } catch (error) {
      lastError = error;

      console.error(
        `Report generation attempt ${attempt} failed:`,
        error.message,
      );

      if (attempt < MAX_ATTEMPTS) {
        await sleep(attempt * 1000);
      }
    }
  }

  throw new Error(
    `Report generation failed after ${MAX_ATTEMPTS} attempts: ${
      lastError?.message || "unknown error"
    }`,
  );
}