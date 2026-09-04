"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";
import { Avatar } from "@/components/ui";
import {
  LogOut,
  User,
  Settings,
  Shield,
  ExternalLink,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export function UserProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSignOut = () => {
    logout();
    setIsOpen(false);
    router.push("/auth/login");
  };

  if (!user) return null;

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2.5 p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500/30 cursor-pointer"
      >
        <Avatar
          src={user.avatarUrl}
          fallback={user.name || user.email}
          size="sm"
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-64 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl z-50 p-1.5 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3 py-2.5 border-b border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center space-x-3">
              <Avatar
                src={user.avatarUrl}
                fallback={user.name || user.email}
                size="md"
              />
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                  {user.name}
                </span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                  {user.email}
                </span>
                <div className="flex items-center space-x-1 mt-1">
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                    {user.role}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="py-1 space-y-0.5">
            <button
              onClick={() => {
                setIsOpen(false);
                router.push("/dashboard");
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-2.5">
                <User className="w-4 h-4 text-neutral-400" />
                <span className="font-medium">Account Overview</span>
              </div>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-2.5">
                <Shield className="w-4 h-4 text-neutral-400" />
                <span className="font-medium">Security & Keys</span>
              </div>
            </button>

            <a
              href="https://github.com/nodephone/studio"
              target="_blank"
              rel="noreferrer"
              onClick={() => setIsOpen(false)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-2.5">
                <ExternalLink className="w-4 h-4 text-neutral-400" />
                <span className="font-medium">GitHub Repository</span>
              </div>
            </a>
          </div>

          <div className="border-t border-neutral-100 dark:border-neutral-800 pt-1">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors font-medium cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
