import ProgressCard from "./ProgressCard.jsx";

function RoadmapPreview({ data }) {
  const completedSteps = data.steps.filter((step) => step.completed).length;

  return (
    <ProgressCard
      actionAvailable={data.actionAvailable}
      actionLabel={data.actionLabel}
      actionPath={data.actionPath}
      badge="Roadmap"
      title="Career Roadmap"
    >
      <div className="rounded-[1.4rem] border border-[#303030] bg-[#181818] p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-[0.18em] text-[#8A8A8A]">
              Target Role
            </span>
            <strong className="mt-2 block text-xl text-[#F5F5F5]">{data.goal}</strong>
          </div>
          <span className="rounded-full border border-[#F47B3F]/20 bg-[#F47B3F]/10 px-3 py-2 text-sm font-semibold text-[#FF925C]">
            {data.progress}% complete
          </span>
        </div>

        <p className="mt-4 text-sm leading-6 text-[#C7C7C7]">
          {completedSteps} of {data.steps.length} roadmap steps completed.
        </p>

        <div className="mt-5 h-3 overflow-hidden rounded-full bg-[#303030]">
          <span
            className="block h-full rounded-full bg-[#F47B3F] shadow-[0_0_12px_rgba(244,123,63,0.22)]"
            style={{ width: `${data.progress}%` }}
          />
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {data.steps.map((step, index) => (
          <div
            className="flex items-start gap-3 rounded-[1.3rem] border border-[#303030] bg-[#181818] px-4 py-3 transition hover:border-[#F47B3F]/25 hover:bg-[#242424]"
            key={step.id}
          >
            <span
              className={`mt-0.5 inline-flex h-8 w-8 flex-none items-center justify-center rounded-xl text-xs font-semibold ${
                step.completed
                  ? "bg-[#F47B3F] text-white shadow-[0_0_12px_rgba(244,123,63,0.22)]"
                  : "border border-[#303030] bg-[#1F1F1F] text-[#8A8A8A]"
              }`.trim()}
            >
              {step.completed ? "OK" : `0${index + 1}`}
            </span>
            <div className="flex-1">
              <strong className="block text-sm text-[#F5F5F5]">{step.label}</strong>
              <span
                className={`mt-1 block text-xs uppercase tracking-[0.16em] ${
                  step.completed ? "text-[#FF925C]" : "text-[#8A8A8A]"
                }`.trim()}
              >
                {step.completed ? "Completed" : "Pending"}
              </span>
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#303030]">
                <span
                  className={`block h-full rounded-full ${
                    step.completed
                      ? "bg-gradient-to-r from-[#F47B3F] to-[#FF925C] shadow-[0_0_10px_rgba(244,123,63,0.22)]"
                      : "bg-[#F47B3F]/20"
                  }`.trim()}
                  style={{ width: step.completed ? "100%" : "38%" }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </ProgressCard>
  );
}

export default RoadmapPreview;
