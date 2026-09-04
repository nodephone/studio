"use client";

import { ExplainPlanData } from "@/lib/api/sql";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/layout";
import { Badge } from "@/components/ui";
import { Cpu, Zap, Activity, Layers, ArrowUpRight, TrendingUp } from "lucide-react";

interface ExplainPlanViewProps {
  plan: ExplainPlanData;
}

export function ExplainPlanView({ plan }: ExplainPlanViewProps) {
  return (
    <div className="p-4 space-y-4 bg-white dark:bg-neutral-950 flex-1 overflow-y-auto">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-bold text-neutral-900 dark:text-neutral-100 flex items-center space-x-2">
            <Cpu className="w-4 h-4 text-emerald-500" />
            <span>EXPLAIN Query Execution Analysis</span>
          </h4>
          <p className="text-xs text-neutral-500">
            PostgreSQL query execution planner breakdown and index scan efficiency.
          </p>
        </div>

        <Badge variant={plan.scanType === "Index Scan" ? "emerald" : "amber"} dot>
          {plan.scanType}
        </Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="border-neutral-200 dark:border-neutral-800">
          <CardHeader className="p-3 pb-1">
            <CardTitle className="text-[10px] uppercase text-neutral-500">Scan Strategy</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <p className="text-base font-extrabold text-neutral-900 dark:text-neutral-100">
              {plan.nodeType}
            </p>
            <p className="text-[11px] text-neutral-400 mt-0.5">Target: {plan.relationName}</p>
          </CardContent>
        </Card>

        <Card className="border-neutral-200 dark:border-neutral-800">
          <CardHeader className="p-3 pb-1">
            <CardTitle className="text-[10px] uppercase text-neutral-500">Estimated Cost</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <p className="text-base font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
              {plan.startupCost} .. {plan.totalCost}
            </p>
            <p className="text-[11px] text-neutral-400 mt-0.5">Cost Units</p>
          </CardContent>
        </Card>

        <Card className="border-neutral-200 dark:border-neutral-800">
          <CardHeader className="p-3 pb-1">
            <CardTitle className="text-[10px] uppercase text-neutral-500">Row Estimation</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <p className="text-base font-extrabold text-neutral-900 dark:text-neutral-100 font-mono">
              {plan.planRows} rows
            </p>
            <p className="text-[11px] text-neutral-400 mt-0.5">Width: {plan.planWidth} bytes</p>
          </CardContent>
        </Card>

        <Card className="border-neutral-200 dark:border-neutral-800">
          <CardHeader className="p-3 pb-1">
            <CardTitle className="text-[10px] uppercase text-neutral-500">Execution Latency</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <p className="text-base font-extrabold text-indigo-500 font-mono">
              {plan.executionTimeMs} ms
            </p>
            <p className="text-[11px] text-neutral-400 mt-0.5">Planning & Execution</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
