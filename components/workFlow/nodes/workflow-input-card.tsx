"use client";

import Slack from "@/components/layout/slack";
import { NodeType, NodeTypes } from "@/lib/types";
import useInputText from "@/providers/input-text-provider";
import { Handle, Position } from "@xyflow/react";
import React, { ChangeEvent, useEffect, useState, useTransition } from "react";
import "@xyflow/react/dist/style.css";
import useCanvas from "@/providers/canvas-provider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, X, XCircleIcon } from "lucide-react";
import Title from "@/components/typeography/title";
import Text from "@/components/typeography/text";
import { prisma } from "@/prisma";
import { toast } from "sonner";
import { deleteNodeFromWorkflow, savePromptOfNode } from "@/actions/workflows";
import { useRouter } from "next/navigation";

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

    const [savingPrompt, startSavePrompt] = useTransition();
    const [deletingNode, startDeletNode] = useTransition();
    const [inputText, setInputText] = useState<string>(data.prompt ?? "");
    const { refresh } = useRouter();

    const handleChanges = (event: ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    };

    const onClick = () => {
        startSavePrompt(async () => {
            const statusCode = await savePromptOfNode(id, inputText);
            statusCode === 200 ? toast.success("Prompt Successfully Saved!") : toast.error("Faild To Fetch!");
        });
        setEdgeData(id, inputText);
    };

    const removeNodeFromCanvas = (nodeId: string) => {
        startDeletNode(async () => {
            try {
                const statusCode = await deleteNodeFromWorkflow(nodeId);
                if (statusCode === 200) {
                    toast.success("Node Was Deleted!", { description: "Please Refresh Page!" });
                    refresh();
                } else {
                    toast.error("Faild to Fetch");
                }
            } catch (err) {
                console.log(err);
                toast.error("Faild to Fetch");
            }
        });
    };

    return (
        <div className="rounded-md p-2 shadow-2 bg-background border-2 border-foreground relative">
            <Slack dir="col" gap={15} justify="center" align="start" className="w-full max-w-[350px] overflow-hidden">
                {deletingNode && (
                    <Slack className="w-full h-full bg-secondary absolute left-0 top-0 z-50">
                        <Loader2 className="animate-spin" />
                    </Slack>
                )}

                <Slack dir="col" gap={3} align="start" className="">
                    <Title level={5}>{data.title}</Title>
                    <Text className="capitalize text-sm font-500">
                        Please provide a prompt describing what you'd like to do
                    </Text>{" "}
                </Slack>
                <Slack dir="col" align="start" gap={3} className="w-full">
                    <Input onChange={handleChanges} value={inputText} className="rounded-sm" maxLength={450} />
                    <Button
                        className="bg-foreground !text-background hover:bg-secondary-foreground hover:border-secondary-foreground hover:shadow-secondary-foreground"
                        disabled={data.prompt === inputText || !inputText}
                        onClick={onClick}
                    >
                        {savingPrompt ? <Loader2 className="animate-spin" /> : "Save Prompt"}
                    </Button>
                </Slack>
                <div className="absolute top-2 right-2">
                    <XCircleIcon size={18} onClick={() => removeNodeFromCanvas(id)} />
                </div>
            </Slack>
            <Handle
                position={Position.Top}
                type="target"
                style={{
                    top: -12,
                    width: "12px",
                    height: "12px",
                    background: "#fff",
                    boxShadow: "1px 1px 0 1px #000",
                }}
            />
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

export default WorkflowInputCard;
