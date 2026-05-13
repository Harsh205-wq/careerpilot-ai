import { Link } from "react-router-dom";

function ProgressCard({
  actionAvailable = false,
  actionLabel,
  actionPath,
  badge,
  children,
  title,
}) {
  return (
    <section className="group relative flex h-full flex-col overflow-hidden rounded-[1.85rem] border border-[#303030] bg-[#1F1F1F] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.18)] transition hover:border-[#F47B3F]/30 hover:bg-[#242424]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#F47B3F] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-[#F47B3F]/10 to-transparent" />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="relative">
          <span className="inline-flex rounded-full border border-[#F47B3F]/20 bg-[#F47B3F]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#FF925C]">
            {badge}
          </span>
          <h3 className="mt-4 text-xl font-semibold text-[#F5F5F5]">{title}</h3>
        </div>

        {actionLabel ? (
          actionAvailable && actionPath ? (
            <Link
              className="inline-flex items-center justify-center rounded-2xl bg-[#F47B3F] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#FF925C] hover:shadow-[0_0_18px_rgba(244,123,63,0.22)]"
              to={actionPath}
            >
              {actionLabel}
            </Link>
          ) : (
            <button
              className="inline-flex cursor-not-allowed items-center justify-center rounded-2xl border border-[#303030] bg-[#242424] px-4 py-3 text-sm font-semibold text-[#8A8A8A]"
              disabled
              type="button"
            >
              {actionLabel}
            </button>
          )
        ) : null}
      </div>

      <div className="relative mt-6 flex-1">{children}</div>
    </section>
  );
}

export default ProgressCard;
