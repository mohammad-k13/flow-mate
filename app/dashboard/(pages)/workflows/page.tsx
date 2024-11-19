"use client";

import Slack from "@/components/layout/slack";
import { prisma } from "@/prisma";
import React, { useEffect, useState, useTransition } from "react";
import CreateWorkflow from "./_components/create-workflow";
import WorkFlowCard from "./_components/workflow-card";
import Title from "@/components/typeography/title";
import Text from "@/components/typeography/text";
import { Workflow } from "@prisma/client";
import { getAllWorkflows } from "./_actions";
import { Skeleton } from "@/components/ui/skeleton";
import WorkflowCardLoader from "./_components/workflow-loader";

type WorkflowWithNode = {
    createdAt: Date;
    description: string;
    id: string;
    name: string;
    nodes: any[]
};

const WorkflowPage = () => {
    const [pending, startTransition] = useTransition();
    const [workflows, setWorkflows] = useState<WorkflowWithNode[]>([]);
    const [updateWorkflows, setUpdateWorkflows] = useState<boolean>(false);

    useEffect(() => {
        startTransition(async () => {
            const workflows_prisma = (await getAllWorkflows());
            setWorkflows(workflows_prisma as WorkflowWithNode[]);
        });
    }, [updateWorkflows]);
    return (
        <section className="w-full h-full">
            <header className="w-full px-2 h-16">
                <Slack className="w-full" justify="between">
                    <Title level={2}>My Workflows</Title>
                </Slack>
            </header>
            <CreateWorkflow setUpdateWorkflows={setUpdateWorkflows} />

            {pending && (
                <Slack wrap="wrap" className="p-2 overflow-y-auto" justify="start" align="start" gap={25}>
                    <WorkflowCardLoader />
                    <WorkflowCardLoader />
                    <WorkflowCardLoader />
                </Slack>
            )}

            {!workflows ||
                (!workflows.length && !pending && (
                    <Slack className="h-full" dir="col" justify="around" gap={5}>
                        <div className="text-center">
                            <Title level={2}>No Workflow Added!</Title>
                            <Text>No workflows have been created yet. Please add a new workflow to get started.</Text>
                        </div>
                        <div></div>
                    </Slack>
                ))}
            {!pending && workflows.length && (
                <Slack wrap="wrap" className="p-2 overflow-y-auto" justify="start" align="start" gap={25}>
                    {workflows.map(({ createdAt, description, id, name, nodes }) => (
                        <WorkFlowCard
                            key={id}
                            createdAt={createdAt}
                            description={description ?? ""}
                            id={id}
                            name={name}
                            nodes={nodes}
                            setUpdateWorkflows={setUpdateWorkflows}
                        />
                    ))}
                </Slack>
            )}
        </section>
    );
};
export default WorkflowPage;
