import "dotenv/config";
import { extractCandidateProfile } from "./src/modules/Interview/services/ai/candidateExtraction.service.js";
const resume = `
Arjun Sharma
B.Tech in Computer Science

Skills:
JavaScript, React, Node.js, Express.js, MongoDB, Git, Docker

Experience:
Software Engineering Intern

Projects:
JobMatch - A job matching application built using React and Node.js.
`;

const selfDescription = `
I am a full-stack developer with a strong interest in backend development.
I have experience with JavaScript, React, Node.js, Express.js and MongoDB.
I have built REST APIs and implemented JWT authentication.
`;

try {
  const candidateProfile = await extractCandidateProfile({
    resume,
    selfDescription,
  });

  console.log("\nCandidate Profile:\n");
  console.log(JSON.stringify(candidateProfile, null, 2));
} catch (error) {
  console.error("\nExtraction failed:");
  console.error(error);
}