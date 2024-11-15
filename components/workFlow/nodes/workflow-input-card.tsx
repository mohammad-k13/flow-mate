"use client"

import Slack from "@/components/layout/slack";
import { NodeType, NodeTypes } from "@/lib/types";
import useInputText from "@/providers/input-text-provider";
import { Handle, Position } from "@xyflow/react";
import React, { ChangeEvent, useEffect, useState } from "react";
import '@xyflow/react/dist/style.css';
import useCanvas from "@/providers/canvas-provider";

const WorkflowInputCard = ({
  data,
  id,
  type,
}: {
  data: NodeType["data"];
  id: string;
  type: NodeTypes;
}) => {
  const { edges, setEdgeData } = useCanvas();
  const [inputText, setInputText] = useState<string>("");

  const handleChanges = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const onClick = () => {
    setEdgeData(id, inputText);
  };

  return (
    <div className="rounded-md p-2 shadow-2 bg-white border-2 border-black relative">
      <Slack dir="col" gap={5}>
        {data.title}
        <input
          className="border-2 border-black rounded-md font-sm font-500 p-2 focus:outline-none"
          onChange={handleChanges}
          value={inputText}
        />
        <button
          className="w-fit rounded-md p-2 bg-black text-white self-start text-xs"
          onClick={onClick}
        >
          Send
        </button>
      </Slack>
      <Handle
        position={Position.Bottom}
        type="source"
        style={{
          bottom: -10,
          width: "8px",
          height: "8px",
          background: "#fff",
          boxShadow: "1px 1px 0 1px #000",
        }}
      />
    </div>
  );
};

export default WorkflowInputCard;