"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/ThemeProvider";

interface ThemeToggleButtonProps {
  className?: string;
  showLabel?: boolean;
}

export default function ThemeToggleButton({ className = "", showLabel = false }: ThemeToggleButtonProps) {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggle}
      className={className}
      title={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      aria-label={isDark ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
    >
      {isDark ? <Sun className="w-5 h-5 shrink-0" /> : <Moon className="w-5 h-5 shrink-0" />}
      {showLabel ? <span className="font-medium text-sm">{isDark ? "Modo Claro" : "Modo Oscuro"}</span> : null}
    </button>
  );
}
