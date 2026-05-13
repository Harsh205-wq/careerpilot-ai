const toneStyles = {
  ember: "from-[rgba(214,90,46,0.14)] to-transparent",
  muted: "from-[rgba(244,123,63,0.08)] to-transparent",
  orange: "from-[rgba(244,123,63,0.16)] to-transparent",
  soft: "from-[rgba(255,146,92,0.12)] to-transparent",
};

const getProgressFromValue = (value) => {
  const valueText = String(value);
  const numericValue = Number.parseInt(valueText, 10);

  if (Number.isNaN(numericValue)) {
    return 60;
  }

  return valueText.includes("%")
    ? numericValue
    : Math.min(100, Math.max(28, numericValue * 12));
};

function StatCard({ description, label, tone = "orange", value }) {
  const glowClassName = toneStyles[tone] || toneStyles.orange;
  const progressWidth = getProgressFromValue(value);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[#303030] bg-[#1F1F1F] p-6 shadow-[0_16px_34px_rgba(0,0,0,0.18)] transition hover:border-[#F47B3F]/30 hover:bg-[#242424]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#F47B3F] to-transparent" />
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-r ${glowClassName}`.trim()}
      />

      <div className="relative flex h-full flex-col">
        <span className="inline-flex w-fit rounded-full border border-[#F47B3F]/20 bg-[#F47B3F]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF925C]">
          {label}
        </span>
        <strong className="mt-5 block text-4xl font-semibold tracking-tight text-[#F5F5F5]">
          {value}
        </strong>
        <p className="mt-3 flex-1 text-sm leading-6 text-[#8A8A8A]">{description}</p>
        <div className="mt-6 h-2 overflow-hidden rounded-full bg-[#303030]">
          <span
            className="block h-full rounded-full bg-[#F47B3F] shadow-[0_0_12px_rgba(244,123,63,0.22)]"
            style={{ width: `${progressWidth}%` }}
          />
        </div>
      </div>
    </article>
  );
}

export default StatCard;
