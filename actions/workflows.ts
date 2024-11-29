"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { v4 } from "uuid";

//command
export const createWorkflow = async ({ name, description }: { name: string; description: string }) => {
    const session = await auth();
    try {
        await prisma.workflow.create({
            data: {
                name,
                description,
                userId: session?.userId,
                nodes: {
                    create: {
                        id: v4(),
                        data: {
                            create: {
                                description: "Trigger Your workflow using FlowMate Discord Bot",
                                title: "discord",
                            },
                        },
                        positionX: 150,
                        positionY: 150,
                        type: "discord",
                    },
                },
            },
        });
        return 200;
    } catch (err) {
        console.log(err);
        return 500;
    }
};

export const deleteWorkflow = async (workflowId: string) => {
    try {
        if (!workflowId) return 500;
        await prisma.workflow.delete({ where: { id: workflowId } });
        return 200;
    } catch (err) {
        console.log(err);
        return 500;
    }
};

export const editWorkflow = async (workflowId: string, payload: { name: string; description: string }) => {
    if (!workflowId) return 403;

    try {
        const { name, description } = payload;
        await prisma.workflow.update({
            where: { id: workflowId },
            data: {
                name,
                description,
            },
        });
        return 200;
    } catch (err) {
        console.log(err);
        return 500;
    }
};

export const deleteNodeFromWorkflow = async (nodeId: string) => {
    if (!nodeId) return 403;
    console.log(nodeId);

    try {
        await prisma.nodeData.deleteMany({
            where: { nodeId },
        });
        await prisma.edge.deleteMany({
            where: {
                OR: [{ sourceNodeId: nodeId }, { targetNodeId: nodeId }],
            },
        });
        await prisma.node.delete({
            where: { id: nodeId },
        });
        return 200;
    } catch (err) {
        console.log(err);
        return 500;
    }
};

export const savePromptOfNode = async (nodeId: string, prompt: string) => {
    if (!nodeId || !prompt) return 409;

    try {
        await prisma.node.update({
            where: {
                id: nodeId,
            },
            data: {
                prompt,
            },
        });
        return 200;
    } catch (err) {
        console.log(err);
        return 500;
    }
};


//queries
export const getAllWorkflows = async () => {
    try {
        return await prisma.workflow.findMany({ include: { nodes: true } });
    } catch (err) {
        console.log(err);
    }
};

export const getWorkflowDataById = async (workflowId: string) => {
    if (!workflowId) return 403;

    try {
        const workflowData = await prisma.workflow.findUnique({
            where: { id: workflowId },
            include: {
                edges: {
                    include: {
                        sourceNode: true,
                        targetNode: true,
                    },
                },
                nodes: {
                    select: {
                        id: true,
                        prompt: true,
                        data: {
                            select: {
                                title: true,
                                description: true,
                            },
                        },
                        positionX: true,
                        positionY: true,
                        type: true,
                    },
                },
            },
        });

        return workflowData;
    } catch (err) {
        console.log(err);
        return 500;
    }
};
