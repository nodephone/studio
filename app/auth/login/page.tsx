"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/auth-store";
import { Button, Input, Badge } from "@/components/ui";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/layout";
import { Lock, Mail, ArrowRight, ShieldCheck, Cpu, KeyRound } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error } = useAuthStore();
  const [email, setEmail] = useState("admin@nodephone.io");
  const [password, setPassword] = useState("••••••••••••");
  const [validationError, setValidationError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError("");

    if (!email.trim() || !email.includes("@")) {
      setValidationError("Please enter a valid email address.");
      return;
    }

    const success = await login({ email, password });
    if (success) {
      router.replace("/dashboard");
    }
  };

  const handleDemoLogin = async () => {
    setEmail("admin@nodephone.io");
    const success = await login({ email: "admin@nodephone.io", password: "demo-password" });
    if (success) {
      router.replace("/dashboard");
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-neutral-950 text-neutral-100 p-4 relative overflow-hidden">
      {/* Background ambient gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* Header Branding */}
        <div className="flex flex-col items-center text-center space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center shadow-xl shadow-black/80">
            <span className="font-extrabold text-2xl text-emerald-400">N</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              NodePhone Studio
            </h1>
            <p className="text-sm text-neutral-400 mt-1">
              Sign in to manage your NodePhone Server modules & database
            </p>
          </div>
          <Badge variant="emerald" className="mt-1">
            PRD 002 • Studio Design System
          </Badge>
        </div>

        {/* Login Card */}
        <Card className="border-neutral-800 bg-neutral-900/90 backdrop-blur-md shadow-2xl text-neutral-100">
          <CardHeader className="space-y-1 pb-4">
            <CardTitle className="text-lg font-semibold text-white">
              Sign In
            </CardTitle>
            <CardDescription className="text-xs text-neutral-400">
              Enter your credentials to validate JWT session with NodePhone Server
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {(error || validationError) && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center space-x-2">
                <Lock className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{validationError || error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-300 flex items-center justify-between">
                  <span>Work Email</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
                  <Input
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-9 bg-neutral-950 border-neutral-800 text-neutral-100 placeholder:text-neutral-600 focus-visible:ring-emerald-500/40"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-300 flex items-center justify-between">
                  <span>Password</span>
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-[11px] text-emerald-400 hover:underline"
                  >
                    Forgot?
                  </a>
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
                  <Input
                    type="password"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-9 bg-neutral-950 border-neutral-800 text-neutral-100 placeholder:text-neutral-600 focus-visible:ring-emerald-500/40"
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="primary"
                isLoading={isLoading}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold border-emerald-500 cursor-pointer"
              >
                <span>Continue to Dashboard</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </form>

            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-neutral-800"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase">
                <span className="bg-neutral-900 px-2 text-neutral-500 font-mono">
                  Or Quick Start
                </span>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              onClick={handleDemoLogin}
              isLoading={isLoading}
              className="w-full bg-neutral-950 hover:bg-neutral-800 text-neutral-200 border-neutral-800 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400 mr-2" />
              <span>Sign in as Admin Demo</span>
            </Button>
          </CardContent>

          <CardFooter className="pt-2 pb-5 border-t border-neutral-800/60 flex items-center justify-between text-[11px] text-neutral-500">
            <div className="flex items-center space-x-1.5">
              <Cpu className="w-3.5 h-3.5 text-emerald-500" />
              <span>NodePhone Kernel v1.0.0</span>
            </div>
            <span>8px Grid • OpenAI Design</span>
          </CardFooter>
        </Card>

        {/* Footer info */}
        <p className="text-center text-xs text-neutral-500">
          NodePhone Studio Open Source Dashboard &copy; 2026
        </p>
      </div>
    </div>
  );
}
