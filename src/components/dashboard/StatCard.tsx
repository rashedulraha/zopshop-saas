import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string;
  change?: {
    value: string;
    trend: "up" | "down" | "neutral";
  };
  icon?: React.ElementType;
  className?: string;
}

export function StatCard({ title, value, change, icon: Icon, className }: StatCardProps) {
  return (
    <div className={cn("flex flex-col p-5 bg-card border border-border rounded-md", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        {Icon && (
          <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center">
            <Icon className="w-4 h-4 text-muted-foreground" />
          </div>
        )}
      </div>
      
      <div className="mt-auto">
        <span className="text-2xl font-semibold text-foreground tracking-tight">{value}</span>
        {change && (
          <div className="flex items-center gap-1.5 mt-2">
            <span className={cn(
              "text-xs font-medium px-1.5 py-0.5 rounded-sm border",
              change.trend === "up" && "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
              change.trend === "down" && "text-rose-500 bg-rose-500/10 border-rose-500/20",
              change.trend === "neutral" && "text-muted-foreground bg-muted border-border"
            )}>
              {change.trend === "up" ? "↑" : change.trend === "down" ? "↓" : "−"} {change.value}
            </span>
            <span className="text-xs text-muted-foreground">vs last month</span>
          </div>
        )}
      </div>
    </div>
  );
}
