export interface SystemMetrics {
  cpuUsage: number; // percentage
  memoryUsageMB: number;
  totalMemoryMB: number;
  databaseSizeMB: number;
  storageUsageGB: number;
  activeUsers: number;
  realtimeConnections: number;
  uptimeSeconds: number;
  timestamp: string;
}

export interface ActivityEvent {
  id: string;
  type: "signin" | "migration" | "deployment" | "upload" | "backup";
  title: string;
  actor: string;
  timestamp: string;
  status: "success" | "pending" | "failed";
}

export interface ServerStatusData {
  status: "online" | "offline" | "degraded";
  version: string;
  environment: "Production" | "Staging" | "Development";
  connectedUrl: string;
  uptimeFormatted: string;
  lastPingMs: number;
}

export async function fetchServerStatus(): Promise<ServerStatusData> {
  // Simulate network latency
  await new Promise((res) => setTimeout(res, 300));
  return {
    status: "online",
    version: "v1.0.4-alpha",
    environment: "Production",
    connectedUrl: "https://kernel.nodephone.io:8443",
    uptimeFormatted: "99.98% • 14 days, 6 hours",
    lastPingMs: 14,
  };
}

export async function fetchSystemMetrics(): Promise<SystemMetrics> {
  // Add small random variations to simulate live server telemetry
  const cpuVariation = Math.floor(Math.random() * 8) - 4;
  const memVariation = Math.floor(Math.random() * 40) - 20;
  const connVariation = Math.floor(Math.random() * 6) - 3;

  return {
    cpuUsage: Math.min(100, Math.max(12, 34 + cpuVariation)),
    memoryUsageMB: Math.min(8192, Math.max(1024, 2450 + memVariation)),
    totalMemoryMB: 8192,
    databaseSizeMB: 1420.5,
    storageUsageGB: 14.8,
    activeUsers: 128,
    realtimeConnections: Math.max(4, 42 + connVariation),
    uptimeSeconds: 1232400,
    timestamp: new Date().toISOString(),
  };
}

export async function fetchActivityFeed(): Promise<ActivityEvent[]> {
  return [
    {
      id: "evt_101",
      type: "migration",
      title: "Schema Migration '20260904_user_roles' applied",
      actor: "alex.dev@nodephone.io",
      timestamp: "2 mins ago",
      status: "success",
    },
    {
      id: "evt_102",
      type: "deployment",
      title: "Serverless Function 'process-webhooks' deployed",
      actor: "system-ci",
      timestamp: "14 mins ago",
      status: "success",
    },
    {
      id: "evt_103",
      type: "upload",
      title: "Uploaded 'user_avatar_2026.png' (2.4 MB)",
      actor: "sarah.admin@nodephone.io",
      timestamp: "45 mins ago",
      status: "success",
    },
    {
      id: "evt_104",
      type: "signin",
      title: "Admin login detected from 192.168.0.144",
      actor: "admin@nodephone.io",
      timestamp: "1 hour ago",
      status: "success",
    },
    {
      id: "evt_105",
      type: "backup",
      title: "Automated Daily PostgreSQL Snapshot Completed",
      actor: "nodephone-kernel",
      timestamp: "3 hours ago",
      status: "success",
    },
  ];
}
