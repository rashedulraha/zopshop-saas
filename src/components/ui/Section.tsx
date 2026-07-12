import { cn } from "@/lib/utils";
import { Container } from "@/components/providers/ResponsiveComponents";

// ─────────────────────────────────────────────────────────────────
// Section — universal page-section wrapper
//
// Usage:
//   <Section>...</Section>                         → default padding, centered
//   <Section id="features" size="lg">...</Section>
//   <Section fullBleed>...</Section>               → edge-to-edge (no inner max-w)
//
// Every section gets automatically:
//   - Consistent vertical padding (responsive)
//   - max-w-6xl centered inner container
//   - relative + z-10 for ambient orb layering
//   - overflow-hidden to clip decorations
// ─────────────────────────────────────────────────────────────────

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  /** Skip inner Container — for edge-to-edge sections */
  fullBleed?: boolean;
  /** Vertical padding size */
  size?: "xs" | "sm" | "md" | "lg";
  id?: string;
}

const paddingMap = {
  xs: "py-10 lg:py-14",
  sm: "py-14 lg:py-20",
  md: "py-20 lg:py-28",
  lg: "py-28 lg:py-36",
};

export function Section({
  children,
  className,
  as: Component = "section",
  fullBleed = false,
  size = "md",
  id,
  ...props
}: SectionProps) {
  return (
    <Component
      id={id}
      className={cn(
        "relative z-10 overflow-hidden px-4",
        paddingMap[size],
        className,
      )}
      {...props}>
      {fullBleed ? children : <Container>{children}</Container>}
    </Component>
  );
}

// ─────────────────────────────────────────────────────────────────
// SectionHeader — reusable centered heading block
//
// Usage:
//   <SectionHeader
//     label="Features"
//     title={<>Why <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">ZopShop?</span></>}
//     subtitle="Everything you need..."
//   />
// ─────────────────────────────────────────────────────────────────

interface SectionHeaderProps {
  label?: string;
  title: React.ReactNode;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}

export function SectionHeader({
  label,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-14 relative z-10",
        align === "center" ? "text-center flex flex-col items-center" : "",
        className,
      )}>
      {label && <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4">{label}</span>}
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-100 mb-3 leading-tight">{title}</h2>
      {subtitle && <p className="text-slate-400 text-lg max-w-2xl leading-relaxed mt-2">{subtitle}</p>}
    </div>
  );
}
