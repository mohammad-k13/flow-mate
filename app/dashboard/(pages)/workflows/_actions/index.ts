"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma";

//command
export const createWorkflow = async ({ name, description }: { name: string; description: string }) => {
    const session = await auth();
    try {
        console.log(session);
        await prisma.workflow.create({
            data: {
                name,
                description,
                userId: session?.user?.id,
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

//queries
export const getAllWorkflows = async () => {
    try {
        return await prisma.workflow.findMany({include: {nodes: true}});
    } catch (err) {
        console.log(err);
    }
};
