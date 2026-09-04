"use client";

import { useSidebarStore } from "@/stores/sidebar-store";
import { WorkspaceSwitcher } from "./workspace-switcher";
import {
  LayoutDashboard,
  Database,
  Lock,
  HardDrive,
  Activity,
  Settings,
  X,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const { isMobileOpen, setMobileOpen } = useSidebarStore();
  const pathname = usePathname();

  if (!isMobileOpen) return null;

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, ready: true },
    { name: "Database", href: "/dashboard/database", icon: Database, ready: false, badge: "PRD 002" },
    { name: "Authentication", href: "/dashboard/auth", icon: Lock, ready: false, badge: "PRD 003" },
    { name: "Storage", href: "/dashboard/storage", icon: HardDrive, ready: false, badge: "PRD 004" },
    { name: "Realtime", href: "/dashboard/realtime", icon: Activity, ready: false, badge: "PRD 005" },
    { name: "Settings", href: "/dashboard/settings", icon: Settings, ready: true },
  ];

  return (
    <div className="fixed inset-0 z-50 md:hidden bg-black/60 backdrop-blur-xs flex animate-in fade-in duration-200">
      <div
        className="fixed inset-0"
        onClick={() => setMobileOpen(false)}
      />
      <div className="relative w-4/5 max-w-xs bg-white dark:bg-neutral-950 h-full border-r border-neutral-200 dark:border-neutral-800 p-4 flex flex-col justify-between z-10 animate-in slide-in-from-left duration-200">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-neutral-900 dark:bg-neutral-100 flex items-center justify-center font-black text-sm text-emerald-400 dark:text-emerald-600">
                N
              </div>
              <span className="font-bold text-base tracking-tight text-neutral-900 dark:text-neutral-100">
                NodePhone
              </span>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-1 rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="py-4">
            <WorkspaceSwitcher />
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.ready ? item.href : "#"}
                  onClick={() => item.ready && setMobileOpen(false)}
                  className={cn(
                    "flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                    isActive
                      ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                      : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900",
                    !item.ready && "opacity-60 cursor-not-allowed"
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-4 h-4 text-emerald-500" />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center space-x-2 text-xs text-neutral-500">
            <Zap className="w-3.5 h-3.5 text-emerald-500" />
            <span>NodePhone Kernel v1.0.0</span>
          </div>
        </div>
      </div>
    </div>
  );
}
