import { NodeType } from "@/lib/types";

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