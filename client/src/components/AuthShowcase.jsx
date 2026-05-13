function AuthShowcase({
  badge,
  eyebrow,
  title,
  description,
  tags = [],
  stages = [],
  metrics = [],
  note,
  className = "",
}) {
  return (
    <aside
      className={`relative overflow-hidden rounded-[2rem] border border-app-border bg-app-card p-6 shadow-app-card ${className}`.trim()}
    >
      <div className="pointer-events-none absolute -left-10 top-0 h-40 w-40 rounded-full bg-app-orange/15 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-44 w-44 rounded-full bg-app-orange/10 blur-3xl" aria-hidden="true" />

      <div className="relative">
        <span className="inline-flex rounded-full border border-app-orange/20 bg-app-orange/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-app-orangeSoft">
          {badge}
        </span>
        <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-app-orangeSoft">
          {eyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-app-text">{title}</h2>
        <p className="mt-3 text-sm leading-7 text-app-subtext">{description}</p>
      </div>

      <div className="relative mt-6 flex flex-wrap gap-2" aria-label="Key focus areas">
        {tags.map((tag) => (
          <span
            className="rounded-full border border-app-orange/20 bg-app-orange/10 px-3 py-1 text-xs font-semibold text-app-orangeSoft"
            key={tag}
          >
            {tag}
          </span>
        ))}
      </div>

      <section
        className="relative mt-6 space-y-4 rounded-[1.75rem] border border-app-border bg-app-elevated p-5"
        aria-label="Career preparation journey"
      >
        {stages.map((stage, index) => (
          <article
            className="flex items-start gap-3 rounded-[1.25rem] border border-app-softBorder bg-app-card p-4"
            key={stage.title}
          >
            <span className="mt-0.5 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-app-orange/12 text-xs font-semibold text-app-orangeSoft" aria-hidden="true">
              {index + 1}
            </span>
            <div className="min-w-0 flex-1">
              <strong className="block text-sm text-app-text">{stage.title}</strong>
              <span className="mt-1 block text-sm leading-6 text-app-subtext">
                {stage.caption}
              </span>
            </div>
            <span className="rounded-full border border-app-orange/20 bg-app-orange/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-app-orangeSoft">
              {stage.meta}
            </span>
          </article>
        ))}
      </section>

      <div className="relative mt-6 grid gap-3 sm:grid-cols-3">
        {metrics.map((metric) => (
          <article
            className="rounded-[1.5rem] border border-app-border bg-app-elevated p-4"
            key={metric.label}
          >
            <strong className="block text-2xl font-semibold tracking-tight text-app-text">
              {metric.value}
            </strong>
            <span className="mt-2 block text-sm text-app-subtext">{metric.label}</span>
          </article>
        ))}
      </div>

      {note ? <p className="relative mt-6 text-sm leading-7 text-app-subtext">{note}</p> : null}
    </aside>
  );
}

export default AuthShowcase;
