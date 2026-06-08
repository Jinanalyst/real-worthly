"use client";

import { useId } from "react";

interface AuthFieldProps {
  label: string;
  type: "text" | "email" | "password";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  autoComplete?: string;
  required?: boolean;
  minLength?: number;
}

/** Labelled text input styled to match the onboarding flow. */
export function AuthField({
  label,
  type,
  value,
  onChange,
  placeholder,
  autoComplete,
  required,
  minLength,
}: AuthFieldProps) {
  const id = useId();
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-1.5 block text-sm font-semibold"
        style={{ color: "var(--ink)" }}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
        minLength={minLength}
        className="w-full rounded-2xl bg-white px-5 py-3.5 text-base outline-none transition-all focus:shadow-[0_4px_20px_rgba(13,110,90,0.12)]"
        style={{
          border: "2px solid var(--line)",
          color: "var(--ink)",
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = "var(--green-700)";
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = "var(--line)";
        }}
      />
    </div>
  );
}
