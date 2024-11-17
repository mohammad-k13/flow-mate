// types.ts
import { type LucideProps } from "lucide-react";
import { type ForwardRefExoticComponent, ReactElement, ReactNode, type  RefAttributes } from "react";

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


// dashbaord sidebar
export type DashboardSidebarLink = {
  path: string,
  label: string,
  icon:  ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
}