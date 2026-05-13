import { useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthButton from "../components/AuthButton.jsx";
import AuthInput from "../components/AuthInput.jsx";
import AuthLayout from "../components/AuthLayout.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const initialState = {
  email: "",
  password: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const formRef = useRef(null);
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [touched, setTouched] = useState({});

  const validationErrors = useMemo(() => {
    const nextErrors = {};
    const normalizedEmail = formData.email.trim().toLowerCase();

    if (!normalizedEmail) {
      nextErrors.email = "Email is required.";
    } else if (!emailPattern.test(normalizedEmail)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!formData.password) {
      nextErrors.password = "Password is required.";
    }

    return nextErrors;
  }, [formData.email, formData.password]);

  const focusFirstInvalidField = (errors) => {
    const firstInvalidField = ["email", "password"].find((fieldName) => errors[fieldName]);

    if (!firstInvalidField) {
      return;
    }

    const element = formRef.current?.querySelector(`[name="${firstInvalidField}"]`);
    element?.focus();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));

    if (error) {
      setError("");
    }

    if (infoMessage) {
      setInfoMessage("");
    }
  };

  const handleBlur = (event) => {
    const { name } = event.target;

    setTouched((current) => ({
      ...current,
      [name]: true,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextTouched = {
      email: true,
      password: true,
    };

    setTouched(nextTouched);
    setError("");
    setInfoMessage("");

    if (Object.keys(validationErrors).length > 0) {
      focusFirstInvalidField(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      await login({
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      navigate("/dashboard", { replace: true });
    } catch (submissionError) {
      setError(submissionError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      badge="Login"
      footer={
        <p className="text-sm text-app-subtext">
          Don&apos;t have an account?{" "}
          <Link
            className="font-medium text-app-orange transition hover:text-app-orangeSoft"
            to="/signup"
          >
            Sign up
          </Link>
        </p>
      }
      subtitle="Log in to continue your career preparation journey."
      title="Welcome back"
    >
      <form className="space-y-5" noValidate onSubmit={handleSubmit} ref={formRef}>
        <AuthInput
          autoComplete="email"
          autoFocus
          error={touched.email ? validationErrors.email : ""}
          hint="Use the email you signed up with."
          id="login-email"
          label="Email"
          name="email"
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="you@example.com"
          type="email"
          value={formData.email}
        />

        <AuthInput
          autoComplete="current-password"
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
          id="login-password"
          label="Password"
          name="password"
          onBlur={handleBlur}
          onChange={handleChange}
          placeholder="Enter your password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
        />

        <div className="flex items-center justify-end">
          <AuthButton
            className="text-sm"
            onClick={() =>
              setInfoMessage(
                "Password reset is available in the backend, but a dedicated reset screen is not wired into the frontend yet.",
              )
            }
            type="button"
            variant="text"
          >
            Forgot password?
          </AuthButton>
        </div>

        {infoMessage ? (
          <div className="rounded-2xl border border-app-orange/20 bg-app-orange/10 px-4 py-3 text-sm text-app-orangeSoft">
            {infoMessage}
          </div>
        ) : null}

        {error ? (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </div>
        ) : null}

        <AuthButton disabled={isSubmitting} type="submit">
          {isSubmitting ? "Logging in..." : "Log in"}
        </AuthButton>
      </form>
    </AuthLayout>
  );
}

export default Login;
