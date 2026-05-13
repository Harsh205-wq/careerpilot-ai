import ProgressCard from "./ProgressCard.jsx";

function InterviewPrepCard({ data }) {
  return (
    <ProgressCard
      actionAvailable={data.actionAvailable}
      actionLabel={data.actionLabel}
      actionPath={data.actionPath}
      badge="Mock Interview Prep"
      title="Mock Interview Prep"
    >
      <div className="grid gap-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-[1.4rem] border border-[#252525] bg-[#151515] p-4">
            <span className="text-xs uppercase tracking-[0.16em] text-app-muted">
              Target role
            </span>
            <strong className="mt-2 block text-base text-app-text">{data.targetRole}</strong>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-black/25">
              <span className="block h-full w-[72%] rounded-full bg-gradient-to-r from-app-orange to-app-orangeSoft shadow-[0_0_10px_rgba(255,120,73,0.22)]" />
            </div>
          </div>

          <div className="rounded-[1.4rem] border border-[#252525] bg-[#151515] p-4">
            <span className="text-xs uppercase tracking-[0.16em] text-app-muted">
              Practiced questions
            </span>
            <strong className="mt-2 block text-base text-app-orangeSoft">
              {data.practicedQuestions}
            </strong>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-black/25">
              <span
                className="block h-full rounded-full bg-gradient-to-r from-app-orange to-app-orangeSoft shadow-[0_0_10px_rgba(255,120,73,0.22)]"
                style={{ width: `${Math.min(100, data.practicedQuestions * 14)}%` }}
              />
            </div>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-[1.4rem] border border-[#252525] bg-[#151515] p-4">
            <span className="text-xs uppercase tracking-[0.16em] text-app-muted">
              Confidence level
            </span>
            <strong className="mt-2 inline-flex rounded-full bg-app-orange px-3 py-1 text-sm font-semibold text-white shadow-[0_0_12px_rgba(255,120,73,0.18)]">
              {data.confidence}
            </strong>
          </div>

          <div className="rounded-[1.4rem] border border-[#252525] bg-[#151515] p-4">
            <span className="text-xs uppercase tracking-[0.16em] text-app-muted">
              Next suggestion
            </span>
            <p className="mt-2 rounded-[1rem] bg-app-orange/10 px-3 py-3 text-sm leading-6 text-app-subtext">
              {data.nextSuggestion}
            </p>
          </div>
        </div>

        <div className="rounded-[1.4rem] border border-[#252525] bg-[#151515] p-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs uppercase tracking-[0.16em] text-app-muted">
              Interview focus topics
            </span>
            <span className="rounded-full border border-app-orange/20 bg-app-orange/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-app-orangeSoft">
              {data.interviewTopics.length} topics
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {data.interviewTopics.map((topic) => (
              <span
                className="rounded-full border border-[#303030] bg-[#1D1D1D] px-3 py-2 text-sm text-app-subtext transition hover:border-app-orange/25 hover:text-app-text"
                key={topic}
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>
    </ProgressCard>
  );
}

export default InterviewPrepCard;
