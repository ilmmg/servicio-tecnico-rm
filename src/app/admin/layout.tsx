
"use client";

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import { Toaster } from "sonner";
import { Menu, Snowflake, Sun, Moon } from "lucide-react";
import { useTheme } from "@/lib/ThemeProvider";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggle } = useTheme();

  return (
    <div className="min-h-screen bg-rm-black transition-colors duration-300">
      <Toaster position="bottom-right" theme={theme} richColors duration={3000} />

      {/* Mobile Top Bar */}
      <div className="lg:hidden sticky top-0 z-30 liquid-glass border-b border-white/5 flex items-center justify-between px-4 h-14">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-rm-blue/15 rounded-lg border border-rm-blue/15">
            <Snowflake className="w-4 h-4 text-rm-blue" />
          </div>
          <span className="font-extrabold italic tracking-tight text-sm">RM ADMIN</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={toggle} className="p-2.5 text-rm-text-muted hover:text-rm-blue rounded-lg active:scale-90 transition-all" title={theme === "dark" ? "Modo claro" : "Modo oscuro"}>
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <button onClick={() => setMobileOpen(true)} className="p-2.5 text-rm-text-muted hover:text-rm-blue rounded-lg active:scale-90 transition-all">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      <main className="lg:ml-64 min-h-screen transition-all duration-300">
        <div className="p-4 lg:p-6 max-w-[1400px] mx-auto w-full">{children}</div>
      </main>
    </div>
  );
}
