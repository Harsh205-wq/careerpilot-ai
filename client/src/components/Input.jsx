function Input({
  autoComplete,
  className = "",
  error,
  hint,
  id,
  label,
  name,
  onBlur,
  onChange,
  placeholder,
  type = "text",
  value,
  ...props
}) {
  return (
    <label className="field" htmlFor={id}>
      <span className="field-label">{label}</span>
      <input
        aria-invalid={Boolean(error)}
        autoComplete={autoComplete}
        className={`field-input ${error ? "has-error" : ""} ${className}`.trim()}
        id={id}
        name={name}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
        {...props}
      />
      {error ? <span className="field-message is-error">{error}</span> : null}
      {!error && hint ? <span className="field-message">{hint}</span> : null}
    </label>
  );
}

export default Input;
