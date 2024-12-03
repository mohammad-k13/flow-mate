import triggerWorkflow from "@/actions/trigger-workflow";
import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    const { workflowId } = await request.json();
    await triggerWorkflow(workflowId)

    return NextResponse.json({ workflowId });
};
