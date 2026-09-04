"use client";

import { useState, useRef, useEffect } from "react";
import { useWorkspaceStore } from "@/stores/workspace-store";
import { useSidebarStore } from "@/stores/sidebar-store";
import { Check, ChevronsUpDown, Plus, Layers, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

export function WorkspaceSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const { workspaces, activeWorkspace, setActiveWorkspace, addWorkspace } =
    useWorkspaceStore();
  const { isCollapsed } = useSidebarStore();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newWsName, setNewWsName] = useState("");

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setIsCreating(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCreateNew = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWsName.trim()) return;
    addWorkspace({
      name: newWsName,
      slug: newWsName.toLowerCase().replace(/\s+/g, "-"),
      plan: "Pro",
      region: "us-east-1",
      status: "active",
      projectCount: 1,
      avatarBg: "bg-emerald-500",
    });
    setNewWsName("");
    setIsCreating(false);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-full flex items-center justify-between p-2 rounded-lg text-left transition-all border border-transparent hover:border-neutral-200 dark:hover:border-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-900 group cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/30",
          isCollapsed && "justify-center px-1"
        )}
      >
        <div className="flex items-center space-x-3 min-w-0">
          <div
            className={cn(
              "w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs text-white shadow-sm shrink-0 transition-transform group-hover:scale-105",
              activeWorkspace.avatarBg || "bg-emerald-600"
            )}
          >
            {activeWorkspace.name.substring(0, 2).toUpperCase()}
          </div>

          {!isCollapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 truncate leading-tight">
                {activeWorkspace.name}
              </span>
              <div className="flex items-center space-x-1">
                <span className="text-[11px] text-neutral-500 dark:text-neutral-400 font-mono truncate">
                  {activeWorkspace.slug}
                </span>
                <span className="text-[10px] px-1 py-0.2 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-medium">
                  {activeWorkspace.plan}
                </span>
              </div>
            </div>
          )}
        </div>

        {!isCollapsed && (
          <ChevronsUpDown className="w-4 h-4 text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-300 shrink-0 ml-1" />
        )}
      </button>

      {isOpen && (
        <div
          className={cn(
            "absolute left-0 top-full mt-1.5 w-64 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-xl z-50 p-1.5 animate-in fade-in zoom-in-95 duration-100",
            isCollapsed && "left-12 top-0 mt-0"
          )}
        >
          <div className="px-2 py-1.5 text-[11px] font-semibold tracking-wider text-neutral-400 uppercase">
            Workspaces ({workspaces.length})
          </div>

          <div className="space-y-0.5 max-h-56 overflow-y-auto">
            {workspaces.map((ws) => {
              const isActive = ws.id === activeWorkspace.id;
              return (
                <button
                  key={ws.id}
                  onClick={() => {
                    setActiveWorkspace(ws.id);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center justify-between p-2 rounded-lg text-left text-xs transition-colors cursor-pointer",
                    isActive
                      ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-medium"
                      : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 hover:text-neutral-900 dark:hover:text-neutral-200"
                  )}
                >
                  <div className="flex items-center space-x-2.5 min-w-0">
                    <div
                      className={cn(
                        "w-6 h-6 rounded flex items-center justify-center font-bold text-[10px] text-white shrink-0",
                        ws.avatarBg || "bg-emerald-600"
                      )}
                    >
                      {ws.name.substring(0, 2).toUpperCase()}
                    </div>
                    <div className="truncate">
                      <div className="truncate font-medium">{ws.name}</div>
                      <div className="text-[10px] text-neutral-400 font-mono">
                        {ws.region}
                      </div>
                    </div>
                  </div>
                  {isActive && (
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 ml-1" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="border-t border-neutral-100 dark:border-neutral-800 mt-1 pt-1">
            {isCreating ? (
              <form onSubmit={handleCreateNew} className="p-2 space-y-2">
                <input
                  type="text"
                  placeholder="Workspace name..."
                  value={newWsName}
                  onChange={(e) => setNewWsName(e.target.value)}
                  autoFocus
                  className="w-full text-xs px-2.5 py-1.5 rounded-md border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
                <div className="flex items-center justify-end space-x-1.5">
                  <button
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="text-[11px] px-2 py-1 rounded text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="text-[11px] px-2.5 py-1 rounded bg-emerald-600 text-white font-medium hover:bg-emerald-500"
                  >
                    Create
                  </button>
                </div>
              </form>
            ) : (
              <button
                onClick={() => setIsCreating(true)}
                className="w-full flex items-center space-x-2 p-2 rounded-lg text-left text-xs text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4 text-emerald-500" />
                <span className="font-medium">Create New Workspace</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
