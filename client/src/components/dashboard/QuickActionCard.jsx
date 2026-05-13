import { Link } from "react-router-dom";

function QuickActionCard({ action }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.7rem] border border-[#303030] bg-[#1F1F1F] p-5 shadow-[0_16px_34px_rgba(0,0,0,0.18)] transition hover:border-[#F47B3F]/30 hover:bg-[#242424]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[#F47B3F] to-transparent" />

      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[#F47B3F]/20 bg-[#F47B3F]/10 text-sm font-semibold text-[#FF925C]">
          {action.icon}
        </span>
        <span className="rounded-full border border-[#F47B3F]/20 bg-[#F47B3F]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#FF925C]">
          {action.available ? "Available" : "Coming soon"}
        </span>
      </div>

      <h3 className="mt-5 text-lg font-semibold text-[#F5F5F5]">{action.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-6 text-[#C7C7C7]">{action.description}</p>

      {action.available ? (
        <Link
          className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-[#F47B3F] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#FF925C] hover:shadow-[0_0_18px_rgba(244,123,63,0.22)]"
          to={action.path}
        >
          {action.cta}
        </Link>
      ) : (
        <button
          className="mt-5 inline-flex w-full cursor-not-allowed items-center justify-center rounded-2xl border border-[#303030] bg-[#242424] px-4 py-3 text-sm font-semibold text-[#8A8A8A]"
          disabled
          type="button"
        >
          {action.cta}
        </button>
      )}
    </article>
  );
}

export default QuickActionCard;
