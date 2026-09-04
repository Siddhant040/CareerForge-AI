import { groqAIClient } from "../../../../config/ai.config.js";
import jobAnalysisSchema from "../../schema/jobAnalysis.schema.js";



export async function analyzeJob({
  candidateProfile,
  jobDescription,
}) {
  if (!candidateProfile) {
    throw new Error("Candidate profile is required");
  }

  if (!jobDescription?.trim()) {
    throw new Error("Job description is required");
  }

  const prompt = `
You are a job requirement analysis system.

Your task is to compare a candidate profile against a job description.

IMPORTANT FACTUAL GROUNDING RULES:

1. Use ONLY the candidate profile provided below as evidence of candidate skills.
2. NEVER invent or assume candidate skills, experience, projects, technologies,
   education, or qualifications.
3. A skill appearing in the job description does NOT mean the candidate has it.
4. If a requirement is not explicitly supported by the candidate profile,
   classify it as missing.
5. Do not infer proficiency from related technologies.
6. Do not give the candidate credit for a skill that is merely similar to
   another skill.
7. Every classification must be based on explicit evidence from the
   candidate profile.
8. The job description defines what the job requires.
9. The candidate profile defines what the candidate has.
10. Do not calculate or invent a match score.

CLASSIFICATION RULES:

MATCHED:
Use matchedSkills when the candidate explicitly demonstrates or lists
the required skill.

PARTIAL:
Use partialMatches only when the candidate explicitly has some relevant
knowledge or experience, but does not fully satisfy the requirement.

MISSING:
Use missingSkills when the requirement is not explicitly supported
by the candidate profile.

IMPORTANT:
Every item MUST contain:
- "skill"
- "reason"

The "reason" must explain the classification using only information
from the candidate profile and job description.

Return ONLY valid JSON matching this structure:

{
  "matchedSkills": [
    {
      "skill": "Node.js",
      "reason": "Node.js is explicitly listed in the candidate profile."
    }
  ],
  "partialMatches": [],
  "missingSkills": [
    {
      "skill": "AWS",
      "reason": "AWS is required by the job description but is not present in the candidate profile."
    }
  ]
}

CANDIDATE PROFILE:
${JSON.stringify(candidateProfile, null, 2)}

JOB DESCRIPTION:
${jobDescription}
`;

  const maxAttempts = 3;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const response = await groqAIClient().chat.completions.create({
        model: "openai/gpt-oss-120b",

        messages: [
          {
            role: "system",
            content:
              "You compare job requirements against candidate evidence without inventing candidate qualifications.",
          },
          {
            role: "user",
            content: prompt,
          },
        ],

        temperature: 0,

        response_format: {
          type: "json_object",
        },
      });

      const rawContent = response.choices?.[0]?.message?.content;

      if (!rawContent) {
        throw new Error("AI returned an empty response");
      }

      const parsedResponse = JSON.parse(rawContent);

      const validationResult =
        jobAnalysisSchema.safeParse(parsedResponse);

      if (!validationResult.success) {
        console.error(
          `Job analysis validation failed (attempt ${attempt}):`,
          validationResult.error.flatten()
        );

        throw new Error("Invalid job analysis structure");
      }

      return validationResult.data;
    } catch (error) {
      console.error(
        `Job analysis attempt ${attempt} failed:`,
        error.message
      );

      if (attempt === maxAttempts) {
        throw new Error(
          "Job analysis failed after multiple attempts",
          { cause: error }
        );
      }

      await new Promise((resolve) =>
        setTimeout(resolve, attempt * 1000)
      );
    }
  }
}