"use client";

import { useState } from "react";
import { Button, Modal, Input, useToast } from "@/components/ui";
import { Play, Sparkles, Wand2, BookmarkPlus, RotateCcw } from "lucide-react";

interface SQLEditorCanvasProps {
  query: string;
  onChangeQuery: (q: string) => void;
  onExecute: () => void;
  onExplain: () => void;
  onFormat: () => void;
  onSave: (name: string) => void;
  isExecuting?: boolean;
}

export function SQLEditorCanvas({
  query,
  onChangeQuery,
  onExecute,
  onExplain,
  onFormat,
  onSave,
  isExecuting = false,
}: SQLEditorCanvasProps) {
  const { addToast } = useToast();
  const [isSaveModalOpen, setIsSaveModalOpen] = useState(false);
  const [saveName, setSaveName] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
      e.preventDefault();
      onExecute();
    }
  };

  const lines = query.split("\n");

  const handleSaveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!saveName.trim()) return;
    onSave(saveName);
    addToast({
      type: "success",
      title: "Query Saved",
      description: `Snippet '${saveName}' saved to workspace.`,
    });
    setSaveName("");
    setIsSaveModalOpen(false);
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-neutral-950">
      {/* Editor Action Toolbar */}
      <div className="flex items-center justify-between p-2.5 border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shrink-0">
        <div className="flex items-center space-x-2">
          <Button
            onClick={onExecute}
            isLoading={isExecuting}
            variant="primary"
            size="sm"
            className="h-8 px-3 text-xs bg-emerald-600 hover:bg-emerald-500 text-white font-semibold cursor-pointer border-emerald-500"
            leftIcon={<Play className="w-3.5 h-3.5 fill-white" />}
          >
            Run Query (⌘↵)
          </Button>

          <Button
            onClick={onExplain}
            variant="outline"
            size="sm"
            className="h-8 text-xs cursor-pointer"
            leftIcon={<Sparkles className="w-3.5 h-3.5 text-indigo-500" />}
          >
            Explain Query
          </Button>

          <Button
            onClick={onFormat}
            variant="ghost"
            size="sm"
            className="h-8 text-xs text-neutral-600 dark:text-neutral-300 cursor-pointer"
            leftIcon={<Wand2 className="w-3.5 h-3.5 text-amber-500" />}
          >
            Format SQL
          </Button>
        </div>

        <Button
          onClick={() => setIsSaveModalOpen(true)}
          variant="outline"
          size="sm"
          className="h-8 text-xs cursor-pointer"
          leftIcon={<BookmarkPlus className="w-3.5 h-3.5 text-emerald-500" />}
        >
          Save Query
        </Button>
      </div>

      {/* Editor Area with Line Numbers */}
      <div className="flex-1 flex overflow-hidden relative font-mono text-xs">
        {/* Line Numbers */}
        <div className="w-10 py-3 bg-neutral-50 dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 text-neutral-400 text-right pr-2 select-none shrink-0 space-y-1">
          {lines.map((_, idx) => (
            <div key={idx} className="h-5 leading-5 text-[11px]">
              {idx + 1}
            </div>
          ))}
        </div>

        {/* Text Area Code Canvas */}
        <textarea
          value={query}
          onChange={(e) => onChangeQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          className="flex-1 p-3 bg-transparent text-neutral-900 dark:text-emerald-400 font-mono text-xs leading-5 resize-none focus:outline-none placeholder:text-neutral-400 select-text"
          placeholder="-- Write SQL query or Ctrl+Enter to execute..."
        />
      </div>

      {/* Save Modal */}
      <Modal
        isOpen={isSaveModalOpen}
        onClose={() => setIsSaveModalOpen(false)}
        title="Save Query Snippet"
        description="Store query snippet in workspace history."
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsSaveModalOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveSubmit}
              variant="primary"
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold cursor-pointer border-emerald-500"
            >
              Save Snippet
            </Button>
          </>
        }
      >
        <Input
          label="Query Title"
          placeholder="e.g. Fetch Active Owners"
          value={saveName}
          onChange={(e) => setSaveName(e.target.value)}
          autoFocus
        />
      </Modal>
    </div>
  );
}
