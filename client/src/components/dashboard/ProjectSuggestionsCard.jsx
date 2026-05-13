import ProgressCard from "./ProgressCard.jsx";

function ProjectSuggestionsCard({ goal, projects }) {
  return (
    <ProgressCard badge="Project Suggestions" title="Project Suggestions">
      <p className="text-sm leading-6 text-app-subtext">
        Build portfolio-ready proof for your {goal.toLowerCase()} applications with
        focused, role-aligned projects.
      </p>

      <div className="mt-5 space-y-3">
        {projects.map((project, index) => (
          <div
            className="flex items-start gap-3 rounded-[1.35rem] border border-[#252525] bg-[#151515] px-4 py-3 transition hover:border-app-orange/25 hover:bg-[#1a1a1a]"
            key={project}
          >
            <span className="inline-flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-app-orange/10 text-xs font-semibold text-app-orangeSoft">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0">
              <strong className="block text-sm text-app-text">{project}</strong>
              <p className="mt-1 text-sm leading-6 text-app-muted">
                Portfolio-ready work aligned with your current roadmap.
              </p>
            </div>
          </div>
        ))}
      </div>
    </ProgressCard>
  );
}

export default ProjectSuggestionsCard;
