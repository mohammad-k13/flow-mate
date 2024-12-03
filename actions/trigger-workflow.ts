"use server";

import { prisma } from "@/prisma";
// import { fetchChatGPTResponse } from "@/lib/chat-gpt";

type Node = {
    id: string;
    prompt: string | null;
};

type Edge = {
    id: string;
    sourceNodeId: string;
    targetNodeId: string;
    data: any;
};

const triggerWorkflow = async (workflowId: string) => {
    try {
        const workflow = await prisma.workflow.findUnique({
            where: { id: workflowId },
            include: {
                nodes: { select: { id: true, prompt: true } },
                edges: { select: { id: true, sourceNodeId: true, targetNodeId: true, data: true, type: true } },
            },
        });

        if (!workflow) {
            console.log("Workflow not found");
            return;
        }

        const { nodes, edges } = workflow;

        const nodeMap = new Map<string, Node>(nodes.map((node) => [node.id, node]));
        const edgeMap = new Map<string, Edge[]>();
        for (const edge of edges) {
            if (!edgeMap.has(edge.sourceNodeId)) {
                edgeMap.set(edge.sourceNodeId, []);
            }
            edgeMap.get(edge.sourceNodeId)!.push(edge);
        }

        const starterEdges = edges.filter((edge) => edge.type.startsWith("discord"));
        for (const starterEdge of starterEdges) {
            await processNode(starterEdge.targetNodeId, null, nodeMap, edgeMap); // for starterEdges input will be null
        }
    } catch (err) {
        console.error(err);
    }
};

const processNode = async (nodeId: string, input: any, nodeMap: Map<any, any>, edgeMap: Map<any, any>) => {
    console.log("--------------");
    const node = nodeMap.get(nodeId);
    if (!node) {
        console.log(`Node ${nodeId} not found`);
        return;
    }

    console.log(`Processing Node: ${nodeId}`);
    console.log(`Prompt: ${node.prompt}`);
    console.log(`Input: ${input}`);

    //     const response = await fetchChatGPTResponse(node.prompt, input);
    const response = "";

    console.log(`ChatGPT Response: ${response}`);

    const connectedEdges = edgeMap.get(nodeId) || [];
    for (const edge of connectedEdges) {
        console.log(`Passing data to edge ${edge.id}`);
        await processNode(edge.targetNodeId, response, nodeMap, edgeMap);
    }
};

export default triggerWorkflow;
