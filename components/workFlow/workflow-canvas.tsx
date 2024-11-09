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
import useCanvas from "@/store/useCanvas";
import { Params } from "next/dist/server/request/params";

const initialNodes: NodeType[] = [];
const initialEdges: EdgeType[] = [];

const WorkFlowCanvas = () => {
  const { addNode, addEdges } = useCanvas();
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance>();

  //trigger: When a edge created
  const onConnect = useCallback(
    (params: Edge | Connection) => {
      const source = nodes.find((node) => node.id === params.source);
      const target = nodes.find((node) => node.id === params.target);

      if (source && target) {
        const edge_type = `${source.type}-${target.type}` as EdgeTypes;

        const newEdgePrams: EdgeType = {
          id: v4(),
          source: source.id,
          target: target.id,
          data: {
            currentText: "",
          },
          type: edge_type,
        };

        setEdges((eds) => {
          return createEdge(newEdgePrams, eds);
        });
      }
    },
    [nodes.length]
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

    const newNode: NodeType = {
      id: v4(),
      position,
      data: {
        title: "Drag",
        description: "This is from drag",
      },
      type,
    };

    setNodes((nds) => [...nds, newNode]);
  };

  const onDragOver = useCallback((event: any) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const nodeTypes = useMemo(
    () => ({
      feild: WorkflowInputCard,
      text: WorkflowTextCard,
    }),
    []
  );

  const edgeTypes = useMemo(
    () => ({
      "input-text": InputTextEdge,
    }),
    []
  );

  useEffect(() => {
    addNode(nodes);
    addEdges(edges as EdgeType[]);
  }, [nodes, edges]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      onDrop={onDrop}
      onDragOver={onDragOver}
      onInit={setReactFlowInstance as any}
      // fitView
    >
      <Background offset={3} color="#000" />
    </ReactFlow>
  );
};

export default WorkFlowCanvas;
