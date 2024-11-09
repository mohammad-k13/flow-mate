import { EdgeType, NodeType, EdgeTypes } from "@/lib/types";
import { create } from "zustand";

type UseCanvasState = {
  nodes: NodeType[];
  edges: EdgeType[];

  addNode: (node: NodeType[]) => void;
  addEdges: (edges: EdgeType[]) => void;
  getCustomEdges: (edgeType: EdgeTypes) => EdgeType[];
  getNode: (nodeId: string) => NodeType | undefined;
  editNode: (nodeId: string, data: NodeType["data"]) => void;

  getTargetEdgeData: (nodeId: string) => any;
  setSourceEdgeData: (edgeId: string, currentText: string) => any;
};

const useCanvas = create<UseCanvasState>((set, get) => ({
  edges: [],
  addEdges: (edges) => set(() => ({ edges })),

  nodes: [],
  addNode: (nodes) => set(() => ({ nodes })),

  getCustomEdges: (edgeType) => {
    return get().edges.filter((edge) => edge.type === edgeType);
  },

  getNode: (nodeId) => {
    return get().nodes.find((node) => node.id === nodeId);
  },

  editNode: (nodeId, newData) => {
    const nodeIndex = get().nodes.findIndex((node) => node.id === nodeId);
    const nodes_copy = get().nodes;

    if (nodeIndex === -1) return;
    nodes_copy[nodeIndex] = {
      ...nodes_copy[nodeIndex],
      type: nodes_copy[nodeIndex].type,
      data: newData,
    };
    set({ nodes: nodes_copy });
  },

  getTargetEdgeData: (nodeId) => {
    const targetEdge = get().edges.find((edge) => edge.target === nodeId);
    if (targetEdge) {
      const { data } = targetEdge;
      return data as { currentText: string };
    }

    return null;
  },

  setSourceEdgeData: (edgeId: string, currentText: string) => {
    const edgeIndex = get().edges.findIndex((edge) => edge.id === edgeId);
    const edges_copy = [...get().edges];

    edges_copy[edgeIndex] = { ...edges_copy[edgeIndex], data: { currentText } };
    set({ edges: edges_copy });
    console.log(get().edges)
  },
}));

export default useCanvas;
