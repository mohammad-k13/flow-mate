import { prisma } from "@/prisma";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { name, description, email } = await req.json();

  if (!name || !description || !email)
    return NextResponse.json(
      { message: "All Feild Required" },
      { status: 409 }
    );

  try {
    const user = await prisma.user.findFirst({where: {email}});
    if(!user) return NextResponse.json({message: "User does Not Exist"}, {status: 302})

    const workflow = await prisma.workflow.create({
      data: {
        name,
        description,
        userId: user.id,
      },
    });
    console.log(workflow)

    return NextResponse.json({ message: "Workflow created Sucessfully", workflow});
  } catch (err) {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
