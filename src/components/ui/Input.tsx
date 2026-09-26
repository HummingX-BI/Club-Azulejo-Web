import { forwardRef } from "react";

/* ────────────────────────────────────────────────
   Input — simple text field with pill border
   ──────────────────────────────────────────────── */

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, className = "", style, ...props }, ref) => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", ...style }}>
        {label && (
          <label
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--font-size-small)",
              fontWeight: 500,
              color: "var(--color-text-muted)",
              letterSpacing: "0.02em",
            }}
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`ui-input ${className}`}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--font-size-body)",
            padding: "12px 20px",
            borderRadius: "var(--radius-pill)",
            backgroundColor: "var(--color-surface)",
            border: "1px solid var(--color-line)",
            color: "var(--color-text)",
            outline: "none",
            transition: "all var(--duration-sm) var(--ease-out)",
          }}
          {...props}
        />
        <style>{`
          .ui-input:focus {
            border-color: var(--color-accent);
            box-shadow: 0 0 0 1px var(--color-accent);
          }
          .ui-input::placeholder {
            color: var(--color-text-muted);
            opacity: 0.5;
          }
        `}</style>
      </div>
    );
  }
);

Input.displayName = "Input";
