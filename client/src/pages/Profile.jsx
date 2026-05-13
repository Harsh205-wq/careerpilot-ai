import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileForm from "../components/profile/ProfileForm.jsx";
import ProfileSummary from "../components/profile/ProfileSummary.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { authService } from "../services/authService.js";

const Profile = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = authService.getToken();

        if (!token) {
          setError("Session expired. Please login again.");
          navigate("/login", { replace: true });
          return;
        }

        const userProfile = await authService.getProfile();
        setProfile(userProfile);
      } catch (err) {
        setError(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleUpdateProfile = async (updatedData) => {
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const updatedProfile = await authService.updateProfile(updatedData);
      const syncedProfile = {
        ...profile,
        ...updatedProfile,
        careerGoal: updatedData.careerGoal ?? updatedProfile.careerGoal,
        preferredJobType:
          updatedData.preferredJobType ?? updatedProfile.preferredJobType,
        roleLabel: updatedData.roleLabel || updatedProfile.roleLabel,
        skills: updatedData.skills ?? updatedProfile.skills,
        targetRole: updatedData.targetRole ?? updatedProfile.targetRole,
      };

      setProfile(syncedProfile);

      if (syncedProfile) {
        setUser?.(syncedProfile);
      }

      if (typeof window !== "undefined" && syncedProfile?.targetRole) {
        window.localStorage.setItem("careerGoal", syncedProfile.targetRole);
      }

      setSuccess("Profile updated successfully.");
    } catch (err) {
      setError(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setError("");
    setSuccess("");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#121212] p-6 text-[#F5F5F5]">
        <div className="mx-auto max-w-6xl">
          <div className="py-12 text-center">
            <p className="text-[#C7C7C7]">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !profile) {
    return (
      <div className="min-h-screen bg-[#121212] p-6 text-[#F5F5F5]">
        <div className="mx-auto max-w-6xl">
          <div className="py-12 text-center">
            <p className="text-red-400">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#121212] p-6 text-[#F5F5F5]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <button
            className="mb-4 rounded-lg border border-[#303030] bg-[#242424] px-4 py-2 text-[#F5F5F5] transition-colors hover:border-[#F47B3F]/30 hover:text-[#FF925C]"
            onClick={() => navigate("/dashboard")}
            type="button"
          >
            Back to Dashboard
          </button>
          <h1 className="mb-2 text-3xl font-bold text-[#F5F5F5]">Career Profile</h1>
          <p className="text-[#C7C7C7]">
            Update your details so CareerPilot AI can personalize your roadmap,
            resume, and interview preparation.
          </p>
        </div>

        {error ? (
          <div className="mb-6 rounded-lg border border-red-500/30 bg-red-900/20 p-4">
            <p className="text-red-400">{error}</p>
          </div>
        ) : null}

        {success ? (
          <div className="mb-6 rounded-lg border border-green-500/30 bg-green-900/20 p-4">
            <p className="text-green-400">{success}</p>
          </div>
        ) : null}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <ProfileForm
              onReset={handleReset}
              onSubmit={handleUpdateProfile}
              profile={profile}
              saving={saving}
            />
          </div>

          <div className="lg:col-span-1">
            <ProfileSummary profile={profile} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
