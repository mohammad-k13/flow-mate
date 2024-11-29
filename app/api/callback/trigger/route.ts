import { NextResponse } from "next/server";

export const POST = async (request: Request) => {
    console.log(request);
    const { workflowId } = await request.json();
    console.log(workflowId);

    return NextResponse.json({ workflowId });
};
