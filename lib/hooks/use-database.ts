"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchTables,
  fetchTableRows,
  createTable,
  insertRow,
  updateRow,
  deleteRow,
  TableMeta,
  QueryParams,
  QueryResult,
} from "@/lib/api/database";
import { useState } from "react";

export function useDatabase(initialTableName = "users") {
  const queryClient = useQueryClient();
  const [activeTable, setActiveTable] = useState(initialTableName);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<string | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [selectedRow, setSelectedRow] = useState<Record<string, unknown> | null>(null);

  // Fetch Tables metadata
  const tablesQuery = useQuery<TableMeta[]>({
    queryKey: ["databaseTables"],
    queryFn: fetchTables,
  });

  // Fetch Paginated Table Rows
  const rowsQuery = useQuery<QueryResult>({
    queryKey: ["tableRows", activeTable, page, pageSize, search, sortBy, sortOrder],
    queryFn: () =>
      fetchTableRows({
        tableName: activeTable,
        page,
        pageSize,
        search,
        sortBy,
        sortOrder,
      }),
  });

  // Create Table Mutation
  const createTableMutation = useMutation({
    mutationFn: createTable,
    onSuccess: (newTable) => {
      queryClient.invalidateQueries({ queryKey: ["databaseTables"] });
      setActiveTable(newTable.name);
      setPage(1);
    },
  });

  // Insert Row Mutation
  const insertRowMutation = useMutation({
    mutationFn: (newRow: Record<string, unknown>) => insertRow(activeTable, newRow),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tableRows", activeTable] });
      queryClient.invalidateQueries({ queryKey: ["databaseTables"] });
    },
  });

  // Update Row Mutation
  const updateRowMutation = useMutation({
    mutationFn: ({ primaryKeyVal, updatedFields }: { primaryKeyVal: unknown; updatedFields: Record<string, unknown> }) =>
      updateRow(activeTable, primaryKeyVal, updatedFields),
    onSuccess: (updatedRow) => {
      queryClient.invalidateQueries({ queryKey: ["tableRows", activeTable] });
      if (selectedRow && selectedRow.id === updatedRow.id) {
        setSelectedRow(updatedRow);
      }
    },
  });

  // Delete Row Mutation
  const deleteRowMutation = useMutation({
    mutationFn: (primaryKeyVal: unknown) => deleteRow(activeTable, primaryKeyVal),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tableRows", activeTable] });
      queryClient.invalidateQueries({ queryKey: ["databaseTables"] });
      setSelectedRow(null);
    },
  });

  const activeTableMeta = tablesQuery.data?.find((t) => t.name === activeTable);

  return {
    tables: tablesQuery.data || [],
    activeTable,
    setActiveTable: (tName: string) => {
      setActiveTable(tName);
      setPage(1);
      setSearch("");
      setSelectedRow(null);
    },
    activeTableMeta,
    rowsData: rowsQuery.data,
    isLoadingTables: tablesQuery.isLoading,
    isLoadingRows: rowsQuery.isLoading,
    isRefetchingRows: rowsQuery.isRefetching,
    page,
    setPage,
    pageSize,
    setPageSize,
    search,
    setSearch,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    toggleSort: (columnName: string) => {
      if (sortBy === columnName) {
        setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
      } else {
        setSortBy(columnName);
        setSortOrder("asc");
      }
    },
    selectedRow,
    setSelectedRow,
    createTable: createTableMutation.mutateAsync,
    isCreatingTable: createTableMutation.isPending,
    insertRow: insertRowMutation.mutateAsync,
    isInsertingRow: insertRowMutation.isPending,
    updateRow: updateRowMutation.mutateAsync,
    isUpdatingRow: updateRowMutation.isPending,
    deleteRow: deleteRowMutation.mutateAsync,
    isDeletingRow: deleteRowMutation.isPending,
    refetchRows: rowsQuery.refetch,
  };
}
