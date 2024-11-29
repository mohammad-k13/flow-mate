import { EdgeType, NodeType, NodeTypes } from "@/lib/types";

import { Handle, Position } from "@xyflow/react";
import React, { useEffect, useMemo, useState } from "react";
import Text from "@/components/typeography/text";
import Title from "@/components/typeography/title";
import Slack from "@/components/layout/slack";
import useCanvas from "@/providers/canvas-provider";

const WorkflowTriggerCard = ({ data, id, type }: { data: NodeType["data"]; id: string; type: NodeTypes }) => {
    const { edges, getEdgeData } = useCanvas();

    useEffect(() => {
        console.log(edges);
    }, [edges]);

    return (
        <div className="rounded-md p-2 shadow-2 bg-white border-2 border-black w-fit">
            <Slack dir="col" gap={2} align="start">
                <Title level={5}>{data.title}</Title>
                <Text>{data.description}</Text>
            </Slack>
            <Handle
                position={Position.Bottom}
                type="source"
                style={{
                    bottom: -12,
                    width: "12px",
                    height: "12px",
                    background: "#fff",
                    boxShadow: "1px 1px 0 1px #000",
                }}
            />
        </div>
    );
};

export default WorkflowTriggerCard;
