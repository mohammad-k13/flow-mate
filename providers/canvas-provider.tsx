"use client";

import { EdgeType, NodeType } from "@/lib/types";
import { createContext, FC, ReactNode, useContext, useState } from "react";

type CanvasContextType = {
  nodes: NodeType[];
  edges: EdgeType[];
  addNode: (node: NodeType) => void;
  addEdge: (edge: EdgeType) => void;
  setEdgeData: (sourceNodeId: string, data: any) => void;
  getEdgeData: (targetNodeId: string) => any;
};
const canvasContext = createContext<CanvasContextType>({
  nodes: [],
  edges: [],
  addNode: () => {},
  addEdge: () => {},
  getEdgeData: () => {},
  setEdgeData: () => {},
});

type CanvasProviderType = {
  children: ReactNode;
};
export const CanvasProvider: FC<CanvasProviderType> = ({ children }) => {
  const [nodes, setNodes] = useState<NodeType[]>([]);
  const [edges, setEdges] = useState<EdgeType[]>([]);

  const addNode = (node: NodeType) => setNodes((ps) => [...ps, node]);
  const addEdge = (edge: EdgeType) => setEdges((ps) => [...ps, edge]);

  const setEdgeData = (sourceNodeId: string, data: any) => {
    console.log(data);

    const updatedEdges = edges.map((edge) => {
      return edge.source === sourceNodeId ? { ...edge, data } : edge;
    });

    // Set the updated edges in state
    setEdges(updatedEdges);
    console.log(edges);
  };
  const getEdgeData = (targetNodeId: string) => {
    const targetNodeEdge = edges.find((edge) => edge.target === targetNodeId);
    return targetNodeEdge ? targetNodeEdge.data : undefined;
  };
  return (
    <canvasContext.Provider
      value={{
        nodes,
        edges,
        addEdge,
        addNode,
        getEdgeData,
        setEdgeData,
      }}
    >
      {children}
    </canvasContext.Provider>
  );
};

const useCanvas = () => {
  const context = useContext(canvasContext);
  if (!context) throw new Error("useCanvas should wrap with CanvaseProvider");

  return context as CanvasContextType;
};
export default useCanvas;
