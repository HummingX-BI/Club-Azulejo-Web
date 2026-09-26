/* ────────────────────────────────────────────────
   Card — surface panel, no shadow, no border
   ──────────────────────────────────────────────── */

interface CardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function Card({ children, className = "", style }: CardProps) {
  return (
    <div
      className={className}
      style={{
        backgroundColor: "var(--color-surface)",
        borderRadius: "var(--radius-card)",
        padding: "32px",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
