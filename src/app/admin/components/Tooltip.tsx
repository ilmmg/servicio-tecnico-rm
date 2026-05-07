import { HelpCircle } from "lucide-react";

interface TooltipProps {
  content: string;
}

export default function Tooltip({ content }: TooltipProps) {
  return (
    <div className="relative group inline-flex items-center justify-center ml-1.5 cursor-help">
      <HelpCircle className="w-4 h-4 text-rm-text-muted/60 hover:text-rm-blue transition-colors" />
      <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 p-3 bg-rm-card border border-white/10 rounded-xl text-xs text-white shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[999] pointer-events-none font-normal leading-relaxed text-center">
        {content}
        {/* Triángulo del popup apuntando hacia arriba */}
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-[1px] border-4 border-transparent border-b-white/10"></div>
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 -mb-[2px] border-4 border-transparent border-b-rm-card"></div>
      </div>
    </div>
  );
}
