/* ────────────────────────────────────────────────
   Eyebrow — small uppercase label with optional number
   "01 — Método"
   ──────────────────────────────────────────────── */

interface EyebrowProps {
  number?: string;
  children: React.ReactNode;
  className?: string;
}

export function Eyebrow({ number, children, className = "" }: EyebrowProps) {
  return (
    <p
      className={className}
      style={{
        fontFamily: "var(--font-body)",
        fontSize: "var(--font-size-eyebrow)",
        fontWeight: 600,
        textTransform: "uppercase",
        letterSpacing: "0.14em",
        color: "var(--color-text-muted)",
        lineHeight: 1.4,
      }}
    >
      {number && (
        <span className="tabular" style={{ marginRight: "8px" }}>
          {number} —
        </span>
      )}
      {children}
    </p>
  );
}
