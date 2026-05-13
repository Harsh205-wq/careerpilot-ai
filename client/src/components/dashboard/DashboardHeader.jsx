import { Link } from "react-router-dom";

function DashboardHeader({
  onMenuToggle,
  profileAvailable = false,
  userEmail,
  userName,
}) {
  const displayName = userName || "Student";
  const displayEmail = userEmail || "Complete your profile";
  const userInitial = displayName.slice(0, 1).toUpperCase();

  return (
    <header className="relative rounded-[2rem] border border-[#303030] bg-[#181818] px-5 py-5 shadow-[0_20px_44px_rgba(0,0,0,0.24)] before:absolute before:left-8 before:right-8 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-[#F47B3F]/70 before:to-transparent sm:px-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-3">
          <button
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[#303030] bg-[#1F1F1F] text-[#F5F5F5] transition hover:border-[#F47B3F]/30 hover:text-[#FF925C] lg:hidden"
            onClick={onMenuToggle}
            type="button"
          >
            Menu
          </button>

          <div>
            <p className="inline-flex rounded-full border border-[#F47B3F]/20 bg-[#F47B3F]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#FF925C]">
              Dashboard
            </p>
            <h1 className="mt-3 max-w-none text-3xl font-semibold tracking-tight text-[#F5F5F5] sm:text-4xl">
              Welcome back, {displayName}
            </h1>
            <p className="mt-2 text-sm leading-7 text-[#C7C7C7] sm:text-base">
              Here&apos;s your career preparation overview.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3 rounded-2xl border border-[#303030] bg-[#1F1F1F] px-4 py-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F47B3F] text-sm font-semibold text-white shadow-[0_0_14px_rgba(244,123,63,0.18)]">
              {userInitial}
            </span>
            <div>
              <span className="block text-xs uppercase tracking-[0.18em] text-[#8A8A8A]">
                User
              </span>
              <strong className="mt-1 block text-sm text-[#F5F5F5]">{displayEmail}</strong>
            </div>
          </div>

          {profileAvailable ? (
            <Link
              className="inline-flex items-center justify-center rounded-2xl bg-[#F47B3F] px-4 py-3 text-sm font-semibold text-white shadow-[0_0_18px_rgba(244,123,63,0.22)] transition hover:bg-[#FF925C] hover:shadow-[0_0_22px_rgba(244,123,63,0.28)]"
              to="/profile"
            >
              Update Profile
            </Link>
          ) : (
            <button
              className="inline-flex cursor-not-allowed items-center justify-center rounded-2xl border border-[#303030] bg-[#242424] px-4 py-3 text-sm font-semibold text-[#8A8A8A]"
              disabled
              type="button"
            >
              Update Profile
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
