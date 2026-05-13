import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardHome from "../components/dashboard/DashboardHome.jsx";
import DashboardLayout from "../components/dashboard/DashboardLayout.jsx";
import {
  dashboardSidebarItems,
  dashboardStats,
  profileSnapshotFallback,
  quickActions,
} from "../components/dashboard/dashboardData.js";
import {
  careerGoalOptions,
  DEFAULT_CAREER_GOAL,
  goalData,
} from "../components/dashboard/goalData.js";
import { authService } from "../services/authService.js";
import { useAuth } from "../context/AuthContext.jsx";

const createId = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const getSavedGoal = () => {
  if (typeof window === "undefined") {
    return DEFAULT_CAREER_GOAL;
  }

  const storedGoal = window.localStorage.getItem("careerGoal");
  return storedGoal && goalData[storedGoal] ? storedGoal : DEFAULT_CAREER_GOAL;
};

const resolveSelectedGoal = (...goalCandidates) =>
  goalCandidates.find((goal) => goal && goalData[goal]) || DEFAULT_CAREER_GOAL;

function Dashboard({ user: initialUser }) {
  const navigate = useNavigate();
  const { logout, setUser } = useAuth();
  const [selectedGoal, setSelectedGoal] = useState(() =>
    resolveSelectedGoal(initialUser?.targetRole, getSavedGoal()),
  );
  const [profileUser, setProfileUser] = useState(initialUser);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [profileError, setProfileError] = useState("");
  const [savingGoal, setSavingGoal] = useState(false);

  const selectedGoalData = goalData[selectedGoal] || goalData[DEFAULT_CAREER_GOAL];
  const roadmapSteps = selectedGoalData.roadmap.map((label, index) => ({
    id: `${createId(selectedGoal)}-roadmap-${index + 1}`,
    label,
    completed: index < selectedGoalData.completedRoadmapSteps,
  }));
  const dailyTasks = selectedGoalData.dailyTasks.map((label, index) => ({
    id: `${createId(selectedGoal)}-task-${index + 1}`,
    label,
    complete: index < selectedGoalData.completedTaskCount,
  }));
  const roadmapProgress = Math.round(
    (selectedGoalData.completedRoadmapSteps / selectedGoalData.roadmap.length) * 100,
  );

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const token = authService.getToken();
        if (!token) {
          setProfileError("Session expired. Please login again.");
          setLoadingProfile(false);
          return;
        }

        const profile = await authService.getProfile();
        const normalizedGoal = resolveSelectedGoal(profile?.targetRole, getSavedGoal());

        setProfileUser(profile);
        setUser?.(profile);
        setSelectedGoal(normalizedGoal);
        setProfileError("");

        if (typeof window !== "undefined") {
          window.localStorage.setItem("careerGoal", normalizedGoal);
        }
      } catch (error) {
        setProfileError(error.message || "Unable to load profile");
      } finally {
        setLoadingProfile(false);
      }
    };

    loadProfile();
  }, [setUser]);

  useEffect(() => {
    if (!initialUser) {
      return;
    }

    setProfileUser((currentProfile) => currentProfile || initialUser);

    if (initialUser.targetRole && goalData[initialUser.targetRole]) {
      setSelectedGoal(initialUser.targetRole);

      if (typeof window !== "undefined") {
        window.localStorage.setItem("careerGoal", initialUser.targetRole);
      }
    }
  }, [initialUser]);

  const handleGoalChange = async (goal) => {
    if (goal === selectedGoal || savingGoal) {
      return;
    }

    const previousGoal = selectedGoal;
    setSelectedGoal(goal);
    setSavingGoal(true);
    setProfileError("");

    try {
      const updatedProfile = await authService.updateProfile({ targetRole: goal });
      setProfileUser(updatedProfile);
      setUser?.(updatedProfile);

      if (typeof window !== "undefined") {
        window.localStorage.setItem("careerGoal", goal);
      }
    } catch (error) {
      setSelectedGoal(previousGoal);

      if (typeof window !== "undefined") {
        window.localStorage.setItem("careerGoal", previousGoal);
      }

      setProfileError(error.message || "Unable to sync your selected goal right now.");
    } finally {
      setSavingGoal(false);
    }
  };

  const activeUser = profileUser || initialUser;
  const resolvedUser = {
    branch:
      activeUser?.branch || activeUser?.department || profileSnapshotFallback.branch,
    careerGoal: selectedGoal,
    email: activeUser?.email?.trim() || "Complete your profile",
    name: activeUser?.name?.trim() || "Student",
    preferredJobType:
      activeUser?.preferredJobType ||
      activeUser?.jobType ||
      profileSnapshotFallback.preferredJobType,
    role:
      activeUser?.role || activeUser?.profileType || activeUser?.status || profileSnapshotFallback.role,
    year: String(activeUser?.year || activeUser?.currentYear || profileSnapshotFallback.year),
  };

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const profileSnapshot = {
    ...profileSnapshotFallback,
    branch: resolvedUser.branch,
    careerGoal: resolvedUser.careerGoal,
    preferredJobType: resolvedUser.preferredJobType,
    role: resolvedUser.role,
    year: resolvedUser.year,
  };

  const interviewPrepData = {
    actionAvailable: false,
    actionLabel: "Start Practice",
    actionPath: "/interview",
    confidence: selectedGoalData.confidence,
    interviewTopics: selectedGoalData.interviewTopics,
    nextSuggestion: selectedGoalData.interviewSuggestion,
    practicedQuestions: selectedGoalData.practicedQuestions,
    targetRole: resolvedUser.careerGoal,
  };

  const roadmapData = {
    actionAvailable: false,
    actionLabel: "View Roadmap",
    actionPath: "/roadmap",
    goal: resolvedUser.careerGoal,
    progress: roadmapProgress,
    steps: roadmapSteps,
  };

  const resumeHealthData = {
    actionAvailable: false,
    actionLabel: "Improve Resume",
    actionPath: "/resume",
    atsFriendly: selectedGoalData.atsFriendly,
    missingSections: selectedGoalData.missingSections,
    resumeTips: selectedGoalData.resumeTips,
    score: selectedGoalData.resumeScore,
    suggestion: selectedGoalData.resumeSuggestion,
    targetRole: selectedGoal,
  };

  const personalizedStats = dashboardStats.map((stat) => {
    if (stat.label === "Resume Score") {
      return {
        ...stat,
        description: `Role readiness score for your ${selectedGoal.toLowerCase()} track.`,
        value: `${selectedGoalData.resumeScore}%`,
      };
    }

    if (stat.label === "Roadmap Progress") {
      return {
        ...stat,
        description: `Progress in your ${selectedGoal.toLowerCase()} roadmap.`,
        value: `${roadmapProgress}%`,
      };
    }

    if (stat.label === "Interview Practice") {
      return {
        ...stat,
        description: `Selected-goal interview topics practiced this week.`,
        value: String(selectedGoalData.practicedQuestions),
      };
    }

    return stat;
  });

  return (
    <DashboardLayout
      items={dashboardSidebarItems}
      onLogout={handleLogout}
      user={resolvedUser}
    >
      <div className="space-y-4">
        {loadingProfile ? (
          <section className="rounded-[1.5rem] border border-[#303030] bg-[#181818] px-4 py-3 text-sm text-app-subtext">
            Syncing your latest profile preferences...
          </section>
        ) : null}

        {profileError ? (
          <section className="rounded-[1.5rem] border border-red-500/30 bg-red-900/20 px-4 py-3 text-sm text-red-300">
            {profileError}
          </section>
        ) : null}

        <DashboardHome
          dailyTasks={dailyTasks}
          goalOptions={careerGoalOptions}
          interviewPrep={interviewPrepData}
          isGoalSaving={savingGoal}
          onGoalChange={handleGoalChange}
          profileSnapshot={profileSnapshot}
          projects={selectedGoalData.projects}
          quickActions={quickActions}
          recommendedSkills={selectedGoalData.skills}
          resumeHealth={resumeHealthData}
          roadmapPreview={roadmapData}
          selectedGoal={selectedGoal}
          stats={personalizedStats}
        />
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
