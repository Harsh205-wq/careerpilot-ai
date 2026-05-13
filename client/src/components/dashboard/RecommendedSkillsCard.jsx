import ProgressCard from "./ProgressCard.jsx";

function RecommendedSkillsCard({ goal, skills }) {
  return (
    <ProgressCard badge="Recommended Skills" title="Recommended Skills">
      <p className="text-sm leading-6 text-app-subtext">
        Focus on these skills to strengthen your {goal.toLowerCase()} roadmap and
        improve your readiness for role-specific applications.
      </p>

      <div className="mt-5 flex flex-wrap gap-3">
        {skills.map((skill) => (
          <span
            className="rounded-full border border-app-orange/25 bg-app-orange/10 px-4 py-2 text-sm font-medium text-app-orangeSoft shadow-[0_0_12px_rgba(255,120,73,0.1)]"
            key={skill}
          >
            {skill}
          </span>
        ))}
      </div>
    </ProgressCard>
  );
}

export default RecommendedSkillsCard;
