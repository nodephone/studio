"use client";

import { useAuthStore } from "@/stores/auth-store";
import { useWorkspaceStore } from "@/stores/workspace-store";
import { useCommandPaletteStore } from "@/stores/command-palette-store";
import { Button, Badge } from "@/components/ui";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/layout";
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
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useAuthStore();
  const { activeWorkspace } = useWorkspaceStore();
  const { open: openCommandPalette } = useCommandPaletteStore();

  const modules = [
    {
      title: "Database Inspector",
      description: "Realtime database tables, schema browser, SQL runner & row editor.",
      icon: Database,
      prd: "PRD 003",
      status: "Planned",
      color: "emerald",
    },
    {
      title: "Auth & Users",
      description: "Manage users, RLS policies, OAuth providers, and JWT secrets.",
      icon: Lock,
      prd: "PRD 004",
      status: "Planned",
      color: "indigo",
    },
    {
      title: "Storage Buckets",
      description: "Object storage explorer, bucket policies, and file uploader.",
      icon: HardDrive,
      prd: "PRD 005",
      status: "Planned",
      color: "amber",
    },
    {
      title: "Realtime Engine",
      description: "WebSocket channels, live event streams, and broadcast monitors.",
      icon: Activity,
      prd: "PRD 006",
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
            NodePhone Studio Design System (PRD 002) is active with 19 UI primitives, design tokens, and motion presets.
          </p>
        </div>

        <div className="flex items-center space-x-3 shrink-0 relative z-10">
          <Link href="/dashboard/design-system">
            <Button variant="primary" size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold cursor-pointer border-emerald-500">
              <Sparkles className="w-4 h-4 mr-2" />
              <span>Design System Showcase</span>
            </Button>
          </Link>
          <Button
            onClick={openCommandPalette}
            variant="secondary"
            size="sm"
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
              Design System
            </CardTitle>
            <Sparkles className="w-4 h-4 text-emerald-500" />
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="text-xl font-bold text-neutral-900 dark:text-neutral-100">
              19 Primitives
            </div>
            <p className="text-xs text-neutral-500 mt-1">PRD 002 Complete</p>
          </CardContent>
        </Card>
      </div>

      {/* Feature Modules Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100">
              Studio Feature Roadmap
            </h2>
            <p className="text-xs text-neutral-500">
              All future modules will consume the reusable design system primitives.
            </p>
          </div>
          <Badge variant="outline" className="font-mono text-xs">
            PRD 002 Complete
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
                  <span>Design Primitives Enabled</span>
                  <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-emerald-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </CardFooter>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
