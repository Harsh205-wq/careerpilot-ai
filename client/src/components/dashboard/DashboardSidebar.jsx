import { Link } from "react-router-dom";

const itemBaseClassName =
  "group flex w-full items-center gap-3 rounded-2xl border px-3.5 py-3 text-left text-sm font-medium transition";

function DashboardSidebar({
  activeItem = "dashboard",
  isOpen,
  items,
  onClose,
  onLogout,
  userName,
}) {
  const renderNavigationItem = (item) => {
    const isActive = item.id === activeItem;
    const containerClassName = `${itemBaseClassName} ${
      isActive
        ? "border-[#F47B3F]/25 bg-[#F47B3F]/10 text-[#FF925C] shadow-[0_0_18px_rgba(244,123,63,0.18)]"
        : "border-transparent text-[#C7C7C7] hover:border-[#303030] hover:bg-[#242424] hover:text-[#F5F5F5]"
    }`.trim();

    const iconClassName = `inline-flex h-9 w-9 items-center justify-center rounded-xl border text-xs font-semibold tracking-[0.18em] ${
      isActive
        ? "border-[#F47B3F]/25 bg-[#F47B3F]/10 text-[#FF925C]"
        : "border-[#262626] bg-[#121212] text-[#8A8A8A] group-hover:border-[#303030] group-hover:text-[#F5F5F5]"
    }`.trim();

    const label = (
      <>
        <span className={iconClassName}>{item.icon}</span>
        <span className="flex-1">{item.label}</span>
        {!item.available ? (
          <span className="rounded-full border border-[#303030] bg-[#1F1F1F] px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#8A8A8A]">
            Coming soon
          </span>
        ) : null}
      </>
    );

    if (!item.available) {
      return (
        <button
          className={`${containerClassName} cursor-not-allowed opacity-80`.trim()}
          disabled
          key={item.id}
          type="button"
        >
          {label}
        </button>
      );
    }

    return (
      <Link className={containerClassName} key={item.id} onClick={onClose} to={item.path}>
        {label}
      </Link>
    );
  };

  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-black/60 backdrop-blur-sm transition lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`.trim()}
        onClick={onClose}
      />

      <aside
        className={`fixed inset-y-5 left-5 z-40 flex w-[288px] flex-col rounded-[2rem] border border-[#303030] bg-[#181818] p-5 shadow-[0_24px_70px_rgba(0,0,0,0.34)] backdrop-blur-xl transition-transform duration-300 lg:sticky lg:top-6 lg:h-[calc(100vh-3rem)] lg:self-start lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-[120%]"
        }`.trim()}
      >
        <div className="flex items-center justify-between gap-3">
          <Link className="inline-flex items-center gap-3" onClick={onClose} to="/dashboard">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F47B3F] text-sm font-semibold text-white shadow-[0_0_18px_rgba(244,123,63,0.22)]">
              CP
            </span>
            <div>
              <strong className="block text-sm font-semibold text-[#F5F5F5]">
                CareerPilot AI
              </strong>
              <span className="text-xs text-[#8A8A8A]">Career guidance workspace</span>
            </div>
          </Link>

          <button
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[#303030] bg-[#1F1F1F] text-[#C7C7C7] transition hover:border-[#F47B3F]/30 hover:text-[#F5F5F5] lg:hidden"
            onClick={onClose}
            type="button"
          >
            x
          </button>
        </div>

        <div className="mt-8 rounded-[1.65rem] border border-[#303030] bg-[#1F1F1F] p-4">
          <span className="text-xs uppercase tracking-[0.22em] text-[#8A8A8A]">
            Logged in as
          </span>
          <strong className="mt-2 block text-base text-[#F5F5F5]">
            {userName || "Student"}
          </strong>
          <p className="mt-2 text-sm leading-6 text-[#C7C7C7]">
            Stay focused on your roadmap, resume, and interview prep.
          </p>
        </div>

        <nav className="mt-8 flex-1 space-y-2" aria-label="Dashboard navigation">
          {items.map(renderNavigationItem)}
        </nav>

        <button
          className="mt-6 inline-flex items-center justify-center rounded-2xl bg-[#F47B3F] px-4 py-3 text-sm font-semibold text-white shadow-[0_0_18px_rgba(244,123,63,0.22)] transition hover:bg-[#FF925C] hover:shadow-[0_0_22px_rgba(244,123,63,0.26)]"
          onClick={onLogout}
          type="button"
        >
          Logout
        </button>
      </aside>
    </>
  );
}

export default DashboardSidebar;
