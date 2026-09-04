import { calculateMatchScore } from "./src/modules/Interview/utils/calculateMatchScore.js";

const result = calculateMatchScore({
  matchedSkills: [
    { skill: "JavaScript", reason: "..." },
    { skill: "Node.js", reason: "..." },
    { skill: "Express.js", reason: "..." },
    { skill: "MongoDB", reason: "..." },
    { skill: "Docker", reason: "..." },
  ],

  partialMatches: [
    { skill: "AWS", reason: "..." },
  ],

  missingSkills: [
    { skill: "Kubernetes", reason: "..." },
    { skill: "Redis", reason: "..." },
  ],
});

console.log("Match Score:", result);