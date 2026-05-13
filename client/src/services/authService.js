import {
  AUTH_STORAGE_KEY,
  AUTH_TOKEN_STORAGE_KEY,
} from "../utils/constants.js";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  (typeof window !== "undefined"
    ? `http://${window.location.hostname}:4000/api`
    : "http://127.0.0.1:4000/api");

const wait = (duration = 150) =>
  new Promise((resolve) => {
    window.setTimeout(resolve, duration);
  });

const readStoredJson = (key) => {
  if (typeof window === "undefined") {
    return null;
  }

  const rawValue = window.localStorage.getItem(key);

  if (!rawValue) {
    return null;
  }

  try {
    return JSON.parse(rawValue);
  } catch {
    window.localStorage.removeItem(key);
    return null;
  }
};

const readStoredToken = () => {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);
};

const readStoredUser = () => {
  const storedToken = readStoredToken();

  if (!storedToken) {
    clearStoredSession();
    return null;
  }

  const storedUser = readStoredJson(AUTH_STORAGE_KEY);
  return storedUser ? buildUserProfile(storedUser) : null;
};

const saveUser = (user) => {
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(buildUserProfile(user)));
};

const saveToken = (token) => {
  window.localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);
};

const clearStoredSession = () => {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    window.localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);
  }
};

const PUBLIC_ROLE_TO_BACKEND_ROLE = {
  Fresher: "professional",
  "Job Seeker": "professional",
  Student: "student",
};

const normalizeText = (value) => value?.replace(/\s+/g, " ").trim() || "";

const normalizeEmail = (email) => email?.trim().toLowerCase() || "";

const parseOptionalNumber = (value) => {
  if (value === "" || value === undefined || value === null) {
    return undefined;
  }

  const parsedValue = Number(value);

  return Number.isFinite(parsedValue) ? parsedValue : Number.NaN;
};

const normalizeSignupInput = ({
  age,
  branch,
  collegeName,
  email,
  name,
  role,
  year,
}) => {
  const normalizedRoleLabel = normalizeText(role);
  const normalizedYear = typeof year === "string" ? year.trim() : year;

  return {
    age: parseOptionalNumber(age),
    branch: normalizeText(branch),
    collegeName: normalizeText(collegeName),
    email: normalizeEmail(email),
    name: normalizeText(name),
    role: PUBLIC_ROLE_TO_BACKEND_ROLE[normalizedRoleLabel] || "",
    roleLabel: normalizedRoleLabel,
    year:
      normalizedYear === "Other" || normalizedYear === "" || normalizedYear == null
        ? undefined
        : parseOptionalNumber(normalizedYear),
  };
};

const buildUserProfile = ({
  _id,
  age,
  branch,
  careerGoal,
  collegeName,
  email,
  focusArea,
  id,
  name,
  preferredJobType,
  role,
  roleLabel,
  skills,
  targetRole,
  year,
}) => ({
  age: age ?? null,
  branch: branch || "",
  careerGoal: careerGoal || "",
  collegeName: collegeName || "",
  email,
  focusArea: focusArea || "",
  id: id || _id || "",
  name: name || email?.split("@")[0] || "",
  preferredJobType: preferredJobType || "",
  role: role || "",
  roleLabel:
    roleLabel ||
    (role === "student" ? "Student" : role === "professional" ? "Job Seeker" : ""),
  skills: Array.isArray(skills)
    ? skills
    : typeof skills === "string"
    ? skills.split(",").map((skill) => skill.trim()).filter(Boolean)
    : [],
  targetRole: targetRole || "",
  accountRole: role || "",
  year: year ?? null,
});

const mergeProfileData = (baseProfile = {}, fallbackProfile = {}, overrideProfile = {}) => {
  const mergedProfile = { ...fallbackProfile, ...baseProfile };

  Object.entries(overrideProfile).forEach(([key, value]) => {
    if (value !== undefined) {
      mergedProfile[key] = value;
    }
  });

  return mergedProfile;
};

