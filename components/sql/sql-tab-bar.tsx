"use client";

import { SQLTab } from "@/lib/hooks/use-sql-editor";
import { Plus, X, Terminal, Code2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SQLTabBarProps {
  tabs: SQLTab[];
  activeTabId: string;
  onSelectTab: (id: string) => void;
  onAddTab: () => void;
  onCloseTab: (id: string) => void;
}

export function SQLTabBar({
  tabs,
  activeTabId,
  onSelectTab,
  onAddTab,
  onCloseTab,
}: SQLTabBarProps) {
  return (
    <div className="flex items-center space-x-1 px-3 pt-2 border-b border-neutral-200 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-900 overflow-x-auto select-none">
      {tabs.map((tab) => {
        const isActive = tab.id === activeTabId;
        return (
          <div
            key={tab.id}
            onClick={() => onSelectTab(tab.id)}
            className={cn(
              "flex items-center space-x-2 px-3 py-1.5 rounded-t-xl text-xs font-semibold transition-all border-t border-x cursor-pointer group shrink-0",
              isActive
                ? "bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-neutral-100 shadow-2xs"
                : "bg-transparent border-transparent text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50"
            )}
          >
            <Code2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span className="truncate max-w-xs">{tab.name}</span>

            {tabs.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCloseTab(tab.id);
                }}
                className="p-0.5 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        );
      })}

      <button
        onClick={onAddTab}
        className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors cursor-pointer shrink-0 ml-1"
        title="New Query Tab"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}
