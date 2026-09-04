"use client";

import { useState } from "react";
import { SavedQuery } from "@/lib/api/sql";
import { Input, Badge, Button } from "@/components/ui";
import {
  History,
  Bookmark,
  Star,
  Search,
  ChevronRight,
  Code2,
  Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface QueryHistorySidebarProps {
  history: string[];
  savedQueries: SavedQuery[];
  onSelectQuery: (queryText: string, name?: string) => void;
}

export function QueryHistorySidebar({
  history,
  savedQueries,
  onSelectQuery,
}: QueryHistorySidebarProps) {
  const [activeTab, setActiveTab] = useState<"saved" | "history">("saved");
  const [search, setSearch] = useState("");

  const filteredSaved = savedQueries.filter(
    (sq) =>
      sq.name.toLowerCase().includes(search.toLowerCase()) ||
      sq.query.toLowerCase().includes(search.toLowerCase())
  );

  const filteredHistory = history.filter((q) =>
    q.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <aside className="w-full md:w-64 border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 flex flex-col h-full shrink-0 select-none">
      {/* Sidebar Header & Tabs */}
      <div className="p-3 border-b border-neutral-200 dark:border-neutral-800 space-y-2.5">
        <div className="flex items-center space-x-2">
          <History className="w-4 h-4 text-emerald-500" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
            SQL Snippets
          </h3>
        </div>

        {/* Tab selector */}
        <div className="flex items-center space-x-1 p-0.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-xs">
          <button
            onClick={() => setActiveTab("saved")}
            className={cn(
              "flex-1 py-1 text-[11px] font-semibold rounded-md transition-colors cursor-pointer text-center",
              activeTab === "saved"
                ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-2xs"
                : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
            )}
          >
            Saved ({savedQueries.length})
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={cn(
              "flex-1 py-1 text-[11px] font-semibold rounded-md transition-colors cursor-pointer text-center",
              activeTab === "history"
                ? "bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 shadow-2xs"
                : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
            )}
          >
            History ({history.length})
          </button>
        </div>

        <Input
          placeholder="Filter queries..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          leftIcon={<Search className="w-3.5 h-3.5 text-neutral-400" />}
          className="h-8 text-xs bg-neutral-50 dark:bg-neutral-900"
        />
      </div>

      {/* Query Items List */}
      <div className="flex-1 overflow-y-auto p-1.5 space-y-1">
        {activeTab === "saved" ? (
          filteredSaved.length === 0 ? (
            <div className="p-4 text-center text-xs text-neutral-400">
              No saved query snippets.
            </div>
          ) : (
            filteredSaved.map((sq) => (
              <button
                key={sq.id}
                onClick={() => onSelectQuery(sq.query, sq.name)}
                className="w-full p-2.5 rounded-xl text-left transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800/60 group cursor-pointer space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-neutral-900 dark:text-neutral-100 truncate">
                    {sq.name}
                  </span>
                  {sq.isFavorite && <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />}
                </div>
                <p className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 truncate">
                  {sq.query}
                </p>
              </button>
            ))
          )
        ) : filteredHistory.length === 0 ? (
          <div className="p-4 text-center text-xs text-neutral-400">
            No query history logged yet.
          </div>
        ) : (
          filteredHistory.map((q, idx) => (
            <button
              key={idx}
              onClick={() => onSelectQuery(q)}
              className="w-full p-2 rounded-xl text-left transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800/60 group cursor-pointer space-y-0.5"
            >
              <p className="text-xs font-mono text-neutral-800 dark:text-neutral-200 truncate">
                {q}
              </p>
              <div className="flex items-center space-x-1 text-[10px] text-neutral-400 font-mono">
                <Clock className="w-3 h-3 text-neutral-400" />
                <span>Executed recently</span>
              </div>
            </button>
          ))
        )}
      </div>
    </aside>
  );
}
