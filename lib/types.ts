// types.ts
import { type LucideProps } from "lucide-react";
import { type ForwardRefExoticComponent, ReactElement, ReactNode, type RefAttributes } from "react";

//OAuth
export interface IAccessTokensType {
    discordAccessToken: string | null;
    googleAccessToken: string | null;
    githubAccessToken: string | null;
}

//React flow
export type NodeTypes = "google" | "instagram" | "discord" | "github";

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

export type EdgeTypes = string;

export type EdgeType = {
    id: string;
    source: string;
    target: string;
    data: any;
    type: EdgeTypes;
};

// Icon Props
export type IconProps = {
    size?: number;
    width?: number;
    height?: number;
};

// dashbaord sidebar
export interface DashboardSidebarLink {
    path: string;
    label: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
};


// integration
export type IntegrateAppCardType = "discord" | "github" | "google";
