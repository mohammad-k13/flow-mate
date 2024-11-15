"use client";

import {
  addEdge as createEdge,
  Background,
  Edge,
  EdgeText,
  MarkerType,
  ReactFlow,
  ReactFlowInstance,
  useEdgesState,
  useNodesState,
  Connection,
} from "@xyflow/react";
import React, {
  DragEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import WorkflowInputCard from "./nodes/workflow-input-card";
import WorkflowTextCard from "./nodes/workflow-text-card";
import { EdgeType, NodeType, NodeTypes, EdgeTypes } from "@/lib/types";
import InputTextEdge from "./edges/input-text-edge";
import { v4 } from "uuid";
import useCanvas from "@/providers/canvas-provider";
import { sidebarNodes } from "@/constance";
import '@xyflow/react/dist/style.css';


const WorkFlowCanvas = () => {
  const { addEdge, addNode, edges, nodes } = useCanvas();
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance>();

  //trigger: When a edge created
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
      }
    },
    [nodes, addEdge]
  );
  const onDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();

    const type = event.dataTransfer.getData(
      "application/reactflow"
    ) as NodeTypes;

    //getting position
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
        title: cardInfo?.data.title!,
        description: cardInfo?.data.description!,
      },
      type,
    };

    addNode(newNode);
  };

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const nodeTypes = useMemo(
    () => ({
      Email: WorkflowTextCard,
      Discord: WorkflowTextCard,
      "Google Driver": WorkflowTextCard,
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
      nodes={nodes}
      edges={edges}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onInit={setReactFlowInstance}
      fitView
    >
      <Background offset={3} color="#000" />
    </ReactFlow>
  );
};

export default WorkFlowCanvas;
