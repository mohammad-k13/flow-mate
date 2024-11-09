import { ReactElement } from "react";

export type NodeTypes = "feild" | "text" | "test";

export type NodeType = {
  id: string;
  type: NodeTypes;
  data: { title: string; description: string };

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
  data: {
    currentText: string;
  };
  type: EdgeTypes;
};
