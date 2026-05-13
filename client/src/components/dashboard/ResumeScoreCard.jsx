import ProgressCard from "./ProgressCard.jsx";

function ResumeScoreCard({ data }) {
  return (
    <ProgressCard
      actionAvailable={data.actionAvailable}
      actionLabel={data.actionLabel}
      actionPath={data.actionPath}
      badge="Resume Health"
      title="Resume Health"
    >
      <div className="grid gap-4 md:grid-cols-[auto,1fr]">
        <div
          className="flex h-28 w-28 items-center justify-center rounded-full p-[10px] shadow-[0_0_16px_rgba(255,120,73,0.18)]"
          style={{
            background: `conic-gradient(#FF7849 ${data.score}%, rgba(255,120,73,0.14) ${data.score}% 100%)`,
          }}
        >
          <div className="flex h-full w-full items-center justify-center rounded-full border border-[#242424] bg-black text-2xl font-semibold text-app-orangeSoft">
            {data.score}%
          </div>
        </div>

        <div className="grid gap-3 rounded-[1.5rem] border border-[#252525] bg-[#151515] p-4">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-app-muted">ATS Friendly</span>
            <strong className="rounded-full bg-app-orange px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white shadow-[0_0_14px_rgba(255,120,73,0.18)]">
              {data.atsFriendly}
            </strong>
          </div>
          <div>
            <span className="text-sm text-app-muted">Target role</span>
            <p className="mt-2 text-sm font-medium text-app-text">{data.targetRole}</p>
          </div>
          <div>
            <span className="text-sm text-app-muted">Missing sections</span>
            <div className="mt-2 flex flex-wrap gap-2">
              {data.missingSections.map((item) => (
                <span
                  className="rounded-full border border-app-orange/30 bg-app-orange px-3 py-1 text-xs font-medium text-white shadow-[0_0_12px_rgba(255,120,73,0.14)]"
                  key={item}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div>
            <span className="text-sm text-app-muted">Suggestion</span>
            <p className="mt-2 rounded-[1.1rem] bg-app-orange/10 px-3 py-3 text-sm leading-6 text-app-subtext">
              {data.suggestion}
            </p>
          </div>
          <div>
            <span className="text-sm text-app-muted">Role-specific resume tips</span>
            <div className="mt-3 space-y-2">
              {data.resumeTips.map((tip) => (
                <div
                  className="rounded-[1rem] border border-[#252525] bg-black/20 px-3 py-3 text-sm leading-6 text-app-subtext"
                  key={tip}
                >
                  {tip}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </ProgressCard>
  );
}

export default ResumeScoreCard;
