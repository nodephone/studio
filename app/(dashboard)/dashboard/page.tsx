"use client";

import { useAuthStore } from "@/stores/auth-store";
import { useWorkspaceStore } from "@/stores/workspace-store";
import { useCommandPaletteStore } from "@/stores/command-palette-store";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Database,
  Lock,
  HardDrive,
  Activity,
  Search,
  Server,
  Zap,
  CheckCircle2,
  Clock,
  ExternalLink,
  Plus,
  ShieldAlert,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { activeWorkspace } = useWorkspaceStore();
  const { open: openCommandPalette } = useCommandPaletteStore();

  const modules = [
    {
      title: "Database Inspector",
      description: "Realtime database tables, schema browser, SQL runner & row editor.",
      icon: Database,
      prd: "PRD 002",
      status: "Planned",
      color: "emerald",
    },
    {
      title: "Auth & Users",
      description: "Manage users, RLS policies, OAuth providers, and JWT secrets.",
      icon: Lock,
      prd: "PRD 003",
      status: "Planned",
      color: "indigo",
    },
    {
      title: "Storage Buckets",
      description: "Object storage explorer, bucket policies, and file uploader.",
      icon: HardDrive,
      prd: "PRD 004",
      status: "Planned",
      color: "amber",
    },
    {
      title: "Realtime Engine",
      description: "WebSocket channels, live event streams, and broadcast monitors.",
      icon: Activity,
      prd: "PRD 005",
      status: "Planned",
      color: "purple",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-950 text-white border border-neutral-800 shadow-xl relative overflow-hidden">
        {/* Glow decoration */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 relative z-10">
          <div className="flex items-center space-x-2">
            <Badge variant="emerald" className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
              Active Workspace • {activeWorkspace.name}
            </Badge>
            <span className="text-xs text-neutral-400 font-mono">
              [{activeWorkspace.region}]
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white">
            Welcome back, {user?.name || "Developer"} 👋
          </h1>
          <p className="text-sm text-neutral-400 max-w-xl">
            NodePhone Studio shell is ready. The application routing, auth gate, workspace switcher, and keyboard shortcuts are operational.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0 relative z-10">
          <Button
            onClick={openCommandPalette}
            variant="secondary"
            className="bg-neutral-800 hover:bg-neutral-700 text-neutral-100 border-neutral-700 cursor-pointer"
          >
            <Search className="w-4 h-4 mr-2 text-emerald-400" />
            <span>Command Palette (⌘K)</span>
          </Button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-neutral-200 dark:border-neutral-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
            <CardTitle className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Kernel Status
            </CardTitle>
            <Server className="w-4 h-4 text-emerald-500" />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span>Online</span>
            </div>
            <p className="text-xs text-neutral-500 mt-1">v1.0.0-alpha • 0ms latency</p>
          </CardContent>
        </Card>

        <Card className="border-neutral-200 dark:border-neutral-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
            <CardTitle className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Active Workspace
            </CardTitle>
            <Zap className="w-4 h-4 text-emerald-500" />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-xl font-bold text-neutral-900 dark:text-neutral-100 truncate">
              {activeWorkspace.name}
            </div>
            <p className="text-xs text-neutral-500 mt-1 font-mono">{activeWorkspace.plan} Plan</p>
          </CardContent>
        </Card>

        <Card className="border-neutral-200 dark:border-neutral-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
            <CardTitle className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Auth Guard
            </CardTitle>
            <Lock className="w-4 h-4 text-emerald-500" />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-xl font-bold text-neutral-900 dark:text-neutral-100 flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>JWT Verified</span>
            </div>
            <p className="text-xs text-neutral-500 mt-1">{user?.email}</p>
          </CardContent>
        </Card>

        <Card className="border-neutral-200 dark:border-neutral-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
            <CardTitle className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Registered Projects
            </CardTitle>
            <Activity className="w-4 h-4 text-emerald-500" />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
              {activeWorkspace.projectCount} Services
            </div>
            <p className="text-xs text-neutral-500 mt-1">Ready for PRD 002-005</p>
          </CardContent>
        </Card>
      </div>

      {/* Modules Roadmap Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
              Studio Feature Modules
            </h2>
            <p className="text-xs text-neutral-500">
              Future modules will connect seamlessly into this application shell layout.
            </p>
          </div>
          <Badge variant="outline" className="font-mono text-xs">
            PRD 001 Complete
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modules.map((mod) => {
            const Icon = mod.icon;
            return (
              <Card
                key={mod.title}
                className="border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all group"
              >
                <CardHeader className="flex flex-row items-start justify-between space-y-0 p-5">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-emerald-500 group-hover:scale-105 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <CardTitle className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                        {mod.title}
                      </CardTitle>
                      <span className="text-xs font-mono text-neutral-400">
                        {mod.prd}
                      </span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="font-mono text-[10px]">
                    <Clock className="w-3 h-3 mr-1 text-neutral-400" />
                    {mod.status}
                  </Badge>
                </CardHeader>

                <CardContent className="px-5 pb-5">
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {mod.description}
                  </p>
                </CardContent>

                <CardFooter className="px-5 py-3 bg-neutral-50 dark:bg-neutral-900/50 border-t border-neutral-100 dark:border-neutral-800/80 flex items-center justify-between text-xs text-neutral-400">
                  <span>Module Shell Registered</span>
                  <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>

      {/* System Shortcuts & Architecture Info */}
      <Card className="border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800 pb-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-emerald-500" />
            <h3 className="font-semibold text-sm text-neutral-900 dark:text-neutral-100">
              Keyboard Shortcuts & Shell Controls
            </h3>
          </div>
          <span className="text-xs text-neutral-400 font-mono">
            8px Grid System
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/60 dark:border-neutral-800 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-medium text-neutral-700 dark:text-neutral-300">Command Palette</span>
              <kbd className="px-1.5 py-0.5 font-mono text-[10px] bg-white dark:bg-neutral-700 rounded border border-neutral-300 dark:border-neutral-600">
                ⌘K / Ctrl+K
              </kbd>
            </div>
            <p className="text-neutral-500 text-[11px]">
              Open global search, jump to modules, or execute shortcuts.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/60 dark:border-neutral-800 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-medium text-neutral-700 dark:text-neutral-300">Toggle Sidebar</span>
              <kbd className="px-1.5 py-0.5 font-mono text-[10px] bg-white dark:bg-neutral-700 rounded border border-neutral-300 dark:border-neutral-600">
                ⌘B / Ctrl+B
              </kbd>
            </div>
            <p className="text-neutral-500 text-[11px]">
              Collapse or expand the navigation sidebar instantly.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200/60 dark:border-neutral-800 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-medium text-neutral-700 dark:text-neutral-300">Workspace Switcher</span>
              <kbd className="px-1.5 py-0.5 font-mono text-[10px] bg-white dark:bg-neutral-700 rounded border border-neutral-300 dark:border-neutral-600">
                Dropdown
              </kbd>
            </div>
            <p className="text-neutral-500 text-[11px]">
              Switch active environments or create new project spaces.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
