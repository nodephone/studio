"use client";

import { useState } from "react";
import { TableMeta } from "@/lib/api/database";
import { Button, Input, Badge, Skeleton } from "@/components/ui";
import {
  Table,
  Plus,
  Search,
  Star,
  Lock,
  Database,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TablesSidebarProps {
  tables: TableMeta[];
  activeTable: string;
  onSelectTable: (tableName: string) => void;
  onCreateTableClick: () => void;
  isLoading?: boolean;
}

export function TablesSidebar({
  tables,
  activeTable,
  onSelectTable,
  onCreateTableClick,
  isLoading = false,
}: TablesSidebarProps) {
  const [search, setSearch] = useState("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);

  const filteredTables = tables.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.schema.toLowerCase().includes(search.toLowerCase());
    const matchesFav = favoritesOnly ? t.isFavorite : true;
    return matchesSearch && matchesFav;
  });

  return (
    <aside className="w-full md:w-64 border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900/50 flex flex-col h-full shrink-0 select-none">
      {/* Header */}
      <div className="p-3 border-b border-neutral-200 dark:border-neutral-800 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Database className="w-4 h-4 text-emerald-500" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
              Tables Schema
            </h3>
          </div>
          <Button
            onClick={onCreateTableClick}
            variant="primary"
            size="sm"
            className="h-7 px-2 text-[11px] bg-emerald-600 hover:bg-emerald-500 text-white font-semibold cursor-pointer border-emerald-500"
            leftIcon={<Plus className="w-3.5 h-3.5" />}
          >
            New Table
          </Button>
        </div>

        {/* Search */}
        <Input
          placeholder="Filter tables..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          leftIcon={<Search className="w-3.5 h-3.5 text-neutral-400" />}
          className="h-8 text-xs bg-neutral-50 dark:bg-neutral-900"
        />

        {/* Filter Tab pills */}
        <div className="flex items-center space-x-1 pt-0.5">
          <button
            onClick={() => setFavoritesOnly(false)}
            className={cn(
              "px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer",
              !favoritesOnly
                ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-semibold"
                : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
            )}
          >
            All ({tables.length})
          </button>
          <button
            onClick={() => setFavoritesOnly(true)}
            className={cn(
              "px-2 py-0.5 rounded text-[11px] font-medium transition-colors flex items-center space-x-1 cursor-pointer",
              favoritesOnly
                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold"
                : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
            )}
          >
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span>Starred</span>
          </button>
        </div>
      </div>

      {/* Tables List */}
      <div className="flex-1 overflow-y-auto p-1.5 space-y-0.5">
        {isLoading ? (
          <div className="space-y-1.5 p-2">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-8 w-full rounded-lg" />
            ))}
          </div>
        ) : filteredTables.length === 0 ? (
          <div className="p-4 text-center text-xs text-neutral-400">
            No tables match &quot;{search}&quot;
          </div>
        ) : (
          filteredTables.map((t) => {
            const isActive = t.name === activeTable;
            return (
              <button
                key={t.name}
                onClick={() => onSelectTable(t.name)}
                className={cn(
                  "w-full flex items-center justify-between p-2 rounded-xl text-left text-xs transition-colors cursor-pointer group",
                  isActive
                    ? "bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-950 font-semibold shadow-2xs"
                    : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800/60"
                )}
              >
                <div className="flex items-center space-x-2.5 min-w-0">
                  <Table
                    className={cn(
                      "w-3.5 h-3.5 shrink-0",
                      isActive
                        ? "text-emerald-400 dark:text-emerald-600"
                        : "text-neutral-400 group-hover:text-neutral-600 dark:group-hover:text-neutral-200"
                    )}
                  />
                  <div className="truncate min-w-0">
                    <span className="truncate block font-medium leading-none">
                      {t.name}
                    </span>
                    <span
                      className={cn(
                        "text-[10px] font-mono",
                        isActive ? "text-neutral-400 dark:text-neutral-600" : "text-neutral-400"
                      )}
                    >
                      {t.schema}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-1.5 shrink-0">
                  {t.isFavorite && (
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                  )}
                  <span
                    className={cn(
                      "text-[10px] font-mono px-1.5 py-0.2 rounded font-semibold",
                      isActive
                        ? "bg-neutral-800 text-neutral-300 dark:bg-neutral-200 dark:text-neutral-800"
                        : "bg-neutral-100 dark:bg-neutral-800 text-neutral-500"
                    )}
                  >
                    {t.rowCount}
                  </span>
                </div>
              </button>
            );
          })
        )}
      </div>

      {/* Footer info */}
      <div className="p-3 border-t border-neutral-200 dark:border-neutral-800 text-[11px] text-neutral-400 flex items-center justify-between font-mono">
        <span>PostgreSQL 16</span>
        <span>{tables.length} Tables</span>
      </div>
    </aside>
  );
}
