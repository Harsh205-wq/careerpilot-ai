import DailyTasksCard from "./DailyTasksCard.jsx";
import GoalSelectorSection from "./GoalSelectorSection.jsx";
import InterviewPrepCard from "./InterviewPrepCard.jsx";
import ProjectSuggestionsCard from "./ProjectSuggestionsCard.jsx";
import QuickActionCard from "./QuickActionCard.jsx";
import RecommendedSkillsCard from "./RecommendedSkillsCard.jsx";
import ResumeScoreCard from "./ResumeScoreCard.jsx";
import RoadmapPreview from "./RoadmapPreview.jsx";
import StatCard from "./StatCard.jsx";

function DashboardHome({
  dailyTasks,
  goalOptions,
  interviewPrep,
  onGoalChange,
  projects,
  quickActions,
  recommendedSkills,
  resumeHealth,
  roadmapPreview,
  selectedGoal,
  stats,
}) {
  const completedTasks = dailyTasks.filter((task) => task.complete).length;
  const completionPercent = dailyTasks.length
    ? Math.round((completedTasks / dailyTasks.length) * 100)
    : 0;
  const pendingTasks = dailyTasks.filter((task) => !task.complete);
  const nextRoadmapStep =
    roadmapPreview.steps.find((step) => !step.completed)?.label ||
    "Review completed roadmap steps";
  const completedRoadmapSteps = roadmapPreview.steps.filter((step) => step.completed).length;
  const topSkills = recommendedSkills.slice(0, 3);
  const focusTasks = pendingTasks.slice(0, 3);

  return (
    <div className="space-y-6">
      <GoalSelectorSection
        goals={goalOptions}
        onGoalChange={onGoalChange}
        selectedGoal={selectedGoal}
      />

      <section className="relative overflow-hidden rounded-[2.35rem] border border-[#202020] bg-[#0d0d0d] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.34)] xl:p-8">
        <div className="pointer-events-none absolute -left-16 top-0 h-56 w-56 rounded-full bg-app-orange/12 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-48 w-48 rounded-full bg-app-orange/10 blur-3xl" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-app-orange via-app-orangeSoft/80 to-transparent" />

        <div className="relative grid gap-6 xl:grid-cols-[1.18fr,0.82fr]">
          <div>
            <span className="inline-flex rounded-full border border-app-orange/25 bg-app-orange/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-app-orangeSoft">
              CareerPilot Command Center
            </span>
            <h2 className="mt-5 max-w-3xl text-3xl font-semibold tracking-tight text-app-text sm:text-4xl">
              Your {roadmapPreview.goal} journey now has a stronger visual flow.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-app-subtext sm:text-base">
              Resume score is at {resumeHealth.score}%, roadmap progress is {roadmapPreview.progress}%, and you&apos;ve already finished {completedTasks} of {dailyTasks.length} focus tasks. Next best move: {nextRoadmapStep}.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {topSkills.map((skill) => (
                <span
                  className="rounded-full border border-app-orange/20 bg-app-orange/10 px-4 py-2 text-sm font-medium text-app-orangeSoft"
                  key={skill}
                >
                  {skill}
                </span>
              ))}
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-3">
              <div className="rounded-[1.7rem] border border-[#252525] bg-[#141414] p-4 shadow-[0_14px_30px_rgba(0,0,0,0.18)]">
                <span className="text-xs uppercase tracking-[0.18em] text-app-muted">
                  Resume Score
                </span>
                <strong className="mt-3 block text-3xl font-semibold tracking-tight text-app-orangeSoft">
                  {resumeHealth.score}%
                </strong>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-black/25">
                  <span
                    className="block h-full rounded-full bg-gradient-to-r from-app-orange to-app-orangeSoft shadow-[0_0_12px_rgba(255,120,73,0.25)]"
                    style={{ width: `${resumeHealth.score}%` }}
                  />
                </div>
              </div>

              <div className="rounded-[1.7rem] border border-[#252525] bg-[#141414] p-4 shadow-[0_14px_30px_rgba(0,0,0,0.18)]">
                <span className="text-xs uppercase tracking-[0.18em] text-app-muted">
                  Daily Focus
                </span>
                <strong className="mt-3 block text-3xl font-semibold tracking-tight text-app-text">
                  {completionPercent}%
                </strong>
                <p className="mt-3 text-sm text-app-subtext">
                  {completedTasks} tasks done today
                </p>
              </div>

              <div className="rounded-[1.7rem] border border-[#252525] bg-[#141414] p-4 shadow-[0_14px_30px_rgba(0,0,0,0.18)]">
                <span className="text-xs uppercase tracking-[0.18em] text-app-muted">
                  Roadmap Steps
                </span>
                <strong className="mt-3 block text-3xl font-semibold tracking-tight text-app-text">
                  {completedRoadmapSteps}/{roadmapPreview.steps.length}
                </strong>
                <p className="mt-3 text-sm text-app-subtext">
                  Milestones already unlocked
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="rounded-[1.9rem] border border-[#252525] bg-[#141414] p-5 shadow-[0_16px_34px_rgba(0,0,0,0.2)]">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-flex rounded-full bg-app-orange px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-white shadow-[0_0_14px_rgba(255,120,73,0.2)]">
                    Live roadmap
                  </span>
                  <h3 className="mt-4 text-2xl font-semibold text-app-text">
                    {roadmapPreview.progress}% complete
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-app-subtext">
                    {nextRoadmapStep}
                  </p>
                </div>
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-app-orange/10 text-lg font-semibold text-app-orangeSoft">
                  RM
                </div>
              </div>

              <div className="mt-5 h-3 overflow-hidden rounded-full bg-black/25">
                <span
                  className="block h-full rounded-full bg-gradient-to-r from-app-orange to-app-orangeSoft shadow-[0_0_14px_rgba(255,120,73,0.28)]"
                  style={{ width: `${roadmapPreview.progress}%` }}
                />
              </div>

              <div className="mt-5 grid gap-3">
                {roadmapPreview.steps.slice(0, 3).map((step) => (
                  <div
                    className="flex items-center justify-between gap-3 rounded-[1.2rem] bg-black/20 px-3 py-3"
                    key={step.id}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`inline-flex h-8 w-8 items-center justify-center rounded-xl text-xs font-semibold ${
                          step.completed
                            ? "bg-app-orange text-white"
                            : "bg-app-orange/10 text-app-orangeSoft"
                        }`.trim()}
                      >
                        {step.completed ? "OK" : "NX"}
                      </span>
                      <span className="text-sm text-app-text">{step.label}</span>
                    </div>
                    <span
                      className={`text-xs font-medium uppercase tracking-[0.16em] ${
                        step.completed ? "text-app-orangeSoft" : "text-app-muted"
                      }`.trim()}
                    >
                      {step.completed ? "Done" : "Next"}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-[1.7rem] border border-[#252525] bg-[#141414] p-4 shadow-[0_14px_30px_rgba(0,0,0,0.18)]">
                <span className="text-xs uppercase tracking-[0.18em] text-app-muted">
                  Today&apos;s Focus
                </span>
                <div className="mt-4 space-y-3">
                  {focusTasks.map((task) => (
                    <div className="flex items-start gap-3" key={task.id}>
                      <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-app-orange text-[10px] font-semibold text-white">
                        Go
                      </span>
                      <span className="text-sm leading-6 text-app-subtext">{task.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[1.7rem] border border-[#252525] bg-[#141414] p-4 shadow-[0_14px_30px_rgba(0,0,0,0.18)]">
                <span className="text-xs uppercase tracking-[0.18em] text-app-muted">
                  Quick Snapshot
                </span>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between gap-3 rounded-[1rem] bg-black/20 px-3 py-3">
                    <span className="text-sm text-app-subtext">ATS Friendly</span>
                    <span className="rounded-full bg-app-orange/10 px-3 py-1 text-xs font-semibold text-app-orangeSoft">
                      {resumeHealth.atsFriendly}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3 rounded-[1rem] bg-black/20 px-3 py-3">
                    <span className="text-sm text-app-subtext">Confidence</span>
                    <span className="rounded-full bg-app-orange px-3 py-1 text-xs font-semibold text-white">
                      {interviewPrep.confidence}
                    </span>
                  </div>
                  <div className="flex items-center justify-between gap-3 rounded-[1rem] bg-black/20 px-3 py-3">
                    <span className="text-sm text-app-subtext">Target Role</span>
                    <span className="text-sm font-medium text-app-text">
                      {interviewPrep.targetRole}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.08fr,0.92fr]">
        <div className="grid gap-4 md:grid-cols-2">
          {stats.map((stat) => (
            <StatCard
              description={stat.description}
              key={stat.label}
              label={stat.label}
              tone={stat.tone}
              value={stat.value}
            />
          ))}
        </div>

        <section className="relative overflow-hidden rounded-[2rem] border border-[#202020] bg-[#101010] p-6 shadow-[0_18px_40px_rgba(0,0,0,0.26)] backdrop-blur-xl">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-app-orange/85 via-app-orangeSoft/70 to-transparent" />
          <div className="mb-5 flex flex-col gap-2">
            <span className="inline-flex w-fit rounded-full border border-app-orange/20 bg-app-orange/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-app-orangeSoft">
              Quick Actions
            </span>
            <h2 className="max-w-none text-2xl font-semibold tracking-tight text-app-text">
              Move Faster
            </h2>
            <p className="text-sm leading-6 text-app-subtext">
              Jump into your next workflow with a cleaner, more focused launch area.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {quickActions.map((action) => (
              <QuickActionCard action={action} key={action.id} />
            ))}
          </div>
        </section>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr,0.85fr]">
        <RoadmapPreview data={roadmapPreview} />
        <InterviewPrepCard data={interviewPrep} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
        <DailyTasksCard goal={selectedGoal} tasks={dailyTasks} />
        <RecommendedSkillsCard goal={selectedGoal} skills={recommendedSkills} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.05fr,0.95fr]">
        <ProjectSuggestionsCard goal={selectedGoal} projects={projects} />
        <ResumeScoreCard data={resumeHealth} />
      </section>
    </div>
  );
}

export default DashboardHome;
