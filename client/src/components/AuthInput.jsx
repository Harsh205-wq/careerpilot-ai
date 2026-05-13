function AuthInput({
  as = "input",
  className = "",
  endAdornment,
  error,
  hint,
  id,
  label,
  children,
  ...props
}) {
  const Control = as;
  const isSelect = as === "select";

  const controlClassName = [
    "w-full rounded-2xl border bg-app-sidebar px-4 py-3.5 text-sm text-app-text shadow-sm transition",
    "placeholder:text-app-muted focus:border-app-orange focus:outline-none focus:ring-2 focus:ring-app-orange/20",
    error ? "border-red-500/70" : "border-app-border",
    endAdornment && !isSelect ? "pr-24" : "",
    isSelect ? "appearance-none pr-10" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <label className={`block ${className}`.trim()} htmlFor={id}>
      <span className="mb-2 block text-sm font-medium text-app-text">{label}</span>

      <div className="relative">
        <Control
          aria-invalid={Boolean(error)}
          className={controlClassName}
          id={id}
          {...props}
        >
          {children}
        </Control>

        {endAdornment ? (
          <div className="absolute inset-y-0 right-3 flex items-center">
            {endAdornment}
          </div>
        ) : null}
      </div>

      {error ? (
        <p className="mt-2 text-sm text-red-400">{error}</p>
      ) : hint ? (
        <p className="mt-2 text-sm text-app-subtext">{hint}</p>
      ) : null}
    </label>
  );
}

export default AuthInput;
