"use client";

import { Sidebar } from "./sidebar";
import { TopNav } from "./top-nav";
import { MobileNav } from "@/components/navigation/mobile-nav";
import { CommandPalette } from "@/components/navigation/command-palette";
import { AuthGuard } from "@/lib/auth/guard";

interface DashboardShellProps {
  children: React.ReactNode;
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <AuthGuard>
      <div className="min-h-screen flex bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 font-sans antialiased selection:bg-emerald-500 selection:text-white">
        {/* Desktop Sidebar */}
        <Sidebar />

        {/* Mobile Navigation Drawer */}
        <MobileNav />

        {/* Command Palette Overlay */}
        <CommandPalette />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 min-h-screen">
          {/* Header Bar */}
          <TopNav />

          {/* Page Content Container */}
          <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto animate-in fade-in duration-200">
            {children}
          </main>
        </div>
      </div>
    </AuthGuard>
  );
}
