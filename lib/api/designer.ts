export type DesignerColumnType =
  | "TEXT"
  | "INTEGER"
  | "REAL"
  | "BOOLEAN"
  | "DATETIME"
  | "BLOB"
  | "JSON";

export interface DesignerColumn {
  id: string;
  name: string;
  type: DesignerColumnType;
  isPrimaryKey: boolean;
  isNullable: boolean;
  isUnique: boolean;
  isAutoIncrement: boolean;
  defaultValue?: string;
}

export interface ForeignKeyRelation {
  id: string;
  columnName: string;
  parentTable: string;
  parentColumn: string;
  onDelete: "CASCADE" | "SET NULL" | "RESTRICT" | "NO ACTION";
  onUpdate: "CASCADE" | "SET NULL" | "RESTRICT" | "NO ACTION";
}

export interface IndexDefinition {
  id: string;
  indexName: string;
  columns: string[];
  isUnique: boolean;
}

export interface TableSchema {
  tableName: string;
  schema: string;
  columns: DesignerColumn[];
  foreignKeys: ForeignKeyRelation[];
  indexes: IndexDefinition[];
}

export interface ValidationError {
  field: string;
  message: string;
  type: "error" | "warning";
}

const RESERVED_SQL_KEYWORDS = new Set([
  "SELECT", "INSERT", "UPDATE", "DELETE", "FROM", "WHERE", "TABLE", "PRIMARY",
  "KEY", "FOREIGN", "CONSTRAINT", "INDEX", "DROP", "ALTER", "CREATE", "JOIN",
  "GROUP", "ORDER", "BY", "LIMIT", "OFFSET", "UNION", "ALL", "AND", "OR", "NOT",
]);

export function validateSchema(schema: TableSchema): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!schema.tableName.trim()) {
    errors.push({ field: "tableName", message: "Table name cannot be empty.", type: "error" });
  } else if (RESERVED_SQL_KEYWORDS.has(schema.tableName.toUpperCase())) {
    errors.push({
      field: "tableName",
      message: `'${schema.tableName}' is a reserved SQL keyword. Consider renaming.`,
      type: "warning",
    });
  }

  const colNames = new Set<string>();
  let hasPrimaryKey = false;

  schema.columns.forEach((col) => {
    if (!col.name.trim()) {
      errors.push({ field: "column", message: "Column name cannot be blank.", type: "error" });
    } else if (colNames.has(col.name.toLowerCase())) {
      errors.push({
        field: "column",
        message: `Duplicate column name '${col.name}' found.`,
        type: "error",
      });
    } else {
      colNames.add(col.name.toLowerCase());
    }

    if (RESERVED_SQL_KEYWORDS.has(col.name.toUpperCase())) {
      errors.push({
        field: "column",
        message: `Column name '${col.name}' is a reserved SQL keyword.`,
        type: "warning",
      });
    }

    if (col.isPrimaryKey) hasPrimaryKey = true;
  });

  if (!hasPrimaryKey) {
    errors.push({
      field: "table",
      message: "Table has no primary key defined. Consider marking an ID column as primary key.",
      type: "warning",
    });
  }

  schema.foreignKeys.forEach((fk) => {
    if (!fk.columnName || !fk.parentTable || !fk.parentColumn) {
      errors.push({
        field: "foreignKey",
        message: "Foreign key relationship is incomplete.",
        type: "error",
      });
    }
  });

  return errors;
}

export function generateSQLMigration(schema: TableSchema): string {
  const lines: string[] = [];
  const { tableName, columns, foreignKeys, indexes } = schema;
  const safeTableName = tableName || "new_table";

  lines.push(`-- NodePhone Migration Script`);
  lines.push(`-- Target Table: ${safeTableName}`);
  lines.push(`-- Generated: ${new Date().toISOString()}`);
  lines.push(``);
  lines.push(`CREATE TABLE IF NOT EXISTS ${safeTableName} (`);

  const columnLines: string[] = [];

  columns.forEach((col) => {
    const parts: string[] = [`  "${col.name || "column"}" ${col.type}`];

    if (col.isPrimaryKey) parts.push("PRIMARY KEY");
    if (col.isAutoIncrement) parts.push("AUTOINCREMENT");
    if (!col.isNullable && !col.isPrimaryKey) parts.push("NOT NULL");
    if (col.isUnique && !col.isPrimaryKey) parts.push("UNIQUE");
    if (col.defaultValue && col.defaultValue.trim() !== "") {
      parts.push(`DEFAULT ${col.defaultValue}`);
    }

    columnLines.push(parts.join(" "));
  });

  foreignKeys.forEach((fk) => {
    if (fk.columnName && fk.parentTable && fk.parentColumn) {
      columnLines.push(
        `  FOREIGN KEY ("${fk.columnName}") REFERENCES "${fk.parentTable}" ("${fk.parentColumn}") ON DELETE ${fk.onDelete} ON UPDATE ${fk.onUpdate}`
      );
    }
  });

  lines.push(columnLines.join(",\n"));
  lines.push(`);`);
  lines.push(``);

  indexes.forEach((idx) => {
    if (idx.columns.length > 0) {
      const uniqueKeyword = idx.isUnique ? "UNIQUE " : "";
      const idxName = idx.indexName || `idx_${safeTableName}_${idx.columns.join("_")}`;
      const colList = idx.columns.map((c) => `"${c}"`).join(", ");
      lines.push(`CREATE ${uniqueKeyword}INDEX IF NOT EXISTS "${idxName}" ON "${safeTableName}" (${colList});`);
    }
  });

  return lines.join("\n");
}

export async function applyMigration(schema: TableSchema, sql: string): Promise<boolean> {
  await new Promise((res) => setTimeout(res, 400));
  return true;
}
