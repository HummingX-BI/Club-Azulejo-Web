/* ────────────────────────────────────────────────
   Section — vertical rhythm spacing
   ──────────────────────────────────────────────── */

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
}

export function Section({ children, className = "", style, id }: SectionProps) {
  return (
    <section
      id={id}
      className={className}
      style={{
        paddingBlock: "var(--spacing-section)",
        ...style,
      }}
    >
      {children}
    </section>
  );
}
