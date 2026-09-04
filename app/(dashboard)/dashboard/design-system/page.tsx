"use client";

import * as React from "react";
import {
  Button,
  Input,
  Textarea,
  Select,
  Checkbox,
  Switch,
  Modal,
  Dialog,
  Dropdown,
  Tooltip,
  Badge,
  Avatar,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Tabs,
  useToast,
  Spinner,
  Skeleton,
  EmptyState,
} from "@/components/ui";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  PageHeader,
  Section,
  Container,
} from "@/components/layout";
import { tokens } from "@/lib/design/tokens";
import {
  Sparkles,
  Search,
  Plus,
  Trash2,
  Mail,
  Lock,
  Download,
  Filter,
  CheckCircle2,
  Bell,
  Sliders,
  Palette,
  Layout,
  Zap,
} from "lucide-react";

export default function DesignSystemShowcasePage() {
  const { addToast } = useToast();
  const [activeTab, setActiveTab] = React.useState("primitives");
  const [switchChecked, setSwitchChecked] = React.useState(true);
  const [checkboxChecked, setCheckboxChecked] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedSelectValue, setSelectedSelectValue] = React.useState("option1");

  const showcaseTabs = [
    { id: "primitives", label: "UI Primitives", icon: <Sliders className="w-4 h-4" /> },
    { id: "tokens", label: "Design Tokens", icon: <Palette className="w-4 h-4" /> },
    { id: "layout", label: "Layout Primitives", icon: <Layout className="w-4 h-4" /> },
  ];

  return (
    <Container size="xl" className="space-y-8 py-4">
      {/* Page Header Component */}
      <PageHeader
        title="Studio Design System"
        subtitle="Reusable UI primitives, design tokens, motion presets, and layout components for PRD 002."
        badge={
          <Badge variant="emerald" dot>
            PRD 002 Active
          </Badge>
        }
        actions={
          <Button
            onClick={() =>
              addToast({
                type: "success",
                title: "Design System Ready",
                description: "All 19 UI primitives & tokens operational.",
              })
            }
            variant="primary"
            size="sm"
            leftIcon={<Sparkles className="w-4 h-4 text-emerald-400" />}
          >
            Trigger Test Toast
          </Button>
        }
      />

      {/* Tabs */}
      <Tabs
        tabs={showcaseTabs}
        activeTab={activeTab}
        onChange={setActiveTab}
        variant="pill"
      />

      {activeTab === "primitives" && (
        <div className="space-y-8">
          {/* Section 1: Buttons */}
          <Section title="1. Button Primitive (5 Variants & 4 Sizes)">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Button variant="primary">Primary</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="danger">Danger</Button>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Button size="sm" variant="primary">
                    Small
                  </Button>
                  <Button size="md" variant="primary">
                    Medium
                  </Button>
                  <Button size="lg" variant="primary">
                    Large
                  </Button>
                  <Button size="icon" variant="outline">
                    <Search className="w-4 h-4" />
                  </Button>
                  <Button isLoading variant="primary">
                    Loading
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Section>

          {/* Section 2: Form Inputs & Controls */}
          <Section title="2. Form Inputs, Select, Checkbox & Switch">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Text Inputs & Select</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input
                    label="Email Address"
                    placeholder="admin@nodephone.io"
                    leftIcon={<Mail className="w-4 h-4" />}
                    helperText="We'll never share your email."
                  />
                  <Input
                    label="Password Field"
                    type="password"
                    placeholder="••••••••••••"
                    leftIcon={<Lock className="w-4 h-4" />}
                    error="Password must be at least 8 characters."
                  />
                  <Select
                    label="Environment Selector"
                    value={selectedSelectValue}
                    onChange={(e) => setSelectedSelectValue(e.target.value)}
                    options={[
                      { value: "option1", label: "Production (us-east-1)" },
                      { value: "option2", label: "Staging (eu-west-1)" },
                      { value: "option3", label: "Development Sandbox" },
                    ]}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Textarea, Checkbox & Framer Switch</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    label="Project Description"
                    placeholder="Describe your microservice requirements..."
                    showCount
                    maxLength={200}
                    defaultValue="NodePhone Kernel serverless engine configuration..."
                  />
                  <div className="flex items-center space-x-6 pt-2">
                    <Checkbox
                      label="Enable SSL Verification"
                      checked={checkboxChecked}
                      onChange={(e) => setCheckboxChecked(e.target.checked)}
                    />
                    <Switch
                      label="Realtime Engine Active"
                      checked={switchChecked}
                      onCheckedChange={setSwitchChecked}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </Section>

          {/* Section 3: Badges, Avatars, Tooltips & Dropdown */}
          <Section title="3. Badges, Avatars, Tooltips & Dropdowns">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-neutral-500 uppercase">
                    Status Badges
                  </h4>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="default">Default</Badge>
                    <Badge variant="secondary">Secondary</Badge>
                    <Badge variant="outline">Outline</Badge>
                    <Badge variant="emerald" dot>
                      Active
                    </Badge>
                    <Badge variant="amber" dot>
                      Warning
                    </Badge>
                    <Badge variant="rose" dot>
                      Offline
                    </Badge>
                    <Badge variant="indigo">Enterprise</Badge>
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-neutral-500 uppercase">
                    Avatars & Status Indicators
                  </h4>
                  <div className="flex items-center space-x-4">
                    <Avatar size="sm" fallback="NP" status="online" />
                    <Avatar size="md" fallback="AD" status="online" />
                    <Avatar size="lg" fallback="AL" status="busy" />
                    <Avatar size="xl" fallback="WS" status="away" />
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-neutral-500 uppercase">
                    Tooltips & Action Dropdowns
                  </h4>
                  <div className="flex items-center space-x-4">
                    <Tooltip content="Quick action search trigger" position="top">
                      <Button variant="outline" size="sm">
                        Hover Me (Tooltip)
                      </Button>
                    </Tooltip>

                    <Dropdown
                      trigger={
                        <Button variant="secondary" size="sm">
                          Dropdown Actions ▾
                        </Button>
                      }
                      items={[
                        { id: "1", label: "Export Database", icon: <Download className="w-4 h-4" /> },
                        { id: "2", label: "Configure Filters", icon: <Filter className="w-4 h-4" />, badge: "Pro" },
                        "divider",
                        { id: "3", label: "Delete Project", icon: <Trash2 className="w-4 h-4" />, danger: true },
                      ]}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Section>

          {/* Section 4: Modal & Dialog Triggers */}
          <Section title="4. Modal Overlays & Confirmation Dialogs">
            <Card>
              <CardContent className="p-6 flex items-center space-x-4">
                <Button onClick={() => setIsModalOpen(true)} variant="primary">
                  Open Reusable Modal
                </Button>
                <Button onClick={() => setIsDialogOpen(true)} variant="danger">
                  Open Danger Dialog
                </Button>
              </CardContent>
            </Card>

            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Studio Shell Modal"
              description="Built with Framer Motion spring physics and backdrop blur."
              footer={
                <Button onClick={() => setIsModalOpen(false)} variant="primary" size="sm">
                  Done
                </Button>
              }
            >
              <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                This is a reusable modal component primitive conforming to the 8px grid design system.
              </p>
            </Modal>

            <Dialog
              isOpen={isDialogOpen}
              onClose={() => setIsDialogOpen(false)}
              title="Delete Database Table?"
              description="This action cannot be undone. All rows will be permanently deleted."
              variant="danger"
              confirmText="Delete Table"
              onConfirm={() => {
                setIsDialogOpen(false);
                addToast({
                  type: "error",
                  title: "Action Executed",
                  description: "Database table deletion executed.",
                });
              }}
            >
              <p className="text-xs text-rose-500 font-medium">
                Are you sure you want to proceed with destroying this schema layer?
              </p>
            </Dialog>
          </Section>

          {/* Section 5: Table & Loading Primitives */}
          <Section title="5. Data Tables, Spinners, Skeletons & Empty State">
            <div className="space-y-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Service Name</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Latency</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-semibold">NodePhone Kernel Auth</TableCell>
                    <TableCell className="font-mono">us-east-1</TableCell>
                    <TableCell>
                      <Badge variant="emerald" dot>
                        Online
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono">12ms</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-semibold">Realtime PubSub Bus</TableCell>
                    <TableCell className="font-mono">eu-west-1</TableCell>
                    <TableCell>
                      <Badge variant="emerald" dot>
                        Online
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono">18ms</TableCell>
                  </TableRow>
                </TableBody>
              </Table>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Spinners & Skeletons</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Spinner size="sm" />
                      <Spinner size="md" variant="emerald" />
                      <Spinner size="lg" />
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-8 w-28" />
                    </div>
                  </CardContent>
                </Card>

                <EmptyState
                  title="No Custom Hooks Registered"
                  description="Connect custom NodePhone kernel webhooks or event handlers."
                  action={
                    <Button variant="outline" size="sm" leftIcon={<Plus className="w-3.5 h-3.5" />}>
                      Create Hook
                    </Button>
                  }
                />
              </div>
            </div>
          </Section>
        </div>
      )}

      {activeTab === "tokens" && (
        <Section title="Design System Token Inspection">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-xs uppercase text-neutral-500">8px Grid Scale</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs font-mono">
                {Object.entries(tokens.spacing).map(([key, val]) => (
                  <div key={key} className="flex justify-between border-b border-neutral-100 dark:border-neutral-800 pb-1">
                    <span className="text-neutral-500">{key}</span>
                    <span className="font-bold text-neutral-900 dark:text-neutral-100">{val}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xs uppercase text-neutral-500">Radius Scale</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-xs font-mono">
                {Object.entries(tokens.radius).map(([key, val]) => (
                  <div key={key} className="flex justify-between border-b border-neutral-100 dark:border-neutral-800 pb-1">
                    <span className="text-neutral-500">{key}</span>
                    <span className="font-bold text-neutral-900 dark:text-neutral-100">{val}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="sm:col-span-2">
              <CardHeader>
                <CardTitle className="text-xs uppercase text-neutral-500">Semantic Color Palette</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-2 text-xs">
                {Object.entries(tokens.colors.light).slice(0, 10).map(([key, val]) => (
                  <div key={key} className="flex items-center space-x-2 p-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800">
                    <div className="w-4 h-4 rounded border" style={{ backgroundColor: val }} />
                    <div className="truncate">
                      <div className="font-semibold text-[11px] truncate">{key}</div>
                      <div className="text-[10px] font-mono text-neutral-400">{val}</div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </Section>
      )}

      {activeTab === "layout" && (
        <Section title="Layout Primitives (Card, PageHeader, Container, Section)">
          <Card>
            <CardHeader>
              <CardTitle>Layout Component Structure</CardTitle>
              <CardDescription>
                CardHeader, CardTitle, CardDescription, CardContent, and CardFooter organize layout content cleanly.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-neutral-600 dark:text-neutral-400">
                Container constrains layout width (`sm`, `md`, `lg`, `xl`, `full`). PageHeader standardizes section titles, and Section groups features with dividers.
              </p>
            </CardContent>
            <CardFooter className="bg-neutral-50 dark:bg-neutral-900/50 border-t border-neutral-100 dark:border-neutral-800 text-xs text-neutral-500">
              PRD 002 Layout Primitives Ready
            </CardFooter>
          </Card>
        </Section>
      )}
    </Container>
  );
}
