import { useState } from "react";
import DashboardHeader from "./DashboardHeader.jsx";
import DashboardSidebar from "./DashboardSidebar.jsx";

function DashboardLayout({ children, items, onLogout, user }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const profileAvailable = items.some((item) => item.id === "profile" && item.available);

  return (
    <section className="mx-auto flex min-h-[calc(100vh-3rem)] w-full max-w-[1500px] items-start gap-6 pb-8">
      <DashboardSidebar
        activeItem="dashboard"
        isOpen={isSidebarOpen}
        items={items}
        onClose={() => setIsSidebarOpen(false)}
        onLogout={onLogout}
        userName={user?.name || "Student"}
      />

      <div className="flex min-w-0 flex-1 flex-col gap-6">
        <DashboardHeader
          onMenuToggle={() => setIsSidebarOpen(true)}
          profileAvailable={profileAvailable}
          userEmail={user?.email || "Complete your profile"}
          userName={user?.name || "Student"}
        />

        <div className="flex-1">{children}</div>
      </div>
    </section>
  );
}

export default DashboardLayout;
