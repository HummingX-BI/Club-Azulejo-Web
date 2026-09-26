/* ────────────────────────────────────────────────
   Divider — 1px line; "lane" variant = dashed
   ──────────────────────────────────────────────── */

interface DividerProps {
  variant?: "default" | "lane";
  className?: string;
  style?: React.CSSProperties;
}

export function Divider({ variant = "default", className = "", style }: DividerProps) {
  return (
    <hr
      className={className}
      style={{
        border: "none",
        height: "1px",
        backgroundColor: variant === "lane" ? "transparent" : "var(--color-line)",
        borderTop: variant === "lane" ? "1px dashed var(--color-line)" : "none",
        ...style,
      }}
    />
  );
}
