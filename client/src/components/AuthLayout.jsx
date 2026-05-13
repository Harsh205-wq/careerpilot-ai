import { Link } from "react-router-dom";

const BENEFITS = [
  "Build career roadmaps",
  "Improve your resume",
  "Practice interviews",
  "Track your progress",
];

const SNAPSHOTS = [
  { label: "Roadmap", value: "Personalized" },
  { label: "Resume", value: "ATS-ready" },
  { label: "Interview", value: "Role-based" },
  { label: "Progress", value: "Daily goals" },
];

function AuthLayout({ badge, children, footer, subtitle, title }) {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-6xl items-center">
      <article className="relative w-full overflow-hidden rounded-[2rem] border border-app-border bg-app-card shadow-[0_24px_70px_rgba(0,0,0,0.28)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,120,73,0.12),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(255,120,73,0.06),transparent_28%)]" />

        <div className="relative grid lg:grid-cols-[1.05fr,0.95fr]">
          <aside className="border-b border-app-border bg-app-sidebar/60 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
            <Link
              className="inline-flex items-center gap-3 rounded-full border border-app-softBorder bg-app-elevated px-4 py-2 text-sm font-semibold text-app-text transition hover:border-app-orange/40 hover:text-app-orange"
              to="/"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-app-orange shadow-[0_0_18px_rgba(255,120,73,0.28)]" />
              CareerPilot AI
            </Link>

            <div className="mt-10 max-w-xl">
              <span className="inline-flex items-center rounded-full border border-app-orange/20 bg-app-orange/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-app-orangeSoft">
                AI-powered guidance
              </span>

              <h2 className="mt-5 max-w-[15ch] text-3xl font-semibold tracking-tight text-app-text sm:text-4xl">
                Your AI-powered career guidance companion.
              </h2>

              <p className="mt-4 text-sm leading-7 text-app-subtext sm:text-base">
                CareerPilot AI helps students and job seekers stay organized with
                smarter roadmaps, stronger resumes, interview preparation, and
                visible progress.
              </p>
            </div>

            <div className="mt-8 grid gap-3">
              {BENEFITS.map((item) => (
                <div
                  className="flex items-start gap-3 rounded-2xl border border-app-border bg-app-elevated/80 px-4 py-3"
                  key={item}
                >
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-app-orange shadow-[0_0_14px_rgba(255,120,73,0.2)]" />
                  <span className="text-sm text-app-text">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {SNAPSHOTS.map((item) => (
                <div
                  className="rounded-2xl border border-app-border bg-app-elevated/90 p-4"
                  key={item.label}
                >
                  <span className="block text-xs uppercase tracking-[0.16em] text-app-muted">
                    {item.label}
                  </span>
                  <strong className="mt-2 block text-base text-app-text">
                    {item.value}
                  </strong>
                </div>
              ))}
            </div>
          </aside>

          <div className="p-5 sm:p-7 lg:p-10">
            <div className="mx-auto max-w-xl rounded-[1.75rem] border border-app-border bg-app-card p-6 shadow-[0_16px_40px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:p-8">
              <span className="inline-flex items-center rounded-full border border-app-orange/20 bg-app-orange/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-app-orangeSoft">
                {badge}
              </span>

              <h1 className="mt-5 max-w-none text-3xl font-semibold tracking-tight text-app-text sm:text-4xl">
                {title}
              </h1>

              <p className="mt-3 text-sm leading-7 text-app-subtext sm:text-base">
                {subtitle}
              </p>

              <div className="mt-8">{children}</div>

              {footer ? (
                <div className="mt-6 border-t border-app-border pt-5">
                  {footer}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}

export default AuthLayout;
