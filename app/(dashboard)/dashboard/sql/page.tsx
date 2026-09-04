"use client";

import { useSQLEditor } from "@/lib/hooks/use-sql-editor";
import { QueryHistorySidebar } from "@/components/sql/query-history-sidebar";
import { SQLTabBar } from "@/components/sql/sql-tab-bar";
import { SQLEditorCanvas } from "@/components/sql/sql-editor-canvas";
import { SQLResultsGrid } from "@/components/sql/sql-results-grid";
import { ExplainPlanView } from "@/components/sql/explain-plan-view";
import { SQLErrorBanner } from "@/components/sql/sql-error-banner";

export default function SQLWorkspacePage() {
  const {
    tabs,
    activeTabId,
    setActiveTabId,
    activeTab,
    addTab,
    closeTab,
    setQuery,
    executeCurrentQuery,
    explainCurrentQuery,
    formatCurrentQuery,
    saveCurrentQuery,
    history,
    savedQueries,
    loadQueryIntoActiveTab,
  } = useSQLEditor();

  return (
    <div className="flex flex-col md:flex-row h-[calc(100vh-3.5rem)] w-full overflow-hidden bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xl">
      {/* Panel 1: Left Query History & Saved Snippets Sidebar */}
      <QueryHistorySidebar
        history={history}
        savedQueries={savedQueries}
        onSelectQuery={(qText, name) => loadQueryIntoActiveTab(qText, name)}
      />

      {/* Panel 2: Center Editor & Results Workspace */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
        {/* Multi-Tab Bar */}
        <SQLTabBar
          tabs={tabs}
          activeTabId={activeTabId}
          onSelectTab={setActiveTabId}
          onAddTab={addTab}
          onCloseTab={closeTab}
        />

        {/* Top Half: Query Editor Canvas */}
        <div className="h-1/2 border-b border-neutral-200 dark:border-neutral-800">
          <SQLEditorCanvas
            query={activeTab.query}
            onChangeQuery={setQuery}
            onExecute={executeCurrentQuery}
            onExplain={explainCurrentQuery}
            onFormat={formatCurrentQuery}
            onSave={saveCurrentQuery}
            isExecuting={activeTab.isExecuting}
          />
        </div>

        {/* Bottom Half: Results Grid / EXPLAIN Plan / Error Banner */}
        <div className="h-1/2 flex flex-col min-h-0 overflow-hidden bg-white dark:bg-neutral-950">
          {activeTab.error && <SQLErrorBanner error={activeTab.error} />}

          {activeTab.explain ? (
            <ExplainPlanView plan={activeTab.explain} />
          ) : (
            <SQLResultsGrid result={activeTab.result} />
          )}
        </div>
      </div>
    </div>
  );
}
