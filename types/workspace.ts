export interface Workspace {
  id: string;
  name: string;
  slug: string;
  plan: "Free" | "Pro" | "Enterprise";
  region: string;
  status: "active" | "maintenance" | "updating";
  projectCount: number;
  avatarBg?: string;
}
