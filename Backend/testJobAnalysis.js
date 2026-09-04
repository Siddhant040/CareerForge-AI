import "dotenv/config";
import { analyzeJob } from "./src/modules/Interview/services/ai/jobAnalysis.service.js";

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
Backend Developer

We are looking for a Backend Developer to join our engineering team.

Requirements:
- Strong knowledge of JavaScript and Node.js.
- Experience with Express.js and REST APIs.
- Good understanding of MongoDB and Mongoose.
- Understanding of JWT-based authentication.
- Familiarity with Git and GitHub.
- Basic understanding of Docker.
- Knowledge of API security, error handling, and validation.
- Good problem-solving and communication skills.
`;

try {
  const jobAnalysis = await analyzeJob({
    candidateProfile,
    jobDescription,
  });

  console.log("\nJob Analysis:\n");
  console.log(JSON.stringify(jobAnalysis, null, 2));
} catch (error) {
  console.error("\nJob analysis failed:");
  console.error(error);
}