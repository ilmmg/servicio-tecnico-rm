
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ClipboardList, Home, Link as LinkIcon, ShoppingCart, X } from "lucide-react";
import ThemeToggleButton from "@/components/ThemeToggleButton";
import LogoutButton from "./LogoutButton";

const NAV_ITEMS = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/inventario", label: "Inventario", icon: Package },
  { href: "/admin/ordenes", label: "Ordenes", icon: ClipboardList },
  { href: "/admin/ventas", label: "Punto de Venta", icon: ShoppingCart },
  { href: "/admin/integraciones", label: "Integraciones", icon: LinkIcon },
];

interface SidebarProps {
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}

export default function Sidebar({ mobileOpen, setMobileOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setMobileOpen && setMobileOpen(false)}
        />
      )}

      <aside className={`fixed left-0 top-0 h-screen z-50 flex flex-col transition-transform duration-300 ease-in-out w-64 ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
        <div className="absolute inset-0 liquid-glass rounded-none border-l-0 border-t-0 border-b-0" />

        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-center justify-between p-5 border-b border-white/5 min-h-[72px]">
            <div className="flex items-center gap-3">
              <Image src="/images/logo-rm.png" alt="RM Logo" width={120} height={36} className="object-contain h-9 w-auto" />
              <div className="overflow-hidden flex items-center mt-1">
                <span className="text-xs font-bold text-rm-text-muted tracking-wider">ADMIN</span>
              </div>
            </div>

            <button
              className="lg:hidden p-2 text-rm-text-muted hover:text-rm-blue rounded-lg hover:bg-white/5"
              onClick={() => setMobileOpen && setMobileOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href}
                  onClick={() => setMobileOpen && setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? "bg-rm-blue/15 text-rm-blue border border-rm-blue/20 font-semibold"
                      : "text-rm-text-muted hover:text-rm-blue hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <Icon className={`w-5 h-5 shrink-0 ${isActive ? "text-rm-blue" : "group-hover:text-rm-blue"}`} />
                  <span className="font-medium text-sm">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-3 border-t border-white/5 space-y-2">
            <ThemeToggleButton
              showLabel
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-rm-text-muted hover:text-rm-blue hover:bg-white/5 transition-all active:scale-95"
            />
            <LogoutButton className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-rm-text-muted hover:text-rm-blue hover:bg-white/5 transition-all active:scale-95" />
            <Link href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl text-rm-text-muted hover:text-rm-blue hover:bg-white/5 transition-all">
              <Home className="w-5 h-5 shrink-0" />
              <span className="font-medium text-sm">Volver al sitio</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
