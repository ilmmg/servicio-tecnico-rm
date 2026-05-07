interface StatusBadgeProps {
  label: string;
  colorClasses: string;
}

export default function StatusBadge({ label, colorClasses }: StatusBadgeProps) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${colorClasses}`}>
      {label}
    </span>
  );
}
