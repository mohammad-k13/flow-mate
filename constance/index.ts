import { DashboardSidebarLink, NodeType } from "@/lib/types";
import {
  Bell,
  BookOpen,
  Braces,
  Cable,
  CircleDollarSign,
  icons,
  Layers3,
  User,
  UserCheck,
  Waypoints,
  Workflow,
  Instagram,
  Mail,
  MessageCircle,
  FileText,
  Slack,
  Twitter,
  File,
  Trello,
  Cloud,
  CheckSquare,
} from "lucide-react";
import { signIn } from "next-auth/react";

export const sidebarNodes: NodeType[] = [
  {
    id: "Email",
    data: {
      title: "Email",
      description: "Use your emails as triggers for your workflow.",
    },
    type: "Email",
    position: { x: 0, y: 0 },
  },
  {
    id: "Google Drive",
    data: {
      title: "Google Drive",
      description: "Automate tasks with your Google Drive files and folders.",
    },
    type: "Google Drive",
    position: { x: 0, y: 0 },
  },
  {
    id: "Instagram",
    data: {
      title: "Instagram",
      description: "Use Instagram events as triggers for your workflow.",
    },
    type: "Instagram",
    position: { x: 0, y: 0 },
  },
  {
    id: "Discord",
    data: {
      title: "Discord",
      description: "Automate interactions with your Discord server.",
    },
    type: "Discord",
    position: { x: 0, y: 0 },
  },
  {
    id: "Github",
    data: {
      title: "Github",
      description: "Use GitHub actions and events as triggers.",
    },
    type: "Github",
    position: { x: 0, y: 0 },
  },
];

export const WorkflowLinks: DashboardSidebarLink[] = [
  {
    icon: Workflow,
    label: "My Workflows",
    path: "/dashboard/workflows",
  },
  {
    icon: Waypoints,
    label: "Public Workflows",
    path: "/dashboard/workflows",
  },
  {
    icon: UserCheck,
    label: "My Public Workflows",
    path: "/dashboard/workflows",
  },
];

export const SettingLinks: DashboardSidebarLink[] = [
  {
    icon: User,
    path: "/settings",
    label: "Profile",
  },
  {
    icon: CircleDollarSign,
    path: "/settings",
    label: "Billing & Plans",
  },
  {
    icon: Bell,
    path: "/settings",
    label: "Notifications",
  },
  {
    icon: Braces,
    path: "/settings",
    label: "API Tokens",
  },
];

export const IntegrationLinks: DashboardSidebarLink[] = [
  {
    icon: Cable,
    path: "/dashboard/my-integration",
    label: "My Integration",
  },
];

interface IntergrationClick extends DashboardSidebarLink {
  onClick?: () => {}
}
export const IntegrateAppLinks: IntergrationClick[] = [
  {
    path: "/integrations/instagram",
    label: "Instagram",
    icon: Instagram,
  },
  {
    path: "/integrations/gmail",
    label: "Gmail",
    icon: Mail,
  },
  {
    path: "/integrations/discord",
    label: "Discord",
    icon: MessageCircle,
    onClick: async () => await signIn("discord", {redirectTo: "/dashboard/my-integration"})
  },
  {
    path: "/integrations/notion",
    label: "Notion",
    icon: FileText,
  },
  {
    path: "/integrations/slack",
    label: "Slack",
    icon: Slack,
  },
  {
    path: "/integrations/twitter",
    label: "Twitter",
    icon: Twitter,
  },
  {
    path: "/integrations/google-drive",
    label: "Google Drive",
    icon: File,
  },
  {
    path: "/integrations/trello",
    label: "Trello",
    icon: Trello,
  },
  {
    path: "/integrations/dropbox",
    label: "Dropbox",
    icon: Cloud,
  },
  {
    path: "/integrations/asana",
    label: "Asana",
    icon: CheckSquare,
  },
];