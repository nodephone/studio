export interface SQLExecutionResult {
  columns: string[];
  rows: Record<string, unknown>[];
  rowCount: number;
  executionTimeMs: number;
  query: string;
  timestamp: string;
}

export interface ExplainPlanData {
  nodeType: string;
  relationName: string;
  startupCost: number;
  totalCost: number;
  planRows: number;
  planWidth: number;
  indexName?: string;
  scanType: "Index Scan" | "Sequential Scan" | "Index Only Scan" | "Bitmap Heap Scan";
  executionTimeMs: number;
}

export interface SavedQuery {
  id: string;
  name: string;
  query: string;
  isFavorite?: boolean;
  createdAt: string;
}

export async function executeSQLQuery(sql: string): Promise<SQLExecutionResult> {
  const startTime = performance.now();
  await new Promise((res) => setTimeout(res, 220));

  const trimmed = sql.trim().toLowerCase();

  // Handle syntax error simulation
  if (trimmed.includes("error") || trimmed.includes("select * from nonexistent")) {
    throw new Error("ERROR: relation 'nonexistent' does not exist at character 15.");
  }

  if (trimmed.startsWith("select")) {
    const mockRows = Array.from({ length: 12 }, (_, i) => ({
      id: `usr_uuid_${100 + i}`,
      email: `user_${i + 1}@nodephone.io`,
      role: i % 2 === 0 ? "admin" : "developer",
      is_active: i % 5 !== 0,
      created_at: new Date(Date.now() - i * 3600000).toISOString(),
    }));

    return {
      columns: Object.keys(mockRows[0]),
      rows: mockRows,
      rowCount: mockRows.length,
      executionTimeMs: Math.round(performance.now() - startTime),
      query: sql,
      timestamp: new Date().toLocaleTimeString(),
    };
  }

  // Non-SELECT statements (UPDATE/INSERT/DELETE/CREATE)
  return {
    columns: ["affected_rows", "status"],
    rows: [{ affected_rows: 1, status: "OK" }],
    rowCount: 1,
    executionTimeMs: Math.round(performance.now() - startTime),
    query: sql,
    timestamp: new Date().toLocaleTimeString(),
  };
}

export async function explainSQLQuery(sql: string): Promise<ExplainPlanData> {
  await new Promise((res) => setTimeout(res, 180));
  const isIndexed = sql.toLowerCase().includes("where id") || sql.toLowerCase().includes("primary");

  return {
    nodeType: isIndexed ? "Index Scan using users_pkey" : "Sequential Scan",
    relationName: "users",
    startupCost: isIndexed ? 0.28 : 0.0,
    totalCost: isIndexed ? 8.3 : 35.5,
    planRows: isIndexed ? 1 : 1420,
    planWidth: 128,
    indexName: isIndexed ? "users_pkey" : undefined,
    scanType: isIndexed ? "Index Scan" : "Sequential Scan",
    executionTimeMs: isIndexed ? 1.2 : 14.8,
  };
}

export function formatSQL(sql: string): string {
  // Simple clean SQL formatter
  return sql
    .replace(/\bSELECT\b/gi, "SELECT")
    .replace(/\bFROM\b/gi, "\nFROM")
    .replace(/\bWHERE\b/gi, "\nWHERE")
    .replace(/\bAND\b/gi, "\n  AND")
    .replace(/\bOR\b/gi, "\n  OR")
    .replace(/\bORDER BY\b/gi, "\nORDER BY")
    .replace(/\bGROUP BY\b/gi, "\nGROUP BY")
    .replace(/\bLIMIT\b/gi, "\nLIMIT");
}
