import { EdgeType, NodeType, NodeTypes } from "@/lib/types";
import useCanvas from "@/store/useCanvas";
import { Handle, Position } from "@xyflow/react";
import React, { useEffect, useMemo, useState } from "react";
import Text from "@/components/typeography/text";
import Title from "@/components/typeography/title";
import Slack from "@/components/layout/slack";
import useInputText from "@/providers/input-text-provider";

const WorkflowTextCard = ({
  data,
  id,
  type,
}: {
  data: NodeType["data"];
  id: string;
  type: NodeTypes;
}) => {
  const { edges } = useCanvas();
  const { inputs, getInputText } = useInputText();

  return (
    <div className="rounded-md p-2 shadow-2 bg-white border-2 border-black w-fit">
      <Slack dir="col" gap={2} align="start">
        <Title level={5}>{data.title}</Title>
        <Text>{data.description}</Text>
        <div className="h-[1px] w-3/4 mx-auto bg-black"></div>
        <Text key={id}>{getInputText(id)}</Text>
      </Slack>
      <Handle
        position={Position.Top}
        type="target"
        style={{
          top: -10,
          width: "8px",
          height: "8px",
          background: "#fff",
          boxShadow: "1px 1px 0 1px #000",
        }}
      />
    </div>
  );
};

export default WorkflowTextCard;
