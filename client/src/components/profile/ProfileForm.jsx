import { useEffect, useState } from "react";

const ROLE_OPTIONS = ["Student", "Fresher", "Job Seeker"];
const YEAR_OPTIONS = ["1", "2", "3", "4"];
const TARGET_ROLE_OPTIONS = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "MERN Stack Developer",
  "Java Developer",
  "Data Analyst",
  "AI/ML Engineer",
  "DevOps Engineer",
];
const JOB_TYPE_OPTIONS = ["Internship", "Full-time", "Remote", "Hybrid", "Any"];

const createEmptyFormState = () => ({
  name: "",
  email: "",
  role: "",
  age: "",
  collegeName: "",
  year: "",
  branch: "",
  skills: "",
  careerGoal: "",
  targetRole: "",
  preferredJobType: "",
});

const getDisplayRole = (profile) => {
  if (ROLE_OPTIONS.includes(profile?.roleLabel)) {
    return profile.roleLabel;
  }

  if (profile?.role === "student") {
    return "Student";
  }

  if (profile?.role === "professional") {
    return "Job Seeker";
  }

  return "";
};

const createFormState = (profile) => {
  if (!profile) {
    return createEmptyFormState();
  }

  return {
    name: profile.name || "",
    email: profile.email || "",
    role: getDisplayRole(profile),
    age: profile.age != null ? String(profile.age) : "",
    collegeName: profile.collegeName || "",
    year: profile.year != null ? String(profile.year) : "",
    branch: profile.branch || "",
    skills: Array.isArray(profile.skills) ? profile.skills.join(", ") : profile.skills || "",
    careerGoal: profile.careerGoal || "",
    targetRole: profile.targetRole || "",
    preferredJobType: profile.preferredJobType || "",
  };
};

