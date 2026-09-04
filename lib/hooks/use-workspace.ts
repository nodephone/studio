"use client";

import { useWorkspaceStore } from "@/stores/workspace-store";

export function useWorkspace() {
  const { workspaces, activeWorkspace, setActiveWorkspace, addWorkspace } =
    useWorkspaceStore();

  return {
    workspaces,
    activeWorkspace,
    setActiveWorkspace,
    addWorkspace,
  };
}
