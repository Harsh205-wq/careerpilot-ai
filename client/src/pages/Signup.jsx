import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthButton from "../components/AuthButton.jsx";
import AuthInput from "../components/AuthInput.jsx";
import AuthLayout from "../components/AuthLayout.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const ROLE_OPTIONS = ["Student", "Fresher", "Job Seeker"];
const YEAR_OPTIONS = ["1", "2", "3", "4", "Other"];
const FIELD_ORDER = [
  "name",
  "email",
  "password",
  "confirmPassword",
  "role",
  "age",
  "collegeName",
  "year",
  "branch",
];

const initialState = {
  age: "",
  branch: "",
  collegeName: "",
  confirmPassword: "",
  email: "",
  name: "",
  password: "",
  role: "",
  year: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const normalizeText = (value) => value.replace(/\s+/g, " ").trim();

const getValidationErrors = (formData) => {
  const nextErrors = {};
  const normalizedName = normalizeText(formData.name);
  const normalizedEmail = formData.email.trim().toLowerCase();
  const ageValue = formData.age.trim();
  const isStudent = formData.role === "Student";

  if (!normalizedName) {
    nextErrors.name = "Full name is required.";
  }

  if (!normalizedEmail) {
    nextErrors.email = "Email is required.";
  } else if (!emailPattern.test(normalizedEmail)) {
    nextErrors.email = "Enter a valid email address.";
  }

  if (!formData.password) {
    nextErrors.password = "Password is required.";
  } else if (formData.password.length < 6) {
    nextErrors.password = "Password must be at least 6 characters.";
  }

  if (!formData.confirmPassword) {
    nextErrors.confirmPassword = "Please confirm your password.";
  } else if (formData.confirmPassword !== formData.password) {
    nextErrors.confirmPassword = "Passwords do not match.";
  }

  if (!formData.role) {
    nextErrors.role = "Role is required.";
  }

  if (ageValue) {
    const parsedAge = Number(ageValue);

    if (!Number.isFinite(parsedAge) || parsedAge <= 0) {
      nextErrors.age = "Age must be a valid number.";
    }
  }

  if (isStudent) {
    if (!normalizeText(formData.collegeName)) {
      nextErrors.collegeName = "College name is required for students.";
    }

    if (!formData.year) {
      nextErrors.year = "Year is required for students.";
    }

    if (!normalizeText(formData.branch)) {
      nextErrors.branch = "Branch is required for students.";
    }
  }

  return nextErrors;
};

function Signup() {
  const navigate = useNavigate();
  const { isAuthenticated, signup } = useAuth();
  const formRef = useRef(null);
  const redirectTimerRef = useRef(null);
  const [formData, setFormData] = useState(initialState);
  const [touched, setTouched] = useState({});
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [signupCompleted, setSignupCompleted] = useState(false);

  const isStudent = formData.role === "Student";

  const validationErrors = useMemo(() => getValidationErrors(formData), [formData]);

  useEffect(() => {
    if (isAuthenticated && !signupCompleted) {
      navigate("/dashboard", { replace: true });
    }
  }, [isAuthenticated, navigate, signupCompleted]);

  useEffect(() => {
    return () => {
      if (redirectTimerRef.current) {
        window.clearTimeout(redirectTimerRef.current);
      }
    };
  }, []);

  const focusFirstInvalidField = (errors) => {
    const firstInvalidField = FIELD_ORDER.find((fieldName) => errors[fieldName]);

    if (!firstInvalidField) {
      return;
    }

    const element = formRef.current?.querySelector(`[name="${firstInvalidField}"]`);
    element?.focus();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => {
      if (name === "role" && value !== "Student") {
        return {
          ...current,
          branch: "",
          collegeName: "",
          role: value,
          year: "",
        };
      }

      return {
        ...current,
        [name]: value,
      };
    });

    if (error) {
      setError("");
    }

    if (successMessage) {
      setSuccessMessage("");
    }
  };

  const handleBlur = (event) => {
    const { name, value } = event.target;

    if (typeof value === "string" && ["name", "collegeName", "branch"].includes(name)) {
      const normalizedValue = normalizeText(value);

      if (normalizedValue !== value) {
        setFormData((current) => ({
          ...current,
          [name]: normalizedValue,
        }));
      }
    }

    setTouched((current) => ({
      ...current,
      [name]: true,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const normalizedData = {
      ...formData,
      branch: normalizeText(formData.branch),
      collegeName: normalizeText(formData.collegeName),
      email: formData.email.trim().toLowerCase(),
      name: normalizeText(formData.name),
    };

    const nextTouched = FIELD_ORDER.reduce((accumulator, fieldName) => {
      accumulator[fieldName] = true;
      return accumulator;
    }, {});

    setFormData(normalizedData);
    setTouched(nextTouched);
    setError("");
    setSuccessMessage("");

    const nextErrors = getValidationErrors(normalizedData);

    if (Object.keys(nextErrors).length > 0) {
      focusFirstInvalidField(nextErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      await signup({
        age: normalizedData.age.trim() ? Number(normalizedData.age.trim()) : undefined,
        branch: isStudent ? normalizedData.branch : "",
        collegeName: isStudent ? normalizedData.collegeName : "",
        email: normalizedData.email,
        name: normalizedData.name,
        password: normalizedData.password,
        role: normalizedData.role,
        year: isStudent ? normalizedData.year : "",
      });

      setSignupCompleted(true);
      setSuccessMessage("Account created successfully. Redirecting to your dashboard...");

      redirectTimerRef.current = window.setTimeout(() => {
        navigate("/dashboard", { replace: true });
      }, 900);
    } catch (submissionError) {
      setError(submissionError.message);
      setSignupCompleted(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      badge="Signup"
      footer={
        <p className="text-sm text-app-subtext">
          Already have an account?{" "}
          <Link
            className="font-medium text-app-orange transition hover:text-app-orangeSoft"
            to="/login"
          >
            Log in
          </Link>
        </p>
      }
      subtitle="Start your personalized career journey with CareerPilot AI."
      title="Create your account"
    >
      <form className="space-y-5" noValidate onSubmit={handleSubmit} ref={formRef}>
        <div className="grid gap-5 md:grid-cols-2">
          <AuthInput
            autoComplete="name"
            autoFocus
            className="md:col-span-2"
            error={touched.name ? validationErrors.name : ""}
            id="signup-name"
            label="Full Name"
            name="name"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Aditi Sharma"
            value={formData.name}
          />

          <AuthInput
            autoComplete="email"
            className="md:col-span-2"
            error={touched.email ? validationErrors.email : ""}
            id="signup-email"
            label="Email"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="you@example.com"
            type="email"
            value={formData.email}
          />

          <AuthInput
            as="select"
            error={touched.role ? validationErrors.role : ""}
            id="signup-role"
            label="Role"
            name="role"
            onBlur={handleBlur}
            onChange={handleChange}
            value={formData.role}
          >
            <option value="">Select your role</option>
            {ROLE_OPTIONS.map((roleOption) => (
              <option key={roleOption} value={roleOption}>
                {roleOption}
              </option>
            ))}
          </AuthInput>

          <AuthInput
            error={touched.age ? validationErrors.age : ""}
            hint="Optional, but useful for better guidance."
            id="signup-age"
            label="Age"
            min="1"
            name="age"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="21"
            type="number"
            value={formData.age}
          />

          <AuthInput
            autoComplete="new-password"
            endAdornment={
              <button
                className="rounded-full border border-app-softBorder bg-app-cardHover px-3 py-1 text-xs font-medium text-app-subtext transition hover:border-app-orange/35 hover:text-app-orangeSoft"
                onClick={() => setShowPassword((current) => !current)}
                type="button"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            }
            error={touched.password ? validationErrors.password : ""}
            id="signup-password"
            label="Password"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Create a password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
          />

          <AuthInput
            autoComplete="new-password"
            endAdornment={
              <button
                className="rounded-full border border-app-softBorder bg-app-cardHover px-3 py-1 text-xs font-medium text-app-subtext transition hover:border-app-orange/35 hover:text-app-orangeSoft"
                onClick={() => setShowConfirmPassword((current) => !current)}
                type="button"
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            }
            error={touched.confirmPassword ? validationErrors.confirmPassword : ""}
            id="signup-confirm-password"
            label="Confirm Password"
            name="confirmPassword"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Repeat your password"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
          />
        </div>

        {isStudent ? (
          <div className="space-y-5 rounded-[1.5rem] border border-app-softBorder bg-app-page/70 p-5">
            <div>
              <h2 className="text-base font-semibold text-app-text">Student details</h2>
              <p className="mt-1 text-sm text-app-subtext">
                These details help CareerPilot AI personalize your roadmap and
                recommendations.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <AuthInput
                className="md:col-span-2"
                error={touched.collegeName ? validationErrors.collegeName : ""}
                id="signup-college-name"
                label="College Name"
                name="collegeName"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="National Institute of Technology"
                value={formData.collegeName}
              />

              <AuthInput
                as="select"
                error={touched.year ? validationErrors.year : ""}
                hint={
                  formData.year === "Other"
                    ? "The current backend stores only numeric years, so Other will be sent safely without a number."
                    : ""
                }
                id="signup-year"
                label="Year"
                name="year"
                onBlur={handleBlur}
                onChange={handleChange}
                value={formData.year}
              >
                <option value="">Select your year</option>
                {YEAR_OPTIONS.map((yearOption) => (
                  <option key={yearOption} value={yearOption}>
                    {yearOption}
                  </option>
                ))}
              </AuthInput>

              <AuthInput
                error={touched.branch ? validationErrors.branch : ""}
                id="signup-branch"
                label="Branch"
                name="branch"
                onBlur={handleBlur}
                onChange={handleChange}
                placeholder="Computer Science"
                value={formData.branch}
              />
            </div>
          </div>
        ) : null}

        {successMessage ? (
          <div className="rounded-2xl border border-app-orange/20 bg-app-orange/10 px-4 py-3 text-sm text-app-orangeSoft">
            {successMessage}
          </div>
        ) : null}

        {error ? (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        ) : null}

        <AuthButton disabled={isSubmitting} type="submit">
          {isSubmitting ? "Creating account..." : "Create account"}
        </AuthButton>
      </form>
    </AuthLayout>
  );
}

export default Signup;
