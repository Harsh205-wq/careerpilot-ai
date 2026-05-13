export const dashboardSidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: "DB", path: "/dashboard", available: true },
  { id: "resume", label: "Resume Builder", icon: "RS", path: "/resume", available: false },
  { id: "roadmap", label: "Career Roadmap", icon: "RM", path: "/roadmap", available: false },
  { id: "interview", label: "Mock Interview", icon: "MI", path: "/interview", available: false },
  { id: "skills", label: "Skills", icon: "SK", path: "/skills", available: false },
  { id: "profile", label: "Profile", icon: "PF", path: "/profile", available: false },
  { id: "settings", label: "Settings", icon: "ST", path: "/settings", available: false },
];

export const dashboardStats = [
  {
    description: "Complete your profile to get better AI guidance.",
    label: "Profile Completion",
    tone: "soft",
    value: "70%",
  },
  {
    description: "Your current AI resume readiness score.",
    label: "Resume Score",
    tone: "orange",
    value: "82%",
  },
  {
    description: "Progress in your selected career path.",
    label: "Roadmap Progress",
    tone: "ember",
    value: "35%",
  },
  {
    description: "Questions practiced this week.",
    label: "Interview Practice",
    tone: "muted",
    value: "5",
  },
];

export const quickActions = [
  {
    available: false,
    cta: "Create Resume",
    description: "Build an ATS-friendly resume with structured AI guidance.",
    icon: "CV",
    id: "resume",
    path: "/resume",
    title: "Create Resume",
  },
  {
    available: false,
    cta: "Generate Roadmap",
    description:
      "Get a step-by-step roadmap based on your goal, skills, branch, and year.",
    icon: "RM",
    id: "roadmap",
    path: "/roadmap",
    title: "Generate Roadmap",
  },
  {
    available: false,
    cta: "Start Interview",
    description: "Practice role-based interview questions and improve your answers.",
    icon: "MI",
    id: "interview",
    path: "/interview",
    title: "Start Mock Interview",
  },
  {
    available: false,
    cta: "Update Profile",
    description: "Keep your profile updated so recommendations stay personalized.",
    icon: "PF",
    id: "profile",
    path: "/profile",
    title: "Update Profile",
  },
];

export const roadmapPreview = {
  actionAvailable: false,
  actionLabel: "View Roadmap",
  actionPath: "/roadmap",
  goal: "Full Stack Developer",
  progress: 35,
  steps: [
    { id: "javascript", label: "Learn JavaScript fundamentals", completed: true },
    { id: "react", label: "Build React projects", completed: true },
    { id: "node-express", label: "Learn Node.js and Express", completed: false },
    { id: "mongodb", label: "Connect MongoDB database", completed: false },
    { id: "fullstack", label: "Build full-stack projects", completed: false },
    { id: "dsa", label: "Practice DSA and interviews", completed: false },
  ],
};

export const resumeHealth = {
  actionAvailable: false,
  actionLabel: "Improve Resume",
  actionPath: "/resume",
  atsStatus: "Good",
  missingSections: ["Projects", "Achievements"],
  score: 82,
  suggestion: "Add measurable impact in your project descriptions.",
};

export const interviewPrep = {
  actionAvailable: false,
  actionLabel: "Start Practice",
  actionPath: "/interview",
  confidence: "Beginner",
  nextFocus: ["JavaScript", "Node.js", "React"],
  practicedQuestions: 5,
  targetRole: "Full Stack Developer",
};

export const dailyTasks = [
  { id: "profile", label: "Complete profile details", complete: false },
  { id: "resume-summary", label: "Improve resume summary", complete: true },
  { id: "interview-questions", label: "Practice 5 interview questions", complete: false },
  { id: "roadmap-topic", label: "Learn one roadmap topic", complete: false },
  { id: "dsa-problems", label: "Solve 2 DSA problems", complete: false },
];

export const recommendedSkills = [
  "JavaScript",
  "React",
  "Node.js",
  "MongoDB",
  "Express",
  "DSA",
  "Communication",
  "GitHub",
];

export const profileSnapshotFallback = {
  actionAvailable: false,
  actionLabel: "Complete Profile",
  actionPath: "/profile",
  branch: "CSE",
  careerGoal: "Full Stack Developer",
  preferredJobType: "Internship / Full-time",
  role: "Fresher",
  year: "3",
};
