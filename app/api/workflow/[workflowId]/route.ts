import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export const GET = async (req: Request, { params }: { params: any }) => {
  const { workflowId } = await params;

  try {
    const workflow = await prisma.workflow.findUnique({
        where: { id: workflowId },
        include: {
          edges: { include: { sourceNode: true, targetNode: true } },
          nodes: { include: { data: true } },
        },
      });

    return NextResponse.json({workflow})
  } catch(err) {
    console.log(err);
    return NextResponse.json({message: "Internal server error"}, {status: 500})
  }
};
