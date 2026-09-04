import { groqAIClient } from "../../../../config/ai.config.js";
import candidateProfileSchema from "../../schema/candidateProfile.schema.js";


export async function extractCandidateProfile({
    resume,
    selfDescription,
}) {
    if (!resume?.trim()) {
        throw new Error("Resume content is required");
    }

    if (!selfDescription?.trim()) {
        throw new Error("Self description is required");
    }

    const prompt = `
You are a candidate information extraction system.

Your task is to extract factual candidate information from the provided
resume and self-description.

IMPORTANT FACTUAL GROUNDING RULES:

1. Use ONLY information explicitly present in the Resume or Self Description.
2. NEVER invent or assume any candidate information.
3. Do not add skills just because they are commonly associated with another skill.
4. Do not infer experience, proficiency, job titles, companies, projects,
   certifications, or technologies.
5. If information is not explicitly available, represent it as null or [].
6. Do not use the Job Description to determine candidate skills.
7. Preserve the distinction between what the candidate actually states
   and what is missing.

FIELD RULES:

The JSON structure is mandatory. Every field defined in the output
schema MUST be present.

Use null when a scalar value is not explicitly available.
Use [] when a list has no information.

- "name": always include this field. Use null if the name is not mentioned.

- "education": always include this field.
  Use [] if no education is mentioned.

  Every education object MUST contain:
  - "degree"
  - "field"
  - "institution"
  - "year"

  Use null for any of these values that are not explicitly mentioned.

- "skills": always include this field.
  Use [] if no skills are explicitly mentioned.

- "experience": always include this field.
  Use [] if no work experience is mentioned.

- "experienceSummary": always include this field.
  Use [] if no general experience statements are provided.

  This field should contain explicit technical or professional
  experience mentioned by the candidate that cannot be safely associated
  with a specific employment entry.

  Examples:
  - "Built REST APIs"
  - "Implemented JWT authentication"
  - "Designed MongoDB data models"

  Do NOT invent experience.
  Do NOT convert these statements into employment records. 
  
  

  Every experience object MUST contain:
  - "jobTitle"
  - "company"
  - "duration"
  - "description"

  Use null for missing scalar values.
  Use [] for missing descriptions.

- "projects": always include this field.
  Use [] if no projects are mentioned.

  Every project object MUST contain:
  - "name"
  - "description"
  - "technologies"

  Use [] for missing technologies.

NEVER omit a field.
NEVER use undefined.
NEVER invent a value.
Example of missing information:

{
  "name": "Arjun Sharma",
  "education": [
    {
      "degree": "B.Tech",
      "field": "Computer Science",
      "institution": null,
      "year": null
    }
  ],
  "skills": ["JavaScript"],
  "experience": [
    {
      "jobTitle": "Software Engineering Intern",
      "company": null,
      "duration": null,
      "description": []
    }
  ],
  "experienceSummary": [
  "Built REST APIs",
  "Implemented JWT authentication"
],
  "projects": []
}

Return ONLY valid JSON matching the required structure.

CANDIDATE RESUME:
${resume}

CANDIDATE SELF DESCRIPTION:
${selfDescription}
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
                            "You extract candidate information accurately and never fabricate facts.",
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
                candidateProfileSchema.safeParse(parsedResponse);

            if (!validationResult.success) {
                console.error(
                    `Candidate extraction validation failed (attempt ${attempt}):`,
                    validationResult.error.flatten()
                );

                throw new Error("Invalid candidate profile structure");
            }

            return validationResult.data;
        } catch (error) {
            console.error(
                `Candidate extraction attempt ${attempt} failed:`,
                error.message
            );

            if (attempt === maxAttempts) {
                throw new Error(
                    "Candidate extraction failed after multiple attempts",
                    { cause: error }
                );
            }

            await new Promise((resolve) =>
                setTimeout(resolve, attempt * 1000)
            );
        }
    }
}