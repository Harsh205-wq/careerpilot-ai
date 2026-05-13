const ProfileSummary = ({ profile }) => {
  if (!profile) return null;

  const displayRole =
    profile.roleLabel ||
    (profile.role === "student"
      ? "Student"
      : profile.role === "professional"
      ? "Job Seeker"
      : "Not set");

  // Calculate profile completion
  const fields = [
    profile.name,
    profile.role,
    profile.age,
    profile.collegeName,
    profile.year,
    profile.branch,
    profile.skills,
    profile.careerGoal,
    profile.targetRole,
    profile.preferredJobType,
  ];

  const filledFields = fields.filter(field =>
    field !== undefined && field !== null && field !== "" &&
    (!Array.isArray(field) || field.length > 0)
  ).length;

  const completionPercentage = Math.round((filledFields / fields.length) * 100);

  const skillsCount = Array.isArray(profile.skills) ? profile.skills.length :
    (profile.skills ? profile.skills.split(",").filter(s => s.trim()).length : 0);

  return (
    <div className="bg-[#1F1F1F] rounded-lg p-6 border border-[#303030] sticky top-6">
      <h3 className="text-lg font-semibold text-[#F5F5F5] mb-6">Profile Summary</h3>

      {/* Completion Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-[#C7C7C7]">Profile Completion</span>
          <span className="text-sm text-[#F47B3F] font-medium">{completionPercentage}%</span>
        </div>
        <div className="w-full bg-[#181818] rounded-full h-2">
          <div
            className="bg-[#F47B3F] h-2 rounded-full transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Summary Items */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm text-[#C7C7C7]">Target Role</span>
          <span className="text-sm text-[#F5F5F5] font-medium">
            {profile.targetRole || "Not set"}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-[#C7C7C7]">Skills</span>
          <span className="text-sm text-[#F5F5F5] font-medium">
            {skillsCount} skill{skillsCount !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-[#C7C7C7]">Preferred Job Type</span>
          <span className="text-sm text-[#F5F5F5] font-medium">
            {profile.preferredJobType || "Not set"}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-[#C7C7C7]">Current Role</span>
          <span className="text-sm text-[#F5F5F5] font-medium">
            {displayRole}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-sm text-[#C7C7C7]">Year</span>
          <span className="text-sm text-[#F5F5F5] font-medium">
            {profile.year ? `${profile.year}${profile.year === 1 ? 'st' : profile.year === 2 ? 'nd' : profile.year === 3 ? 'rd' : 'th'} Year` : "Not set"}
          </span>
        </div>
      </div>

      {/* Note */}
      <div className="mt-6 p-4 bg-[#181818] rounded-lg border border-[#303030]">
        <p className="text-xs text-[#8A8A8A]">
          Complete your profile to get better AI-powered career guidance.
        </p>
      </div>
    </div>
  );
};

export default ProfileSummary;
