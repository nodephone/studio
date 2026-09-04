"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebarStore } from "@/stores/sidebar-store";
import { WorkspaceSwitcher } from "@/components/navigation/workspace-switcher";
import {
  LayoutDashboard,
  Database,
  Lock,
  HardDrive,
  Activity,
  Settings,
  PanelLeftClose,
  PanelLeft,
  Sparkles,
  BookOpen,
  HelpCircle,
  Cpu,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed, toggleSidebar } = useSidebarStore();

  const mainNav = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      ready: true,
    },
    {
      name: "Database",
      href: "/dashboard/database",
      icon: Database,
      ready: true,
      badge: "PRD 004",
    },
    {
      name: "Authentication",
      href: "/dashboard/auth",
      icon: Lock,
      ready: false,
      badge: "PRD 003",
    },
    {
      name: "Storage",
      href: "/dashboard/storage",
      icon: HardDrive,
      ready: false,
      badge: "PRD 004",
    },
    {
      name: "Realtime",
      href: "/dashboard/realtime",
      icon: Activity,
      ready: false,
      badge: "PRD 005",
    },
  ];

  const secondaryNav = [
    {
      name: "Design System",
      href: "/dashboard/design-system",
      icon: Sparkles,
      ready: true,
      badge: "PRD 002",
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
      ready: true,
    },
  ];

  return (
    <aside
      className={cn(
        "hidden md:flex flex-col justify-between border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 transition-all duration-300 ease-in-out select-none z-20 shrink-0 h-screen sticky top-0",
        isCollapsed ? "w-16 p-2" : "w-64 p-3"
      )}
    >
      {/* Top Header & Workspace Switcher */}
      <div className="space-y-4">
        <div
          className={cn(
            "flex items-center justify-between px-2 pt-1 pb-2",
            isCollapsed && "justify-center px-0"
          )}
        >
          {!isCollapsed && (
            <Link
              href="/dashboard"
              className="flex items-center space-x-2.5 group cursor-pointer"
            >
              <div className="w-7 h-7 rounded-lg bg-neutral-900 dark:bg-neutral-100 flex items-center justify-center font-black text-xs text-emerald-400 dark:text-emerald-600 transition-transform group-hover:scale-105">
                N
              </div>
              <span className="font-bold text-sm tracking-tight text-neutral-900 dark:text-neutral-100">
                NodePhone
              </span>
              <span className="text-[10px] px-1.5 py-0.2 rounded font-mono font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                Studio
              </span>
            </Link>
          )}

          <button
            onClick={toggleSidebar}
            title={isCollapsed ? "Expand sidebar (⌘B)" : "Collapse sidebar (⌘B)"}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors cursor-pointer"
          >
            {isCollapsed ? (
              <PanelLeft className="w-4 h-4" />
            ) : (
              <PanelLeftClose className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Workspace Switcher */}
        <WorkspaceSwitcher />

        {/* Navigation Items */}
        <nav className="space-y-1 pt-2">
          {!isCollapsed && (
            <div className="px-3 pb-1 text-[10px] font-bold uppercase tracking-wider text-neutral-400">
              Modules
            </div>
          )}
          {mainNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.ready ? item.href : "#"}
                title={isCollapsed ? item.name : undefined}
                className={cn(
                  "flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group cursor-pointer",
                  isActive
                    ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-950 shadow-sm"
                    : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-neutral-900 dark:hover:text-neutral-100",
                  !item.ready && "opacity-60 cursor-not-allowed",
                  isCollapsed && "justify-center px-0 py-2.5"
                )}
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <Icon
                    className={cn(
                      "w-4 h-4 shrink-0 transition-colors",
                      isActive
                        ? "text-emerald-400 dark:text-emerald-600"
                        : "text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300"
                    )}
                  />
                  {!isCollapsed && (
                    <span className="truncate">{item.name}</span>
                  )}
                </div>

                {!isCollapsed && item.badge && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400 font-mono">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Footer Section */}
      <div className="space-y-2 pt-2 border-t border-neutral-100 dark:border-neutral-800">
        <nav className="space-y-1">
          {secondaryNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                title={isCollapsed ? item.name : undefined}
                className={cn(
                  "flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-neutral-900 dark:hover:text-neutral-100 transition-all cursor-pointer",
                  isActive && "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100",
                  isCollapsed && "justify-center px-0 py-2.5"
                )}
              >
                <Icon className="w-4 h-4 text-neutral-400 shrink-0" />
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {!isCollapsed && (
          <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 space-y-1.5">
            <div className="flex items-center space-x-2">
              <Cpu className="w-4 h-4 text-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold">NodePhone Kernel</span>
            </div>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-tight">
              Server connected & ready for module attachments.
            </p>
          </div>
        )}
      </div>
    </aside>
  );
}
