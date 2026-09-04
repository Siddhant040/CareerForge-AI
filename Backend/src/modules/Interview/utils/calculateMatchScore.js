export function calculateMatchScore({
  matchedSkills = [],
  partialMatches = [],
  missingSkills = [],
}) {
  const matched = matchedSkills.length;
  const partial = partialMatches.length;
  const missing = missingSkills.length;

  const totalRequirements = matched + partial + missing;

  if (totalRequirements === 0) {
    return 0;
  }

  const score =
    ((matched + partial * 0.5) / totalRequirements) * 100;

  return Math.round(score);
}