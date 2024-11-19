"use client";
import Slack from "@/components/layout/slack";
import Title from "@/components/typeography/title";
import Text from "@/components/typeography/text";
import { NodeType } from "@/lib/types";
import React, { Dispatch, SetStateAction, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, MoreVertical } from "lucide-react";

import { prisma } from "@/prisma";
import { toast } from "sonner";
import { deleteWorkflow } from "../_actions";

type Props = {
    setUpdateWorkflows: Dispatch<SetStateAction<boolean>>;
    name: string;
    description: string;
    id: string | number;
    createdAt: Date;
    nodes: NodeType[];
};

const WorkFlowCard = ({ name, description, id, createdAt, nodes, setUpdateWorkflows }: Props) => {
    const { push, refresh } = useRouter();
    const [pending, startTransition] = useTransition();
    const [opening, startOpenWorkflow] = useTransition();

    const deleteWorkflowHandler = () => {
        startTransition(async () => {
            const statusCode = await deleteWorkflow(id.toString());
            if (statusCode === 200) {
                toast.success("Workflow Deleted Successfully!");
                setUpdateWorkflows((pv) => !pv);
            } else {
                toast.error("Faild to Fetch");
            }
        });
    };
    const openWorkflowHanlder = () => {
        startOpenWorkflow(() => {
            push(`workflows/editor/${id}`);
        });
    };

    return (
        <Slack
            className="w-[98%] lg:max-w-[450px] h-[180px] shadow-border-2 px-3 py-2 relative"
            align="start"
            justify="between"
            dir="col"
        >
            {/* task: add dialog to edit workflow */}
            <div className="absolute top-2 right-2 p-1 rounded-sm cursor-pointer hover:bg-secondary transition-colors">
                <MoreVertical size={20} />
            </div>
            <Slack dir="col" align="start">
                <Title level={3}>{name}</Title>
                <Text>{description}</Text>
                <Text className="text-sm">{id}</Text>
            </Slack>

            <Slack justify="between" className="w-full max-sm:flex-col">
                <Slack className="text-sm">
                    <Text>Nodes: </Text>
                    <Text>{nodes.length}</Text>
                </Slack>
                <Slack align="end" justify="end" gap={8} className="">
                    <button
                        className="bg-destructive text-destructive-foreground rounded-md p-2 text-sm h-[36px]"
                        onClick={deleteWorkflowHandler}
                    >
                        {pending ? <Loader2 className="animate-spin" /> : "Delete Workflow"}
                    </button>
                    <button
                        className="bg-foreground text-background rounded-md p-2 text-sm h-[36px]"
                        onClick={openWorkflowHanlder}
                    >
                        {opening ? <Loader2 className="animate-spin" /> : "Open Workflow"}
                    </button>
                </Slack>
            </Slack>
        </Slack>
    );
};

export default WorkFlowCard;
