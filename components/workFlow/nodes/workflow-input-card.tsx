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
import { X, XCircleIcon } from "lucide-react";

/*
{
    "id": "e18d8574-5539-4692-8a18-ddefb706aff4",
    "data": {
        "title": "Github",
        "description": "Use GitHub actions and events as triggers."
    },
    "type": "github",
    "positionAbsoluteX": 150,
    "positionAbsoluteY": 195,
    "selectable": true,
    "draggable": true,
    "deletable": true,
    "isConnectable": true,
    "dragging": false,
    "zIndex": 0,
    "width": 0,
    "height": 0
}
    */

const WorkflowInputCard = ({ data, id, type }: { data: NodeType["data"]; id: string; type: NodeTypes }) => {
    const { edges, setEdgeData, generateGPTResponse } = useCanvas();
    const [inputText, setInputText] = useState<string>("");

    const handleChanges = (event: ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    };

    const onClick = async () => {
        await generateGPTResponse(inputText);
        setEdgeData(id, inputText);
    };

    const removeNodeFromCanvas = (nodeId: string) => {};

    return (
        <div className="rounded-md p-2 shadow-2 bg-background border-2 border-foreground relative">
            <Slack dir="col" gap={5}>
                {data.title}
                <Input onChange={handleChanges} value={inputText} />
                <Button
                    className="bg-foreground !text-background hover:bg-secondary-foreground hover:border-secondary-foreground hover:shadow-secondary-foreground"
                    onClick={onClick}
                >
                    Create
                </Button>
                <div className="absolute top-2 right-2">
                    <XCircleIcon size={18} onClick={() => removeNodeFromCanvas(id)} />
                </div>
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
            {type !== "discord" && (
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
            )}
        </div>
    );
};

export default WorkflowInputCard;
