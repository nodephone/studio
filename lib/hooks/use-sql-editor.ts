"use client";

import { useState, useCallback } from "react";
import {
  executeSQLQuery,
  explainSQLQuery,
  formatSQL,
  SQLExecutionResult,
  ExplainPlanData,
  SavedQuery,
} from "@/lib/api/sql";

export interface SQLTab {
  id: string;
  name: string;
  query: string;
  result?: SQLExecutionResult;
  explain?: ExplainPlanData;
  error?: string;
  isExecuting?: boolean;
}

const DEFAULT_TABS: SQLTab[] = [
  {
    id: "tab_1",
    name: "Query 1 (Users)",
    query: "SELECT id, email, role, is_active, created_at\nFROM users\nWHERE is_active = true\nORDER BY created_at DESC\nLIMIT 10;",
  },
  {
    id: "tab_2",
    name: "Query 2 (Logs)",
    query: "SELECT function_name, status_code, duration_ms, created_at\nFROM serverless_logs\nORDER BY duration_ms DESC\nLIMIT 20;",
  },
];

const DEFAULT_SAVED_QUERIES: SavedQuery[] = [
  {
    id: "sq_1",
    name: "Get All Active Owners",
    query: "SELECT * FROM users WHERE role = 'owner';",
    isFavorite: true,
    createdAt: "1 day ago",
  },
  {
    id: "sq_2",
    name: "Inspect Slow Serverless Logs",
    query: "SELECT * FROM serverless_logs WHERE duration_ms > 100;",
    isFavorite: false,
    createdAt: "2 days ago",
  },
];

export function useSQLEditor() {
  const [tabs, setTabs] = useState<SQLTab[]>(DEFAULT_TABS);
  const [activeTabId, setActiveTabId] = useState<string>(DEFAULT_TABS[0].id);
  const [history, setHistory] = useState<string[]>([]);
  const [savedQueries, setSavedQueries] = useState<SavedQuery[]>(DEFAULT_SAVED_QUERIES);

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  const updateActiveTab = useCallback((updater: Partial<SQLTab>) => {
    setTabs((prev) =>
      prev.map((t) => (t.id === activeTabId ? { ...t, ...updater } : t))
    );
  }, [activeTabId]);

  const addTab = () => {
    const newId = `tab_${Date.now()}`;
    const newTab: SQLTab = {
      id: newId,
      name: `New Query ${tabs.length + 1}`,
      query: "SELECT * FROM users LIMIT 10;",
    };
    setTabs((prev) => [...prev, newTab]);
    setActiveTabId(newId);
  };

  const closeTab = (tabId: string) => {
    if (tabs.length <= 1) return;
    const nextTabs = tabs.filter((t) => t.id !== tabId);
    setTabs(nextTabs);
    if (activeTabId === tabId) {
      setActiveTabId(nextTabs[nextTabs.length - 1].id);
    }
  };

  const handleExecute = async () => {
    if (!activeTab.query.trim()) return;

    updateActiveTab({ isExecuting: true, error: undefined });
    setHistory((prev) => [activeTab.query, ...prev.filter((q) => q !== activeTab.query)]);

    try {
      const res = await executeSQLQuery(activeTab.query);
      updateActiveTab({ result: res, isExecuting: false, explain: undefined });
    } catch (err) {
      updateActiveTab({
        error: err instanceof Error ? err.message : "Execution failed.",
        isExecuting: false,
      });
    }
  };

  const handleExplain = async () => {
    if (!activeTab.query.trim()) return;
    updateActiveTab({ isExecuting: true, error: undefined });

    try {
      const plan = await explainSQLQuery(activeTab.query);
      updateActiveTab({ explain: plan, isExecuting: false });
    } catch (err) {
      updateActiveTab({
        error: err instanceof Error ? err.message : "Explain failed.",
        isExecuting: false,
      });
    }
  };

  const handleFormat = () => {
    const formatted = formatSQL(activeTab.query);
    updateActiveTab({ query: formatted });
  };

  const handleSaveQuery = (name: string) => {
    const newSq: SavedQuery = {
      id: `sq_${Date.now()}`,
      name,
      query: activeTab.query,
      isFavorite: false,
      createdAt: "Just now",
    };
    setSavedQueries((prev) => [newSq, ...prev]);
  };

  const loadQueryIntoActiveTab = (queryText: string, name?: string) => {
    updateActiveTab({
      query: queryText,
      name: name || activeTab.name,
      result: undefined,
      explain: undefined,
      error: undefined,
    });
  };

  return {
    tabs,
    activeTabId,
    setActiveTabId,
    activeTab,
    addTab,
    closeTab,
    setQuery: (qText: string) => updateActiveTab({ query: qText }),
    setTabName: (name: string) => updateActiveTab({ name }),
    executeCurrentQuery: handleExecute,
    explainCurrentQuery: handleExplain,
    formatCurrentQuery: handleFormat,
    saveCurrentQuery: handleSaveQuery,
    history,
    savedQueries,
    loadQueryIntoActiveTab,
  };
}
