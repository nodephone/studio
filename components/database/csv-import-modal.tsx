"use client";

import { useState } from "react";
import { Modal, Button, useToast } from "@/components/ui";
import { Upload, FileSpreadsheet, CheckCircle2 } from "lucide-react";

interface CSVImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  tableName: string;
  onImportComplete: () => void;
}

export function CSVImportModal({
  isOpen,
  onClose,
  tableName,
  onImportComplete,
}: CSVImportModalProps) {
  const { addToast } = useToast();
  const [fileName, setFileName] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSimulateUpload = () => {
    setFileName(`${tableName}_data_export_2026.csv`);
  };

  const handleImport = async () => {
    if (!fileName) return;
    setIsUploading(true);
    await new Promise((res) => setTimeout(res, 800));
    setIsUploading(false);

    addToast({
      type: "success",
      title: "CSV Import Successful",
      description: `Uploaded 25 records to table '${tableName}'.`,
    });
    onImportComplete();
    setFileName(null);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Import CSV into '${tableName}'`}
      description="Upload a CSV file matching table columns to bulk import rows."
      footer={
        <>
          <Button variant="outline" size="sm" onClick={onClose} disabled={isUploading}>
            Cancel
          </Button>
          <Button
            onClick={handleImport}
            disabled={!fileName}
            isLoading={isUploading}
            variant="primary"
            size="sm"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold cursor-pointer border-emerald-500"
          >
            Import CSV Data
          </Button>
        </>
      }
    >
      <div className="space-y-4">
        <div
          onClick={handleSimulateUpload}
          className="border-2 border-dashed border-neutral-300 dark:border-neutral-700 hover:border-emerald-500 dark:hover:border-emerald-500 rounded-2xl p-8 text-center space-y-3 transition-colors cursor-pointer bg-neutral-50 dark:bg-neutral-900/40"
        >
          <FileSpreadsheet className="w-8 h-8 text-emerald-500 mx-auto" />
          {fileName ? (
            <div className="space-y-1">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center justify-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>{fileName}</span>
              </span>
              <p className="text-[11px] text-neutral-400">Ready to insert into {tableName}</p>
            </div>
          ) : (
            <div className="space-y-1">
              <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">
                Click to browse or drop .csv file here
              </p>
              <p className="text-[11px] text-neutral-400">Max size 25 MB • Headers must match column names</p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
