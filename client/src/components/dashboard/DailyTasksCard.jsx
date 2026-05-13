import ProgressCard from "./ProgressCard.jsx";

function DailyTasksCard({ goal, tasks }) {
  const completedCount = tasks.filter((task) => task.complete).length;
  const completionPercent = tasks.length
    ? Math.round((completedCount / tasks.length) * 100)
    : 0;

  return (
    <ProgressCard badge="Today's Tasks" title="Today's Tasks">
      <p className="mb-5 text-sm leading-6 text-app-subtext">
        Stay consistent with a daily checklist designed for your {goal.toLowerCase()}{" "}
        preparation.
      </p>

      <div className="mb-5 rounded-[1.4rem] border border-[#252525] bg-[#151515] px-4 py-3">
        <div className="flex items-center justify-between gap-3">
          <span className="text-sm text-app-subtext">
            {completedCount} of {tasks.length} tasks completed
          </span>
          <span className="rounded-full bg-app-orange px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white shadow-[0_0_12px_rgba(255,120,73,0.18)]">
            {completionPercent}% done
          </span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-black/25">
          <span
            className="block h-full rounded-full bg-gradient-to-r from-app-orange to-app-orangeSoft shadow-[0_0_10px_rgba(255,120,73,0.22)]"
            style={{ width: `${completionPercent}%` }}
          />
        </div>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <label
            className="flex items-start gap-3 rounded-[1.4rem] border border-[#252525] bg-[#151515] px-4 py-3 transition hover:border-app-orange/25 hover:bg-[#1a1a1a]"
            key={task.id}
          >
            <input
              checked={task.complete}
              className="mt-1 h-4 w-4 rounded border-[#242424] bg-black text-app-orange accent-app-orange"
              readOnly
              type="checkbox"
            />
            <span className="flex-1 text-sm text-app-text">{task.label}</span>
            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${
                task.complete
                  ? "bg-app-orange text-white shadow-[0_0_10px_rgba(255,120,73,0.18)]"
                  : "bg-app-orange/10 text-app-orangeSoft"
              }`.trim()}
            >
              {task.complete ? "Done" : "Pending"}
            </span>
          </label>
        ))}
      </div>
    </ProgressCard>
  );
}

export default DailyTasksCard;
