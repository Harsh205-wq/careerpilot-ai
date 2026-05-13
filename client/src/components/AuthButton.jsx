function AuthButton({
  children,
  className = "",
  disabled = false,
  type = "button",
  variant = "primary",
  ...props
}) {
  const baseClassName =
    "inline-flex w-full items-center justify-center rounded-2xl px-4 py-3.5 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-app-orange/30 disabled:cursor-not-allowed disabled:opacity-70";

  const variantClassName = {
    primary:
      "bg-app-orange text-white shadow-[0_0_18px_rgba(255,120,73,0.22)] hover:bg-app-orangeSoft hover:shadow-[0_0_22px_rgba(255,120,73,0.28)]",
    secondary:
      "border border-app-softBorder bg-app-cardHover text-app-text hover:border-app-orange/35 hover:text-app-orangeSoft",
    text: "w-auto px-0 py-0 text-app-subtext hover:bg-app-orange/10 hover:text-app-orange focus:ring-0",
  }[variant];

  return (
    <button
      className={`${baseClassName} ${variantClassName} ${className}`.trim()}
      disabled={disabled}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
}

export default AuthButton;
