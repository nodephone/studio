"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCommandPaletteStore } from "@/stores/command-palette-store";
import { useSidebarStore } from "@/stores/sidebar-store";
import { useAuthStore } from "@/stores/auth-store";
import {
  Search,
  LayoutDashboard,
  Database,
  Lock,
  HardDrive,
  Activity,
  Settings,
  LogOut,
  Moon,
  Sun,
  Laptop,
  Terminal,
  ExternalLink,
  Code2,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CommandItem {
  id: string;
  icon: React.ElementType;
  title: string;
  category: "Navigation" | "Modules" | "System" | "Account";
  shortcut?: string;
  badge?: string;
  action: () => void;
}

export function CommandPalette() {
  const router = useRouter();
  const { isOpen, close, searchQuery, setSearchQuery } =
    useCommandPaletteStore();
  const { toggleSidebar } = useSidebarStore();
  const { logout } = useAuthStore();
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        useCommandPaletteStore.getState().toggle();
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        toggleSidebar();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar]);

  const items: CommandItem[] = [
    {
      id: "nav-dashboard",
      icon: LayoutDashboard,
      title: "Go to Dashboard Overview",
      category: "Navigation",
      shortcut: "G D",
      action: () => {
        router.push("/dashboard");
        close();
      },
    },
    {
      id: "module-db",
      icon: Database,
      title: "Database Inspector & Tables",
      category: "Modules",
      badge: "PRD 002",
      action: () => close(),
    },
    {
      id: "module-auth",
      icon: Lock,
      title: "Auth Rules & Users",
      category: "Modules",
      badge: "PRD 003",
      action: () => close(),
    },
    {
      id: "module-storage",
      icon: HardDrive,
      title: "Storage Buckets & Files",
      category: "Modules",
      badge: "PRD 004",
      action: () => close(),
    },
    {
      id: "module-realtime",
      icon: Activity,
      title: "Realtime Subscriptions & Channels",
      category: "Modules",
      badge: "PRD 005",
      action: () => close(),
    },
    {
      id: "sys-sidebar",
      icon: Terminal,
      title: "Toggle Sidebar",
      category: "System",
      shortcut: "⌘B",
      action: () => {
        toggleSidebar();
        close();
      },
    },
    {
      id: "sys-docs",
      icon: BookOpen,
      title: "View NodePhone API Documentation",
      category: "System",
      action: () => {
        window.open("https://github.com/nodephone/studio", "_blank");
        close();
      },
    },
    {
      id: "account-logout",
      icon: LogOut,
      title: "Sign Out of Studio",
      category: "Account",
      action: () => {
        logout();
        close();
        router.push("/auth/login");
      },
    },
  ];

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery]);

  useEffect(() => {
    if (!isOpen) return;

    const handlePaletteNav = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredItems.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredItems.length - 1
        );
      } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
        e.preventDefault();
        filteredItems[selectedIndex].action();
      }
    };

    window.addEventListener("keydown", handlePaletteNav);
    return () => window.removeEventListener("keydown", handlePaletteNav);
  }, [isOpen, filteredItems, selectedIndex, close]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-20 px-4 animate-in fade-in duration-150">
      <div
        className="fixed inset-0"
        onClick={close}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-xl bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-150">
        {/* Search header */}
        <div className="flex items-center px-4 py-3.5 border-b border-neutral-100 dark:border-neutral-800">
          <Search className="w-5 h-5 text-neutral-400 shrink-0 mr-3" />
          <input
            type="text"
            placeholder="Type a command or search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-400 text-sm focus:outline-none"
          />
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-neutral-400 bg-neutral-100 dark:bg-neutral-800 rounded border border-neutral-200 dark:border-neutral-700">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="py-8 text-center text-sm text-neutral-400">
              No results found for &quot;{searchQuery}&quot;
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  onClick={item.action}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={cn(
                    "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left text-xs transition-colors cursor-pointer",
                    isSelected
                      ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                      : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/50"
                  )}
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <div
                      className={cn(
                        "p-1.5 rounded-lg border",
                        isSelected
                          ? "bg-white dark:bg-neutral-700 border-neutral-300 dark:border-neutral-600 text-emerald-500"
                          : "bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-400"
                      )}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-sm truncate">
                      {item.title}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0 ml-2">
                    {item.badge && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium">
                        {item.badge}
                      </span>
                    )}
                    {item.shortcut && (
                      <kbd className="text-[10px] font-mono px-1.5 py-0.5 bg-neutral-200/60 dark:bg-neutral-800 text-neutral-500 rounded border border-neutral-300 dark:border-neutral-700">
                        {item.shortcut}
                      </kbd>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="flex items-center justify-between px-4 py-2 bg-neutral-50 dark:bg-neutral-900/50 border-t border-neutral-100 dark:border-neutral-800 text-[11px] text-neutral-400 font-mono">
          <div className="flex items-center space-x-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
          </div>
          <span>NodePhone Studio v1.0</span>
        </div>
      </div>
    </div>
  );
}
