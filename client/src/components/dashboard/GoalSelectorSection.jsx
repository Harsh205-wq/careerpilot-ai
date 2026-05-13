import ProgressCard from "./ProgressCard.jsx";

function GoalSelectorSection({ goals, isSaving = false, onGoalChange, selectedGoal }) {
  return (
    <ProgressCard badge="Goal Selection" title="Select your career goal">
      <p className="max-w-3xl text-sm leading-7 text-app-subtext sm:text-base">
        Choose the role you are preparing for and CareerPilot AI will personalize
        your roadmap, skills, interview prep, and daily tasks.
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {goals.map((goal) => {
          const isSelected = goal === selectedGoal;

          return (
            <button
              aria-pressed={isSelected}
              className={`group rounded-[1.5rem] border px-4 py-4 text-left transition ${
                isSelected
                  ? "border-app-orange bg-app-orange/12 shadow-app-glow-sm"
                  : "border-[#303030] bg-[#181818] hover:border-app-orange/25 hover:bg-[#202020]"
              } ${isSaving ? "cursor-wait opacity-80" : ""}`.trim()}
              disabled={isSaving}
              key={goal}
              onClick={() => onGoalChange(goal)}
              type="button"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] ${
                      isSelected
                        ? "bg-app-orange text-white"
                        : "border border-[#303030] bg-[#1F1F1F] text-app-muted"
                    }`.trim()}
                  >
                    {isSelected ? "Selected" : "Role"}
                  </span>
                  <strong
                    className={`mt-4 block text-base transition ${
                      isSelected ? "text-app-text" : "text-app-subtext group-hover:text-app-text"
                    }`.trim()}
                  >
                    {goal}
                  </strong>
                </div>
                <span
                  className={`mt-1 inline-flex h-3 w-3 rounded-full ${
                    isSelected ? "bg-app-orange shadow-app-glow-sm" : "bg-[#3A3A3A]"
                  }`.trim()}
                />
              </div>

              <p
                className={`mt-3 text-sm leading-6 ${
                  isSelected ? "text-app-subtext" : "text-app-muted"
                }`.trim()}
              >
                Personalized roadmap, projects, interview topics, and daily focus.
              </p>
            </button>
          );
        })}
      </div>

      <div className="mt-5 rounded-[1.4rem] border border-[#303030] bg-[#181818] px-4 py-3">
        <span className="text-xs uppercase tracking-[0.18em] text-app-muted">
          {isSaving ? "Syncing selected goal" : "Current dashboard focus"}
        </span>
        <p className="mt-2 text-sm text-app-text sm:text-base">
          {isSaving ? `Saving ${selectedGoal}...` : selectedGoal}
        </p>
      </div>
    </ProgressCard>
  );
}

export default GoalSelectorSection;
