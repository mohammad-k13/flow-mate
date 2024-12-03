"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { v4 } from "uuid";
import { NodeTypes, EdgeTypes, NodeType, EdgeType } from "@/lib/types";

//command
export const createWorkflow = async ({ name, description }: { name: string; description: string }) => {
    const session = await auth();
    try {
        await prisma.workflow.create({
            data: {
                name,
                description,
                userId: session!.userId,
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

export const saveWorkflowChanges = async ({
    edges,
    nodes,
    workflowId,
}: {
    nodes: NodeType[];
    edges: EdgeType[];
    workflowId: string;
}) => {
    if (!workflowId) {
        return 403;
    }

    try {
        const workflow = await prisma.workflow.findUnique({
            where: { id: workflowId },
        });

        if (!workflow) {
            return 404;
        }

        // Step 2: Handle Nodes Creation/Update (only if nodes are provided)
        if (nodes && nodes.length > 0) {
            const nodePromises = nodes.map(async (node: any) => {
                if (!node.id) return null; // Ensure node has an ID

                return prisma.node.upsert({
                    where: { id: node.id },
                    update: {
                        type: node.type ?? "default",
                        positionX: node.position?.x ?? 0,
                        positionY: node.position?.y ?? 0,
                        data: {
                            update: {
                                title: node.data?.title ?? "",
                                description: node.data?.description ?? "",
                            },
                        },
                    },
                    create: {
                        id: node.id,
                        type: node.type ?? "default",
                        positionX: node.position?.x ?? 0,
                        positionY: node.position?.y ?? 0,
                        workflowId: workflowId,
                        data: {
                            create: {
                                title: node.data?.title ?? "",
                                description: node.data?.description ?? "",
                            },
                        },
                    },
                    include: { data: true },
                });
            });

            await Promise.all(nodePromises);
        }

        // Step 3: Handle Edges Creation/Update (only if edges are provided)
        if (edges && edges.length > 0) {
            const edgePromises = edges.map(async (edge: any) => {
                if (!edge.id || !edge.source || !edge.target) return null; // Ensure edge has required fields

                return prisma.edge.upsert({
                    where: { id: edge.id },
                    update: {
                        sourceNodeId: edge.source,
                        targetNodeId: edge.target,
                        data: edge.data ?? {},
                    },
                    create: {
                        id: edge.id,
                        sourceNodeId: edge.source,
                        targetNodeId: edge.target,
                        workflowId: workflowId,
                        data: edge.data ?? {},
                        type: edge.type,
                    },
                });
            });

            await Promise.all(edgePromises);
        }

        // Step 4: Fetch and Return the Updated Workflow
        const updatedWorkflow = await prisma.workflow.findUnique({
            where: { id: workflowId },
            include: {
                nodes: { include: { data: true } },
                edges: true,
            },
        });

        return 200;
    } catch (err: any) {
        console.error("Error:", err);
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
