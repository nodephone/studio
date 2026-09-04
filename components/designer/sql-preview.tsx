"use client";

import { useState } from "react";
import { Button, useToast } from "@/components/ui";
import { Code2, Copy, Check } from "lucide-react";

interface SQLPreviewProps {
  sql: string;
}

export function SQLPreview({ sql }: SQLPreviewProps) {
  const { addToast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(sql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    addToast({
      type: "info",
      title: "SQL Copied",
      description: "Migration SQL script copied to clipboard.",
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 flex items-center space-x-2">
            <Code2 className="w-4 h-4 text-emerald-500" />
            <span>Live SQL DDL Migration Preview</span>
          </h4>
          <p className="text-xs text-neutral-500">
            Automatically generated SQL migration DDL script ready for NodePhone Engine execution.
          </p>
        </div>

        <Button
          onClick={handleCopy}
          variant="outline"
          size="sm"
          className="h-8 text-xs cursor-pointer"
          leftIcon={copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
        >
          {copied ? "Copied SQL" : "Copy SQL"}
        </Button>
      </div>

      <pre className="p-4 rounded-xl bg-neutral-950 text-emerald-400 text-xs font-mono border border-neutral-800 leading-relaxed overflow-x-auto shadow-inner">
        {sql}
      </pre>
    </div>
  );
}
