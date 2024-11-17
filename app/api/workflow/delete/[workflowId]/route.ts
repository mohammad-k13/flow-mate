import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export const DELETE = async (
  req: Request,
  { params }: { params: any }
) => {
  const { workflowId } = params;

  if (!workflowId) {
    return NextResponse.json(
      { message: "All Fields Required" },
      { status: 409 }
    );
  }

  try {
    await prisma.workflow.delete({ where: { id: workflowId } });

    return NextResponse.json({ message: "Workflow deleted Successfully" });
  } catch (err) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};