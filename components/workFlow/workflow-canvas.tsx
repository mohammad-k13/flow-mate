"use client";

import {
  addEdge as createEdge,
  Background,
  ReactFlow,
  ReactFlowInstance,
  useEdgesState,
  useNodesState,
  Connection,
  NodeChange,
  EdgeChange,
  Node,
  Edge,
} from "@xyflow/react";
import React, { DragEvent, useCallback, useMemo, useState } from "react";
import WorkflowTextCard from "./nodes/workflow-text-card";
import { EdgeType, NodeType, NodeTypes, EdgeTypes } from "@/lib/types";
import InputTextEdge from "./edges/input-text-edge";
import { v4 } from "uuid";
import useCanvas from "@/providers/canvas-provider";
import { sidebarNodes } from "@/constance";
import "@xyflow/react/dist/style.css";
import WorkflowInputCard from "./nodes/workflow-input-card";

const WorkFlowCanvas = () => {
  const { addEdge, addNode, edges, nodes } = useCanvas();
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);
  const [currentNodes, setNodes, onNodesChange] =
    useNodesState<NodeType>(nodes);
  const [currentEdges, setEdges, onEdgesChange] =
    useEdgesState<EdgeType>(edges);

  //trigger: When an edge is created
  const onConnect = useCallback(
    (params: Connection) => {
      const source = nodes.find((node) => node.id === params.source);
      const target = nodes.find((node) => node.id === params.target);

      if (source && target) {
        const edgeType = `${source.type}-${target.type}` as EdgeTypes;

        const newEdge: EdgeType = {
          id: v4(),
          source: source.id,
          target: target.id,
          data: null,
          type: edgeType,
        };

        addEdge(newEdge);
        setEdges((prevEdges) => [...prevEdges, newEdge]);
      }
    },
    [nodes, addEdge, setEdges]
  );

  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const type = event.dataTransfer.getData(
      "application/reactflow"
    ) as NodeTypes;

    if (!reactFlowInstance) return;
    const position = reactFlowInstance.screenToFlowPosition({
      x: event.clientX,
      y: event.clientY,
    });

    const cardInfo = sidebarNodes.find((node) => node.type === type);

    const newNode: NodeType = {
      id: v4(),
      position,
      data: {
        title: cardInfo?.data.title || "Untitled",
        description: cardInfo?.data.description || "",
      },
      type,
    };

    addNode(newNode);
    setNodes((prevNodes) => [...prevNodes, newNode]);
  };

  const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const nodeTypes = useMemo(
    () => ({
      Email: WorkflowInputCard,
      Discord: WorkflowTextCard,
      "Google Drive": WorkflowTextCard,
      Instagram: WorkflowTextCard,
    }),
    []
  );

  const edgeTypes = useMemo(
    () => ({
      "input-text": InputTextEdge,
    }),
    []
  );

  return (
    <ReactFlow
      nodes={currentNodes}
      edges={currentEdges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onInit={setReactFlowInstance as any}
      fitView
    >
      <Background offset={3} color="#000" />
    </ReactFlow>
  );
};

export default WorkFlowCanvas;
