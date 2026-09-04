import "dotenv/config";
import { generateInterviewReport } from "./src/modules/Interview/services/ai/reportGeneration.service.js";
import { calculateMatchScore } from "./src/modules/Interview/utils/calculateMatchScore.js";

const candidateProfile = {
  name: "Arjun Sharma",

  education: [
    {
      degree: "B.Tech",
      field: "Computer Science",
      institution: null,
      year: null,
    },
  ],

  skills: [
    "JavaScript",
    "React",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Git",
    "Docker",
  ],

  experience: [
    {
      jobTitle: "Software Engineering Intern",
      company: null,
      duration: null,
      description: [],
    },
  ],

  experienceSummary: [
    "Built REST APIs",
    "Implemented JWT authentication",
  ],

  projects: [
    {
      name: "JobMatch",
      description:
        "A job matching application built using React and Node.js.",
      technologies: ["React", "Node.js"],
    },
  ],
};

const jobDescription = `
We are looking for a Backend Developer.

Requirements:
- Strong JavaScript and Node.js
- Express.js
- MongoDB and Mongoose
- REST API development
- JWT authentication
- API security
- Error handling
- Input validation
- Git and GitHub
- Docker
- Problem solving
- Good communication skills
`;

const jobAnalysis = {
  matchedSkills: [
    {
      skill: "JavaScript",
      reason: "Candidate explicitly lists JavaScript as a skill.",
    },
    {
      skill: "Node.js",
      reason: "Candidate explicitly lists Node.js.",
    },
    {
      skill: "Express.js",
      reason: "Candidate explicitly lists Express.js.",
    },
    {
      skill: "REST APIs",
      reason: "Candidate explicitly states that they built REST APIs.",
    },
    {
      skill: "MongoDB",
      reason: "Candidate explicitly lists MongoDB.",
    },
    {
      skill: "JWT authentication",
      reason: "Candidate explicitly states that they implemented JWT authentication.",
    },
    {
      skill: "Git",
      reason: "Candidate explicitly lists Git.",
    },
    {
      skill: "Docker",
      reason: "Candidate explicitly lists Docker.",
    },
  ],

  partialMatches: [],

  missingSkills: [
    {
      skill: "Mongoose",
      reason: "Candidate profile does not explicitly mention Mongoose.",
    },
    {
      skill: "GitHub",
      reason: "Candidate profile mentions Git but not GitHub.",
    },
    {
      skill: "API security",
      reason: "Candidate profile does not explicitly demonstrate API security.",
    },
    {
      skill: "Error handling",
      reason: "Candidate profile does not explicitly mention error handling.",
    },
    {
      skill: "Input validation",
      reason: "Candidate profile does not explicitly mention input validation.",
    },
    {
      skill: "Problem solving",
      reason: "Candidate profile does not explicitly demonstrate problem solving.",
    },
    {
      skill: "Communication skills",
      reason: "Candidate profile does not explicitly demonstrate communication skills.",
    },
  ],
};

const matchScore = calculateMatchScore(jobAnalysis);

console.log("Match Score:", matchScore);

try {
  const report = await generateInterviewReport({
    candidateProfile,
    jobDescription,
    jobAnalysis,
    matchScore,
  });

  console.log("\n========== REPORT ==========\n");

  console.log(JSON.stringify(report, null, 2));

  console.log("\n========== VALIDATION ==========\n");

  console.log(
    "Technical questions:",
    report.technicalQuestions.length,
  );

  console.log(
    "Behavioral questions:",
    report.behavioralQuestions.length,
  );

  console.log(
    "Skill gaps:",
    report.skillGaps.length,
  );

  console.log(
    "Preparation days:",
    report.preparationPlan.length,
  );

  console.log(
    "AI generated matchScore:",
    "matchScore" in report ? report.matchScore : "NO — correct",
  );
} catch (error) {
  console.error("\nReport generation failed:");
  console.error(error);
}