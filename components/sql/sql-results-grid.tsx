"use client";

import { SQLExecutionResult } from "@/lib/api/sql";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Button,
  Badge,
  EmptyState,
} from "@/components/ui";
import { Download, CheckCircle2, Clock, FileSpreadsheet } from "lucide-react";
import { exportTableToCSV } from "@/lib/api/database";
import { useToast } from "@/components/ui";

interface SQLResultsGridProps {
  result?: SQLExecutionResult;
}

export function SQLResultsGrid({ result }: SQLResultsGridProps) {
  const { addToast } = useToast();

  if (!result) {
    return (
      <EmptyState
        title="No Execution Results"
        description="Run a SQL query (⌘↵) to view returned dataset rows and execution time."
        className="py-12"
      />
    );
  }

  const handleExport = () => {
    if (!result || result.rows.length === 0) return;
    const csvContent = exportTableToCSV("query_result", result.rows);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `sql_query_result.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    addToast({
      type: "success",
      title: "Results Exported",
      description: `Exported ${result.rows.length} rows to CSV file.`,
    });
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-white dark:bg-neutral-950">
      {/* Execution Stats Bar */}
      <div className="flex items-center justify-between p-2.5 px-4 bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 text-xs shrink-0 select-none">
        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Success</span>
          </span>
          <span className="text-neutral-400">•</span>
          <span className="font-mono text-neutral-600 dark:text-neutral-300">
            {result.rowCount} rows returned
          </span>
          <span className="text-neutral-400">•</span>
          <span className="flex items-center space-x-1 text-neutral-400 font-mono text-[11px]">
            <Clock className="w-3 h-3 text-neutral-400" />
            <span>{result.executionTimeMs}ms execution time</span>
          </span>
        </div>

        <Button
          onClick={handleExport}
          variant="outline"
          size="sm"
          className="h-7 px-2.5 text-[11px] cursor-pointer"
          leftIcon={<Download className="w-3.5 h-3.5 text-emerald-500" />}
        >
          Export CSV
        </Button>
      </div>

      {/* Results Table */}
      <div className="flex-1 overflow-auto">
        <Table className="min-w-full border-none rounded-none">
          <TableHeader className="sticky top-0 z-10 shadow-2xs">
            <TableRow>
              <TableHead className="w-12 text-center">#</TableHead>
              {result.columns.map((col) => (
                <TableHead key={col} className="font-bold text-neutral-900 dark:text-neutral-100">
                  {col}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {result.rows.map((row, idx) => (
              <TableRow key={idx} className="font-mono text-xs hover:bg-neutral-50 dark:hover:bg-neutral-900">
                <TableCell className="text-center text-[10px] text-neutral-400 w-12">
                  {idx + 1}
                </TableCell>
                {result.columns.map((col) => {
                  const val = row[col];
                  return (
                    <TableCell key={col} className="truncate max-w-xs">
                      {val === null || val === undefined ? (
                        <span className="italic text-neutral-400 text-[11px]">NULL</span>
                      ) : typeof val === "boolean" ? (
                        <Badge variant={val ? "emerald" : "secondary"}>{String(val)}</Badge>
                      ) : typeof val === "object" ? (
                        <span className="text-rose-500 truncate block">{JSON.stringify(val)}</span>
                      ) : (
                        <span className="text-neutral-900 dark:text-neutral-100">{String(val)}</span>
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
