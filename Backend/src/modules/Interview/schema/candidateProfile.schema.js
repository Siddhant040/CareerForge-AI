import { z } from "zod";

const candidateProfileSchema = z.object({
  name: z.string().nullable(),

  education: z.array(
    z.object({
      degree: z.string().nullable(),
      field: z.string().nullable(),
      institution: z.string().nullable(),
      year: z.string().nullable(),
    })
  ),

  skills: z.array(z.string()),

  experience: z.array(
    z.object({
      jobTitle: z.string().nullable(),
      company: z.string().nullable(),
      duration: z.string().nullable(),
      description: z.array(z.string()),
    })
  ),
  experienceSummary: z.array(z.string()),

  projects: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      technologies: z.array(z.string()),
    })
  ),
});

export default candidateProfileSchema;