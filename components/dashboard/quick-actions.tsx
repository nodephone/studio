"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/layout";
import { Button, Modal, Input, Textarea, useToast, Badge } from "@/components/ui";
import {
  TableProperties,
  Code2,
  Upload,
  Cpu,
  Terminal,
  KeyRound,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

export function QuickActions() {
  const { addToast } = useToast();
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Form states for modals
  const [tableName, setTableName] = useState("");
  const [sqlQuery, setSqlQuery] = useState("SELECT * FROM users LIMIT 10;");
  const [functionName, setFunctionName] = useState("");

  const handleActionSubmit = (title: string, message: string) => {
    setActiveModal(null);
    addToast({
      type: "success",
      title: title,
      description: message,
    });
  };

  const actions = [
    {
      id: "create-table",
      title: "Create Table",
      description: "Define database schema table & columns",
      icon: TableProperties,
      color: "text-emerald-500",
      action: () => setActiveModal("create-table"),
    },
    {
      id: "sql-editor",
      title: "Open SQL Editor",
      description: "Execute raw SQL queries & script runner",
      icon: Code2,
      color: "text-indigo-500",
      action: () => setActiveModal("sql-editor"),
    },
    {
      id: "upload-file",
      title: "Upload File",
      description: "Upload objects to S3 storage bucket",
      icon: Upload,
      color: "text-amber-500",
      action: () => setActiveModal("upload-file"),
    },
    {
      id: "create-function",
      title: "Create Function",
      description: "Deploy serverless Edge TypeScript function",
      icon: Cpu,
      color: "text-purple-500",
      action: () => setActiveModal("create-function"),
    },
    {
      id: "view-logs",
      title: "View Server Logs",
      description: "Inspect live stdout / stderr kernel logs",
      icon: Terminal,
      color: "text-blue-500",
      action: () => setActiveModal("view-logs"),
    },
    {
      id: "api-key",
      title: "Generate API Key",
      description: "Issue JWT service secret or anon key",
      icon: KeyRound,
      color: "text-rose-500",
      action: () => setActiveModal("api-key"),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
          Quick Actions
        </h3>
        <Badge variant="outline" className="font-mono text-[10px]">
          6 Shortcuts
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.id}
              onClick={act.action}
              className="flex items-center justify-between p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all text-left group cursor-pointer shadow-2xs"
            >
              <div className="flex items-center space-x-3 min-w-0">
                <div className="p-2 rounded-lg bg-neutral-100 dark:bg-neutral-800 shrink-0 group-hover:scale-105 transition-transform">
                  <Icon className={`w-4 h-4 ${act.color}`} />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 truncate">
                    {act.title}
                  </h4>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">
                    {act.description}
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-emerald-500 transition-colors shrink-0 ml-2" />
            </button>
          );
        })}
      </div>

      {/* Modals for Quick Actions */}
      <Modal
        isOpen={activeModal === "create-table"}
        onClose={() => setActiveModal(null)}
        title="Create Database Table"
        description="Define a new PostgreSQL table schema for your active workspace."
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setActiveModal(null)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleActionSubmit("Table Created", `Table '${tableName || "new_table"}' initialized.`)}
            >
              Create Table
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input
            label="Table Name"
            placeholder="e.g. customers, orders"
            value={tableName}
            onChange={(e) => setTableName(e.target.value)}
          />
          <p className="text-xs text-neutral-500">
            Default columns `id` (uuid) and `created_at` (timestamp) will be added automatically.
          </p>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === "sql-editor"}
        onClose={() => setActiveModal(null)}
        title="SQL Runner"
        description="Execute PostgreSQL query against NodePhone Kernel database."
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setActiveModal(null)}>
              Close
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleActionSubmit("Query Executed", "Returned 10 rows in 3ms.")}
            >
              Run Query
            </Button>
          </>
        }
      >
        <Textarea
          label="SQL Query"
          value={sqlQuery}
          onChange={(e) => setSqlQuery(e.target.value)}
          className="font-mono text-xs"
        />
      </Modal>

      <Modal
        isOpen={activeModal === "upload-file"}
        onClose={() => setActiveModal(null)}
        title="Upload Storage Object"
        description="Upload files to your S3 compatible storage bucket."
        footer={
          <Button variant="outline" size="sm" onClick={() => setActiveModal(null)}>
            Close
          </Button>
        }
      >
        <div className="border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-xl p-8 text-center space-y-2">
          <Upload className="w-8 h-8 text-emerald-500 mx-auto" />
          <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
            Drag & drop files here or click to browse
          </p>
          <p className="text-[11px] text-neutral-500">Supports PNG, JPG, PDF, JSON up to 50 MB</p>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === "create-function"}
        onClose={() => setActiveModal(null)}
        title="Deploy Serverless Edge Function"
        description="Write TypeScript code for NodePhone serverless runner."
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setActiveModal(null)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleActionSubmit("Function Deployed", `Function '${functionName || "my-func"}' active.`)}
            >
              Deploy
            </Button>
          </>
        }
      >
        <Input
          label="Function Slug"
          placeholder="e.g. process-payment"
          value={functionName}
          onChange={(e) => setFunctionName(e.target.value)}
        />
      </Modal>

      <Modal
        isOpen={activeModal === "view-logs"}
        onClose={() => setActiveModal(null)}
        title="Live Server Logs"
        description="Realtime streaming logs from NodePhone Kernel engine."
        footer={
          <Button variant="outline" size="sm" onClick={() => setActiveModal(null)}>
            Close
          </Button>
        }
      >
        <div className="bg-neutral-950 p-4 rounded-xl font-mono text-[11px] text-emerald-400 space-y-1.5 max-h-60 overflow-y-auto">
          <div>[INFO] 23:18:22 NodePhone Kernel v1.0.4 listening on port 8443</div>
          <div>[INFO] 23:18:24 Connection pool initialized (max_connections=50)</div>
          <div>[INFO] 23:18:26 WebSocket server handshake OK</div>
          <div>[DEBUG] 23:18:29 Auth JWT token verified for userusr_nodephone_01</div>
        </div>
      </Modal>

      <Modal
        isOpen={activeModal === "api-key"}
        onClose={() => setActiveModal(null)}
        title="Generate API Secret Key"
        description="Issue a new JWT secret for client SDK applications."
        footer={
          <Button
            variant="primary"
            size="sm"
            onClick={() => handleActionSubmit("Key Generated", "New API secret generated and copied to clipboard.")}
          >
            Copy & Close
          </Button>
        }
      >
        <div className="space-y-2">
          <label className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
            Anon Secret Key
          </label>
          <div className="p-2.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 font-mono text-xs text-neutral-900 dark:text-neutral-100 break-all border border-neutral-200 dark:border-neutral-700">
            eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJub2RlcGhvbmUiLCJyb2xlIjoiYW5vbiJ9.np_secret_99824
          </div>
        </div>
      </Modal>
    </div>
  );
}
