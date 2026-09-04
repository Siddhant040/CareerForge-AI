import { calculateMatchScore } from "../../utils/calculateMatchScore.js";
import { extractCandidateProfile } from "./candidateExtraction.service.js";
import { analyzeJob } from "./jobAnalysis.service.js";
import { generateInterviewReport } from "./reportGeneration.service.js";

export async function generateInterviewPipeline({
  resume,
  jobDescription,
  selfDescription,
}) {
  if (!resume) {
    throw new Error("Resume is required");
  }

  if (!jobDescription) {
    throw new Error("Job description is required");
  }

  if (!selfDescription?.trim()) {
    throw new Error("Self description is required");
  }

  // Stage 1: Extract structured candidate information
  const candidateProfile = await extractCandidateProfile({
    resume,
    selfDescription,
  });

  // Stage 2: Analyze candidate against job requirements
  const jobAnalysis = await analyzeJob({
    candidateProfile,
    jobDescription,
  });

  // Stage 3: Calculate deterministic match score
  const matchScore = calculateMatchScore(jobAnalysis);

  // Stage 4: Generate final interview report
  const interviewReport = await generateInterviewReport({
    candidateProfile,
    jobDescription,
    jobAnalysis,
    matchScore,
  });

  // Match score is owned by the backend, not the AI.
  return {
    ...interviewReport,
    matchScore,
  };
}