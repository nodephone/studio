import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Workspace } from "@/types/workspace";

const DEFAULT_WORKSPACES: Workspace[] = [
  {
    id: "ws_acme_main",
    name: "Acme Production",
    slug: "acme-prod",
    plan: "Pro",
    region: "us-east-1 (N. Virginia)",
    status: "active",
    projectCount: 4,
    avatarBg: "bg-emerald-500",
  },
  {
    id: "ws_nodephone_internal",
    name: "NodePhone Core Labs",
    slug: "nodephone-labs",
    plan: "Enterprise",
    region: "eu-west-1 (Ireland)",
    status: "active",
    projectCount: 12,
    avatarBg: "bg-indigo-500",
  },
  {
    id: "ws_personal_staging",
    name: "Staging Sandbox",
    slug: "staging-sandbox",
    plan: "Free",
    region: "ap-southeast-1 (Singapore)",
    status: "active",
    projectCount: 1,
    avatarBg: "bg-amber-500",
  },
];

interface WorkspaceState {
  workspaces: Workspace[];
  activeWorkspace: Workspace;
  setActiveWorkspace: (workspaceId: string) => void;
  addWorkspace: (newWorkspace: Omit<Workspace, "id">) => void;
}

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set) => ({
      workspaces: DEFAULT_WORKSPACES,
      activeWorkspace: DEFAULT_WORKSPACES[0],

      setActiveWorkspace: (workspaceId: string) => {
        set((state) => {
          const found = state.workspaces.find((w) => w.id === workspaceId);
          if (found) {
            return { activeWorkspace: found };
          }
          return state;
        });
      },

      addWorkspace: (newWsData) => {
        const newWs: Workspace = {
          ...newWsData,
          id: `ws_${Date.now()}`,
        };
        set((state) => ({
          workspaces: [...state.workspaces, newWs],
          activeWorkspace: newWs,
        }));
      },
    }),
    {
      name: "nodephone-studio-workspace",
      storage: createJSONStorage(() => (typeof window !== "undefined" ? localStorage : {
        getItem: () => null,
        setItem: () => {},
        removeItem: () => {},
      })),
      partialize: (state) => ({
        workspaces: state.workspaces,
        activeWorkspace: state.activeWorkspace,
      }),
    }
  )
);
