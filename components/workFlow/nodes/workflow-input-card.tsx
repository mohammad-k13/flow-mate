"use client";

import Slack from "@/components/layout/slack";
import { NodeType, NodeTypes } from "@/lib/types";
import useInputText from "@/providers/input-text-provider";
import { Handle, Position } from "@xyflow/react";
import React, { ChangeEvent, useEffect, useState } from "react";
import "@xyflow/react/dist/style.css";
import useCanvas from "@/providers/canvas-provider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const WorkflowInputCard = ({
  data,
  id,
  type,
}: {
  data: NodeType["data"];
  id: string;
  type: NodeTypes;
}) => {
  const { edges, setEdgeData, generateGPTResponse } = useCanvas();
  const [inputText, setInputText] = useState<string>("");

  const handleChanges = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const onClick = async () => {
    await generateGPTResponse(inputText);
    setEdgeData(id, inputText);
  };

  return (
    <div className="rounded-md p-2 shadow-2 bg-background border-2 border-foreground relative">
      <Slack dir="col" gap={5}>
        {data.title}
        <Input onChange={handleChanges} value={inputText} />
        <Button
          onClick={onClick}
        >
          Send
        </Button>
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
