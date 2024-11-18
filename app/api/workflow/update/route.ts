import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { nodes, edges, workflowId } = await req.json();

  console.log("Nodes:", nodes);
  console.log("Edges:", edges);

  // Validate input fields
  if (!workflowId) {
    return NextResponse.json(
      { message: "Workflow ID is required" },
      { status: 409 }
    );
  }

  try {
    // Step 1: Check if the workflow exists
    const workflow = await prisma.workflow.findUnique({
      where: { id: workflowId },
    });

    if (!workflow) {
      return NextResponse.json({ message: "Workflow Not Found" }, { status: 404 });
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

    return NextResponse.json({
      message: "Workflow Successfully saved!",
      result: updatedWorkflow,
    });
  } catch (err: any) {
    console.error("Error:", err);
    return NextResponse.json(
      { message: "Internal Server Error", error: err.message },
      { status: 500 }
    );
  }
};