const ProfileForm = ({ profile, onSubmit, onReset, saving }) => {
  const [formData, setFormData] = useState(createEmptyFormState);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    setFormData(createFormState(profile));
    setFormError("");
  }, [profile]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormError("");
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setFormError("Name is required.");
      return;
    }

    if (!formData.role) {
      setFormError("Role is required.");
      return;
    }

    const parsedAge = formData.age === "" ? undefined : Number(formData.age);
    const parsedYear = formData.year === "" ? undefined : Number(formData.year);

    if (Number.isNaN(parsedAge)) {
      setFormError("Age must be a valid number.");
      return;
    }

    if (Number.isNaN(parsedYear)) {
      setFormError("Year must be a valid number.");
      return;
    }

    const submitData = {
      name: formData.name.trim(),
      role: formData.role === "Student" ? "student" : "professional",
      roleLabel: formData.role,
      age: parsedAge,
      collegeName: formData.collegeName.trim(),
      year: parsedYear,
      branch: formData.branch.trim(),
      skills: formData.skills
        .split(",")
        .map((skill) => skill.trim())
        .filter(Boolean),
      careerGoal: formData.careerGoal.trim(),
      targetRole: formData.targetRole,
      preferredJobType: formData.preferredJobType,
    };

    Object.keys(submitData).forEach((key) => {
      if (submitData[key] === undefined) {
        delete submitData[key];
      }
    });

    onSubmit(submitData);
  };

  const handleReset = () => {
    setFormError("");
    setFormData(createFormState(profile));
    onReset();
  };

  return (
    <div className="rounded-lg border border-[#303030] bg-[#1F1F1F] p-6">
      <h2 className="mb-6 text-xl font-semibold text-[#F5F5F5]">Update Your Profile</h2>

      {formError ? (
        <div className="mb-6 rounded-lg border border-red-500/30 bg-red-900/20 p-4">
          <p className="text-sm text-red-400">{formError}</p>
        </div>
      ) : null}

      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <h3 className="mb-4 text-lg font-medium text-[#F5F5F5]">Basic Information</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#C7C7C7]">
                Full Name *
              </label>
              <input
                className="w-full rounded-lg border border-[#303030] bg-[#181818] px-3 py-2 text-[#F5F5F5] placeholder:text-[#8A8A8A] focus:border-[#F47B3F] focus:ring-2 focus:ring-[#F47B3F]/20"
                name="name"
                onChange={handleChange}
                placeholder="Enter your full name"
                type="text"
                value={formData.name}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[#C7C7C7]">
                Email
              </label>
              <input
                className="w-full cursor-not-allowed rounded-lg border border-[#303030] bg-[#181818] px-3 py-2 text-[#8A8A8A]"
                name="email"
                readOnly
                type="email"
                value={formData.email}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[#C7C7C7]">
                Role *
              </label>
              <select
                className="w-full rounded-lg border border-[#303030] bg-[#181818] px-3 py-2 text-[#F5F5F5] focus:border-[#F47B3F] focus:ring-2 focus:ring-[#F47B3F]/20"
                name="role"
                onChange={handleChange}
                value={formData.role}
              >
                <option value="">Select role</option>
                {ROLE_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[#C7C7C7]">
                Age
              </label>
              <input
                className="w-full rounded-lg border border-[#303030] bg-[#181818] px-3 py-2 text-[#F5F5F5] placeholder:text-[#8A8A8A] focus:border-[#F47B3F] focus:ring-2 focus:ring-[#F47B3F]/20"
                max="100"
                min="1"
                name="age"
                onChange={handleChange}
                placeholder="Enter your age"
                type="number"
                value={formData.age}
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-medium text-[#F5F5F5]">Education Details</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#C7C7C7]">
                College Name
              </label>
              <input
                className="w-full rounded-lg border border-[#303030] bg-[#181818] px-3 py-2 text-[#F5F5F5] placeholder:text-[#8A8A8A] focus:border-[#F47B3F] focus:ring-2 focus:ring-[#F47B3F]/20"
                name="collegeName"
                onChange={handleChange}
                placeholder="Enter college name"
                type="text"
                value={formData.collegeName}
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[#C7C7C7]">
                Year
              </label>
              <select
                className="w-full rounded-lg border border-[#303030] bg-[#181818] px-3 py-2 text-[#F5F5F5] focus:border-[#F47B3F] focus:ring-2 focus:ring-[#F47B3F]/20"
                name="year"
                onChange={handleChange}
                value={formData.year}
              >
                <option value="">Select year</option>
                {YEAR_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-[#C7C7C7]">
                Branch
              </label>
              <input
                className="w-full rounded-lg border border-[#303030] bg-[#181818] px-3 py-2 text-[#F5F5F5] placeholder:text-[#8A8A8A] focus:border-[#F47B3F] focus:ring-2 focus:ring-[#F47B3F]/20"
                name="branch"
                onChange={handleChange}
                placeholder="e.g., Computer Science, Mechanical Engineering"
                type="text"
                value={formData.branch}
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-medium text-[#F5F5F5]">Career Preferences</h3>
          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#C7C7C7]">
                Skills
              </label>
              <input
                className="w-full rounded-lg border border-[#303030] bg-[#181818] px-3 py-2 text-[#F5F5F5] placeholder:text-[#8A8A8A] focus:border-[#F47B3F] focus:ring-2 focus:ring-[#F47B3F]/20"
                name="skills"
                onChange={handleChange}
                placeholder="JavaScript, React, Node.js, MongoDB"
                type="text"
                value={formData.skills}
              />
              <p className="mt-1 text-xs text-[#8A8A8A]">Separate skills with commas</p>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[#C7C7C7]">
                Career Goal
              </label>
              <textarea
                className="w-full rounded-lg border border-[#303030] bg-[#181818] px-3 py-2 text-[#F5F5F5] placeholder:text-[#8A8A8A] focus:border-[#F47B3F] focus:ring-2 focus:ring-[#F47B3F]/20"
                name="careerGoal"
                onChange={handleChange}
                placeholder="Describe your career aspirations..."
                rows={3}
                value={formData.careerGoal}
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-[#C7C7C7]">
                  Target Role
                </label>
                <select
                  className="w-full rounded-lg border border-[#303030] bg-[#181818] px-3 py-2 text-[#F5F5F5] focus:border-[#F47B3F] focus:ring-2 focus:ring-[#F47B3F]/20"
                  name="targetRole"
                  onChange={handleChange}
                  value={formData.targetRole}
                >
                  <option value="">Select target role</option>
                  {TARGET_ROLE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-[#C7C7C7]">
                  Preferred Job Type
                </label>
                <select
                  className="w-full rounded-lg border border-[#303030] bg-[#181818] px-3 py-2 text-[#F5F5F5] focus:border-[#F47B3F] focus:ring-2 focus:ring-[#F47B3F]/20"
                  name="preferredJobType"
                  onChange={handleChange}
                  value={formData.preferredJobType}
                >
                  <option value="">Select job type</option>
                  {JOB_TYPE_OPTIONS.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-6">
          <button
            className="rounded-lg bg-[#F47B3F] px-6 py-2 text-white transition-colors hover:bg-[#FF925C] disabled:cursor-not-allowed disabled:opacity-50"
            disabled={saving}
            type="submit"
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>
          <button
            className="rounded-lg border border-[#303030] bg-[#242424] px-6 py-2 text-[#F5F5F5] transition-colors hover:border-[#F47B3F]/30 hover:text-[#FF925C] disabled:cursor-not-allowed disabled:opacity-50"
            disabled={saving}
            onClick={handleReset}
            type="button"
          >
            Reset Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
