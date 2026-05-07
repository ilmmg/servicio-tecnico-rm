
import Link from "next/link";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  color?: string;
  href?: string;
}

export default function StatsCard({ title, value, icon, trend, color = "text-white", href }: StatsCardProps) {
  const content = (
    <div className="liquid-glass glass-shine rounded-xl sm:rounded-2xl p-4 sm:p-6 hover:-translate-y-0.5 transition-all duration-300 group h-full active:scale-[0.98]">
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1.5 sm:space-y-3 min-w-0">
          <p className="text-[10px] sm:text-sm font-medium text-rm-text-muted uppercase tracking-wider truncate">{title}</p>
          <p className={`text-xl sm:text-3xl font-black tracking-tight ${color} truncate`}>{value}</p>
          {trend && <p className="text-xs text-rm-blue font-medium">{trend}</p>}
        </div>
        <div className="p-2 sm:p-3 rounded-lg sm:rounded-xl bg-white/5 text-rm-text-muted group-hover:text-rm-blue group-hover:bg-rm-blue/10 transition-all duration-300 border border-white/5 shrink-0">
          {icon}
        </div>
      </div>
    </div>
  );

  if (href) {
    return <Link href={href} className="block h-full">{content}</Link>;
  }

  return content;
}
