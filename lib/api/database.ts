export interface ColumnDefinition {
  name: string;
  type: "uuid" | "varchar" | "integer" | "boolean" | "timestamp" | "jsonb";
  isPrimary?: boolean;
  isNullable?: boolean;
  defaultValue?: string;
}

export interface TableMeta {
  name: string;
  schema: string;
  rowCount: number;
  columns: ColumnDefinition[];
  isFavorite?: boolean;
  updatedAt: string;
}

export interface QueryParams {
  tableName: string;
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface QueryResult<T = Record<string, unknown>> {
  rows: T[];
  totalCount: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Initial Mock Tables Schema for NodePhone Database Explorer
let MOCK_TABLES: TableMeta[] = [
  {
    name: "users",
    schema: "public",
    rowCount: 1420,
    isFavorite: true,
    updatedAt: "2 mins ago",
    columns: [
      { name: "id", type: "uuid", isPrimary: true, isNullable: false },
      { name: "email", type: "varchar", isNullable: false },
      { name: "full_name", type: "varchar", isNullable: true },
      { name: "role", type: "varchar", isNullable: false, defaultValue: "'developer'" },
      { name: "is_active", type: "boolean", isNullable: false, defaultValue: "true" },
      { name: "created_at", type: "timestamp", isNullable: false, defaultValue: "NOW()" },
    ],
  },
  {
    name: "auth_tokens",
    schema: "auth",
    rowCount: 3840,
    isFavorite: false,
    updatedAt: "10 mins ago",
    columns: [
      { name: "id", type: "uuid", isPrimary: true, isNullable: false },
      { name: "user_id", type: "uuid", isNullable: false },
      { name: "jwt_hash", type: "varchar", isNullable: false },
      { name: "expires_at", type: "timestamp", isNullable: false },
      { name: "created_at", type: "timestamp", isNullable: false },
    ],
  },
  {
    name: "storage_buckets",
    schema: "storage",
    rowCount: 24,
    isFavorite: true,
    updatedAt: "1 hour ago",
    columns: [
      { name: "id", type: "uuid", isPrimary: true, isNullable: false },
      { name: "bucket_name", type: "varchar", isNullable: false },
      { name: "is_public", type: "boolean", isNullable: false, defaultValue: "false" },
      { name: "file_size_limit_mb", type: "integer", isNullable: false, defaultValue: "50" },
      { name: "created_at", type: "timestamp", isNullable: false },
    ],
  },
  {
    name: "serverless_logs",
    schema: "public",
    rowCount: 12540,
    isFavorite: false,
    updatedAt: "Just now",
    columns: [
      { name: "id", type: "uuid", isPrimary: true, isNullable: false },
      { name: "function_name", type: "varchar", isNullable: false },
      { name: "status_code", type: "integer", isNullable: false },
      { name: "duration_ms", type: "integer", isNullable: false },
      { name: "metadata", type: "jsonb", isNullable: true },
      { name: "created_at", type: "timestamp", isNullable: false },
    ],
  },
];

// Initial Mock Rows Store
const MOCK_ROWS_DB: Record<string, Record<string, unknown>[]> = {
  users: Array.from({ length: 45 }, (_, idx) => ({
    id: `usr_uuid_${1000 + idx}`,
    email: `dev_${idx + 1}@nodephone.io`,
    full_name: `Alex Developer ${idx + 1}`,
    role: idx % 3 === 0 ? "owner" : idx % 2 === 0 ? "admin" : "developer",
    is_active: idx % 7 !== 0,
    created_at: new Date(Date.now() - idx * 86400000).toISOString(),
  })),
  auth_tokens: Array.from({ length: 30 }, (_, idx) => ({
    id: `tok_uuid_${5000 + idx}`,
    user_id: `usr_uuid_${1000 + (idx % 10)}`,
    jwt_hash: `sha256_np_${Math.random().toString(36).substring(2, 10)}`,
    expires_at: new Date(Date.now() + (idx + 1) * 86400000).toISOString(),
    created_at: new Date(Date.now() - idx * 3600000).toISOString(),
  })),
  storage_buckets: [
    { id: "bkt_101", bucket_name: "avatars-public", is_public: true, file_size_limit_mb: 10, created_at: "2026-08-01T10:00:00Z" },
    { id: "bkt_102", bucket_name: "backups-private", is_public: false, file_size_limit_mb: 500, created_at: "2026-08-15T14:30:00Z" },
    { id: "bkt_103", bucket_name: "function-logs", is_public: false, file_size_limit_mb: 50, created_at: "2026-09-01T09:12:00Z" },
  ],
  serverless_logs: Array.from({ length: 50 }, (_, idx) => ({
    id: `log_uuid_${8000 + idx}`,
    function_name: idx % 2 === 0 ? "process-webhooks" : "send-email-notifications",
    status_code: idx % 9 === 0 ? 500 : 200,
    duration_ms: Math.floor(Math.random() * 120) + 8,
    metadata: JSON.stringify({ ip: "192.168.0.144", attempt: idx + 1 }),
    created_at: new Date(Date.now() - idx * 120000).toISOString(),
  })),
};

export async function fetchTables(): Promise<TableMeta[]> {
  await new Promise((res) => setTimeout(res, 200));
  return MOCK_TABLES;
}

export async function fetchTableRows(params: QueryParams): Promise<QueryResult> {
  await new Promise((res) => setTimeout(res, 250));

  const { tableName, page = 1, pageSize = 10, search = "", sortBy, sortOrder = "asc" } = params;
  let rows = MOCK_ROWS_DB[tableName] || [];

  if (search.trim()) {
    const q = search.toLowerCase();
    rows = rows.filter((row) =>
      Object.values(row).some((val) => String(val).toLowerCase().includes(q))
    );
  }

  if (sortBy) {
    rows = [...rows].sort((a, b) => {
      const valA = String(a[sortBy] ?? "");
      const valB = String(b[sortBy] ?? "");
      if (valA < valB) return sortOrder === "asc" ? -1 : 1;
      if (valA > valB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
  }

  const totalCount = rows.length;
  const totalPages = Math.ceil(totalCount / pageSize) || 1;
  const startIndex = (page - 1) * pageSize;
  const paginatedRows = rows.slice(startIndex, startIndex + pageSize);

  return {
    rows: paginatedRows,
    totalCount,
    page,
    pageSize,
    totalPages,
  };
}

export async function createTable(newTable: TableMeta): Promise<TableMeta> {
  await new Promise((res) => setTimeout(res, 300));
  MOCK_TABLES.unshift(newTable);
  MOCK_ROWS_DB[newTable.name] = [];
  return newTable;
}

export async function insertRow(tableName: string, newRow: Record<string, unknown>): Promise<Record<string, unknown>> {
  await new Promise((res) => setTimeout(res, 250));
  if (!MOCK_ROWS_DB[tableName]) {
    MOCK_ROWS_DB[tableName] = [];
  }
  MOCK_ROWS_DB[tableName].unshift(newRow);

  const meta = MOCK_TABLES.find((t) => t.name === tableName);
  if (meta) meta.rowCount += 1;

  return newRow;
}

export async function updateRow(tableName: string, primaryKeyVal: unknown, updatedFields: Record<string, unknown>): Promise<Record<string, unknown>> {
  await new Promise((res) => setTimeout(res, 200));
  const rows = MOCK_ROWS_DB[tableName] || [];
  const index = rows.findIndex((r) => r.id === primaryKeyVal);

  if (index !== -1) {
    rows[index] = { ...rows[index], ...updatedFields };
    return rows[index];
  }
  throw new Error(`Row with id ${primaryKeyVal} not found.`);
}

export async function deleteRow(tableName: string, primaryKeyVal: unknown): Promise<boolean> {
  await new Promise((res) => setTimeout(res, 200));
  if (MOCK_ROWS_DB[tableName]) {
    MOCK_ROWS_DB[tableName] = MOCK_ROWS_DB[tableName].filter((r) => r.id !== primaryKeyVal);
    const meta = MOCK_TABLES.find((t) => t.name === tableName);
    if (meta && meta.rowCount > 0) meta.rowCount -= 1;
  }
  return true;
}

export function exportTableToCSV(tableName: string, rows: Record<string, unknown>[]): string {
  if (!rows || rows.length === 0) return "";
  const headers = Object.keys(rows[0]);
  const csvLines = [headers.join(",")];

  for (const row of rows) {
    const values = headers.map((h) => {
      const val = row[h];
      const strVal = typeof val === "object" ? JSON.stringify(val) : String(val ?? "");
      return `"${strVal.replace(/"/g, '""')}"`;
    });
    csvLines.push(values.join(","));
  }

  return csvLines.join("\n");
}
