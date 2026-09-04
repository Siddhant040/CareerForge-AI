import { z } from "zod";

const skillAnalysisSchema = z.object({
  skill: z.string(),
  reason: z.string(),
});

const jobAnalysisSchema = z.object({
  matchedSkills: z.array(skillAnalysisSchema),

  partialMatches: z.array(skillAnalysisSchema),

  missingSkills: z.array(skillAnalysisSchema),
});

export default jobAnalysisSchema;
