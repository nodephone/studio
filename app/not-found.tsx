"use client";

import Link from "next/link";
import { Button } from "@/components/ui";
import { AlertCircle, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-neutral-950 text-neutral-100 p-4 text-center">
      <div className="w-full max-w-md space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto text-rose-500 shadow-xl">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Page Not Found (404)
          </h1>
          <p className="text-xs text-neutral-400">
            The requested Studio route or module does not exist or is under active development.
          </p>
        </div>
        <div className="pt-2 flex items-center justify-center space-x-3">
          <Link href="/dashboard">
            <Button variant="primary" size="sm" leftIcon={<Home className="w-4 h-4 text-emerald-400" />}>
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
