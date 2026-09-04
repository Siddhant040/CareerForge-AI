import { z } from "zod";

const interviewQuestionSchema = z.object({
  question: z.string(),
  intention: z.string(),
  answer: z.string(),
});

const skillGapSchema = z.object({
  skill: z.string(),
  severity: z.enum(["low", "medium", "high"]),
});

const preparationPlanSchema = z.object({
  day: z.number().int().positive(),
  focus: z.string(),
  tasks: z.array(z.string()).min(1),
});

const interviewReportSchema = z.object({
  technicalQuestions: z
    .array(interviewQuestionSchema)
    .length(10),

  behavioralQuestions: z
    .array(interviewQuestionSchema)
    .length(10),

  skillGaps: z.array(skillGapSchema),

  preparationPlan: z.array(preparationPlanSchema),

  title: z.string(),
});

export default interviewReportSchema;