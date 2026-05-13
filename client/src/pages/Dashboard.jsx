import { useState } from "react";
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

function Dashboard({ user }) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [selectedGoal, setSelectedGoal] = useState(getSavedGoal);
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

  const handleGoalChange = (goal) => {
    setSelectedGoal(goal);

    if (typeof window !== "undefined") {
      window.localStorage.setItem("careerGoal", goal);
    }
  };

  const resolvedUser = {
    branch: user?.branch || user?.department || profileSnapshotFallback.branch,
    careerGoal: selectedGoal,
    email: user?.email?.trim() || "Complete your profile",
    name: user?.name?.trim() || "Student",
    preferredJobType:
      user?.preferredJobType ||
      user?.jobType ||
      profileSnapshotFallback.preferredJobType,
    role: user?.role || user?.profileType || user?.status || profileSnapshotFallback.role,
    year: String(user?.year || user?.currentYear || profileSnapshotFallback.year),
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
      <DashboardHome
        dailyTasks={dailyTasks}
        goalOptions={careerGoalOptions}
        interviewPrep={interviewPrepData}
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
    </DashboardLayout>
  );
}

export default Dashboard;
