/* ────────────────────────────────────────────────
   Container — constrained width + fluid padding
   ──────────────────────────────────────────────── */

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: React.ElementType;
}

export function Container({ children, className = "", style, as: Tag = "div" }: ContainerProps) {
  return (
    <Tag
      className={className}
      style={{
        width: "100%",
        maxWidth: "var(--container-max)",
        marginInline: "auto",
        paddingInline: "var(--container-padding)",
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}
