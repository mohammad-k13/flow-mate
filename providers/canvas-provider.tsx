"use client";

import { EdgeType, NodeType } from "@/lib/types";
import { createContext, Dispatch, FC, ReactNode, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import FetchToGPT from "@/lib/generateGptResponse";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getWorkflowDataById } from "@/actions/workflows";

type CanvasContextType = {
    nodes: NodeType[];
    edges: EdgeType[];
    unsavedChanges: boolean;

    setNodes: Dispatch<SetStateAction<NodeType[]>>;
    setEdges: Dispatch<SetStateAction<EdgeType[]>>;
    setEdgeData: (sourceNodeId: string, data: any) => void;
    generateGPTResponse: (prompt: string) => any;
    getEdgeData: (targetNodeId: string) => any;
    saveChanges: (workflowId: string) => void;
    setWorkflowData: (workflowId: string) => void;
    clearStates: () => void;
    setUnsavedChanges: Dispatch<SetStateAction<boolean>>;
};
const canvasContext = createContext<CanvasContextType>({
    nodes: [],
    edges: [],
    unsavedChanges: false,

    setNodes: () => {},
    setEdges: () => {},
    getEdgeData: () => {},
    setEdgeData: () => {},
    generateGPTResponse: () => {},
    saveChanges: () => {},
    setWorkflowData: () => {},
    clearStates: () => {},
    setUnsavedChanges: () => {},
});

type CanvasProviderType = {
    children: ReactNode;
};
export const CanvasProvider: FC<CanvasProviderType> = ({ children }) => {
    const [nodes, setNodes] = useState<NodeType[]>([]);
    const [edges, setEdges] = useState<EdgeType[]>([]);
    const [updateWorkflowData, setUpdateWorkflowData] = useState<boolean>(false);
    const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);
    const { push } = useRouter();

    const setEdgeData = (sourceNodeId: string, data: any) => {
        const updatedEdges = edges.map((edge) => {
            return edge.source === sourceNodeId ? { ...edge, data } : edge;
        });
        setEdges(updatedEdges);
    };
    const getEdgeData = (targetNodeId: string) => {
        const targetNodeEdge = edges.find((edge) => edge.target === targetNodeId);
        return targetNodeEdge ? targetNodeEdge.data : undefined;
    };

    const generateGPTResponse = async (prompt: string) => {
        await FetchToGPT(prompt);
    };

    const saveChanges = async (workflowId: string) => {
        try {
            const respones = await fetch("/api/workflow/update", {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                body: JSON.stringify({ nodes, edges, workflowId }),
            });

            console.log(respones);
            const { message } = await respones.json();
            if (respones.ok) {
                toast.success(message);
                setUnsavedChanges(false);
            } else {
                toast.error(message);
            }
        } catch (err) {
            toast.error("Faild to Fetch");
        }
    };

    const setWorkflowData = async (workflowId: string) => {
        try {
            const data = await getWorkflowDataById(workflowId);
            //if number doesn't be 500 or 403, data will be workflow Data
            if (typeof data === "number") {
                toast.error("Failed to Fetch");
                push("/dashboard/workflows");
                return;
            }
            const workflow = data;

            if (!workflow) {
                toast.error("Workflow Not Found");
                push("/dashbaord/workflows");
                return;
            }

            const workflowNodes: NodeType[] = workflow.nodes.map(
                (node: any) =>
                    ({
                        id: node.id,
                        type: node.type,
                        data: {
                            title: node.data.title ?? "",
                            description: node.data.description ?? "",
                            prompt: node.prompt,
                        },
                        position: {
                            x: node.positionX || 0,
                            y: node.positionY || 0,
                        },
                    } as NodeType)
            );
            const workflowEdges: EdgeType[] = workflow.edges.map(
                (edge: any) =>
                    ({
                        id: edge.id,
                        source: edge.sourceNode.id,
                        target: edge.targetNode.id,
                        type: edge.type || "feild-text",
                    } as EdgeType)
            );

            setNodes(workflowNodes);
            setEdges(workflowEdges);
            setUnsavedChanges(false);
        } catch (err) {
            console.log(err);
            toast.error("Failed to Fetch");
            push("/dashboard/workflows");
        }
    };

    const clearStates = () => {
        setNodes([]);
        setEdges([]);
        setUnsavedChanges(false);
    };

    return (
        <canvasContext.Provider
            value={{
                nodes,
                edges,
                unsavedChanges,
                setEdges,
                setNodes,
                getEdgeData,
                setEdgeData,
                generateGPTResponse,
                saveChanges,
                setWorkflowData,
                clearStates,
                setUnsavedChanges,
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
