"use client";

import {
    Background,
    ReactFlow,
    ReactFlowInstance,
    useEdgesState,
    useNodesState,
    Connection,
    Node,
    Edge,
    NodeChange,
    EdgeChange,
    applyNodeChanges,
    applyEdgeChanges,
} from "@xyflow/react";
import React, { useCallback, useEffect, useState, useMemo } from "react";
import WorkflowTextCard from "./nodes/workflow-text-card";
import InputTextEdge from "./edges/input-text-edge";
import { v4 } from "uuid";
import useCanvas from "@/providers/canvas-provider";
import { sidebarNodes } from "@/constance";
import "@xyflow/react/dist/style.css";
import WorkflowInputCard from "./nodes/workflow-input-card";
import { useTheme } from "next-themes";
import { EdgeType, NodeType, NodeTypes } from "@/lib/types";
import WorkflowTriggerCard from "./nodes/workflow-trigger-card";

const WorkFlowCanvas = () => {
    const { theme } = useTheme();
    const { setNodes, setEdges, setUnsavedChanges, edges, nodes } = useCanvas();
    const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

    const onConnect = useCallback(
        (params: Connection) => {
            const source = nodes.find((node) => node.id === params.source);
            const target = nodes.find((node) => node.id === params.target);

            if (source && target) {
                const edgeType = `${source.type}-${target.type}`;
                const newEdge: EdgeType = {
                    id: v4(),
                    source: source.id,
                    target: target.id,
                    data: null,
                    type: edgeType,
                };

                setEdges((pv) => [...pv, newEdge]);
                setUnsavedChanges(true);
            }
        },
        [nodes, setEdges, setUnsavedChanges]
    );

    const onNodesChange = useCallback(
        (changes: NodeChange[]) => {
            setNodes((nds: NodeType[]) => applyNodeChanges(changes, nds) as NodeType[]);
            setUnsavedChanges(true);
        },
        [setNodes, setUnsavedChanges]
    );

    const onEdgesChange = useCallback(
        (changes: EdgeChange[]) => {
            setEdges((eds: EdgeType[]) => applyEdgeChanges(changes, eds) as EdgeType[]), setUnsavedChanges(true);
        },
        [setEdges, setUnsavedChanges]
    );

    const onDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const type = event.dataTransfer.getData("application/reactflow") as NodeTypes;

        if (!reactFlowInstance) return;

        const position = reactFlowInstance.screenToFlowPosition({
            x: event.clientX,
            y: event.clientY,
        });

        const cardInfo = sidebarNodes.find((node) => node.type === type);

        if (cardInfo) {
            const newNode: NodeType = {
                id: v4(),
                position,
                data: {
                    title: cardInfo.data.title || "Untitled",
                    description: cardInfo.data.description || "",
                },
                type,
            };
            console.log(newNode);

            setNodes((pv) => [...pv, newNode]);
            setUnsavedChanges(true);
        }
    };

    const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);

    const nodeTypes = useMemo(
        () => ({
            github: WorkflowInputCard,
            google: WorkflowInputCard,
            discord: WorkflowTriggerCard,
        }),
        []
    );

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onConnect={onConnect}
            onDrop={onDrop}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onDragOver={onDragOver}
            onInit={setReactFlowInstance as any}
            nodeTypes={nodeTypes}
            fitView
            colorMode={theme === "light" ? "light" : theme === "dark" ? "dark" : "system"}
        >
            <Background offset={3} color={theme === "dark" ? "#f5f5f5" : "#000"} />
        </ReactFlow>
    );
};

export default WorkFlowCanvas;
