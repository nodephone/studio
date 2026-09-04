"use client";

import { usePathname } from "next/navigation";
import { useCommandPaletteStore } from "@/stores/command-palette-store";
import { useSidebarStore } from "@/stores/sidebar-store";
import { UserProfileMenu } from "@/components/navigation/user-profile-menu";
import {
  Search,
  Menu,
  ChevronRight,
  Server,
  Activity,
  Bell,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function TopNav() {
  const pathname = usePathname();
  const { open: openCommandPalette } = useCommandPaletteStore();
  const { toggleMobile } = useSidebarStore();

  const getBreadcrumbs = () => {
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length === 0) return [{ label: "Dashboard", href: "/dashboard" }];
    return parts.map((part, idx) => ({
      label: part.charAt(0).toUpperCase() + part.slice(1),
      href: "/" + parts.slice(0, idx + 1).join("/"),
    }));
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <header className="h-14 border-b border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md sticky top-0 z-30 flex items-center justify-between px-4 md:px-6">
      {/* Left: Mobile menu toggle & Breadcrumbs */}
      <div className="flex items-center space-x-3">
        <button
          onClick={toggleMobile}
          className="md:hidden p-1.5 rounded-lg text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 hover:bg-neutral-100 dark:hover:bg-neutral-900"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-xs text-neutral-500">
          <span className="font-medium text-neutral-400">Studio</span>
          {breadcrumbs.map((bc, idx) => (
            <div key={bc.href} className="flex items-center space-x-2">
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
              <span
                className={cn(
                  "font-semibold",
                  idx === breadcrumbs.length - 1
                    ? "text-neutral-900 dark:text-neutral-100"
                    : "text-neutral-500"
                )}
              >
                {bc.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Center/Right: Command Palette Trigger & Status */}
      <div className="flex items-center space-x-3">
        {/* Command Palette search bar */}
        <button
          onClick={openCommandPalette}
          className="hidden sm:flex items-center space-x-3 px-3 py-1.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all text-xs cursor-pointer shadow-2xs"
        >
          <Search className="w-3.5 h-3.5 text-neutral-400" />
          <span className="font-normal pr-4">Search or type a command...</span>
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-neutral-400 bg-white dark:bg-neutral-800 rounded border border-neutral-200 dark:border-neutral-700">
            ⌘K
          </kbd>
        </button>

        {/* Server Status pill */}
        <div className="hidden lg:flex items-center space-x-2 px-2.5 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[11px] font-medium">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Kernel Active</span>
        </div>

        {/* Notifications mock button */}
        <button
          onClick={openCommandPalette}
          className="p-2 rounded-full text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors cursor-pointer"
          title="Command Palette"
        >
          <Search className="w-4 h-4 sm:hidden" />
          <Bell className="w-4 h-4 hidden sm:block" />
        </button>

        {/* User Profile dropdown */}
        <UserProfileMenu />
      </div>
    </header>
  );
}