const parseApiResponse = async (response) => {
  const rawText = await response.text();

  if (!rawText) {
    return {};
  }

  try {
    return JSON.parse(rawText);
  } catch {
    throw new Error("Received an invalid response from the server.");
  }
};

const request = async (path, { body, method = "POST" } = {}) => {
  let response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(readStoredToken()
          ? { Authorization: `Bearer ${readStoredToken()}` }
          : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
  } catch {
    throw new Error(
      `Unable to reach the server at ${API_BASE_URL}. Make sure the backend is running.`,
    );
  }

  const data = await parseApiResponse(response);

  if (!response.ok) {
    throw new Error(data.message || "Request failed.");
  }

  return data;
};

const login = async ({ email, password }) => {
  await wait();

  const normalizedEmail = normalizeEmail(email);

  if (!normalizedEmail || !password) {
    throw new Error("Email and password are required.");
  }

  const response = await request("/auth/login", {
    body: {
      email: normalizedEmail,
      password,
    },
  });
  const user = buildUserProfile(response.user || {});

  saveUser(user);
  saveToken(response.token);

  return { token: response.token, user };
};

const signup = async ({
  age,
  branch,
  collegeName,
  email,
  name,
  password,
  role,
  year,
}) => {
  await wait();

  const normalizedProfile = normalizeSignupInput({
    age,
    branch,
    collegeName,
    email,
    name,
    role,
    year,
  });

  if (
    !normalizedProfile.name ||
    !normalizedProfile.email ||
    !password ||
    !normalizedProfile.role ||
    !normalizedProfile.roleLabel
  ) {
    throw new Error("Complete all required profile details to continue.");
  }

  if (Number.isNaN(normalizedProfile.age)) {
    throw new Error("Age must be a valid number.");
  }

  if (Number.isNaN(normalizedProfile.year)) {
    throw new Error("Year must be a valid number.");
  }

  const response = await request("/auth/signup", {
    body: {
      age: normalizedProfile.age,
      branch: normalizedProfile.branch || undefined,
      collegeName: normalizedProfile.collegeName || undefined,
      email: normalizedProfile.email,
      name: normalizedProfile.name,
      password,
      role: normalizedProfile.role,
      targetRole: normalizedProfile.roleLabel,
      year: normalizedProfile.year,
    },
  });
  const user = buildUserProfile(response.user || {});

  saveUser(user);
  saveToken(response.token);

  return { token: response.token, user };
};

const logout = () => {
  request("/auth/logout", { body: {} }).catch(() => {});
  clearStoredSession();
};

const getProfile = async () => {
  const response = await request("/auth/profile", { method: "GET" });
  const storedUser = readStoredJson(AUTH_STORAGE_KEY);
  const preservedRoleLabel =
    storedUser?.role === response.user?.role ? storedUser?.roleLabel : undefined;

  return buildUserProfile(mergeProfileData(response.user || {}, storedUser || {}, {
    roleLabel: preservedRoleLabel,
  }));
};

const updateProfile = async (profileData) => {
  const response = await request("/auth/profile", {
    method: "PUT",
    body: profileData,
  });
  const storedUser = readStoredJson(AUTH_STORAGE_KEY);
  const preservedRoleLabel =
    profileData?.roleLabel ||
    (storedUser?.role === response.user?.role ? storedUser?.roleLabel : undefined);
  const normalizedUser = buildUserProfile(mergeProfileData(
    response.user || {},
    storedUser || {},
    {
      ...profileData,
      roleLabel: preservedRoleLabel,
    },
  ));

  if (response.user) {
    saveUser(normalizedUser);
  }

  return normalizedUser;
};

export const authService = {
  getCurrentUser: readStoredUser,
  getToken: readStoredToken,
  login,
  logout,
  signup,
  getProfile,
  updateProfile,
};
