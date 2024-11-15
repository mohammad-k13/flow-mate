// types.ts
import { ReactElement } from "react";

export type NodeTypes = "Email" | "Google Drive" | "Instagram" | "Discord" | "Github";

export type NodeType = {
  id: string;
  type: NodeTypes;
  data: {
    title: string;
    description: string;
  };
  position: {
    x: number;
    y: number;
  };
};

export type EdgeTypes = "feild-text";

export type EdgeType = {
  id: string;
  source: string;
  target: string;
  data: any
  type: EdgeTypes;
};

// Icon Props
export type IconProps = {
  size?: number;
  width?: number;
  height?: number;
};
