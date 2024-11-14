import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import { hash } from "bcryptjs";
import { prisma } from "@/prisma";
//task: create an account too
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const profilePicture = formData.get("profilePicture") as File;

    let imagePath = null;

    const isUserExit = await prisma.user.findFirst({ where: { email } });
    if (isUserExit)
      return NextResponse.json({ message: "Email Is Taken" }, { status: 409 });
    // if (profilePicture && profilePicture.arrayBuffer) {
    //   const fileExtension = profilePicture.name.split(".").pop();
    //   const fileName = `${uuidv4()}.${fileExtension}`;
    //   const uploadDir = path.join(process.cwd(), "public/uploads");

    //   if (!existsSync(uploadDir)) {
    //     mkdirSync(uploadDir, { recursive: true });
    //   }

    //   const buffer = Buffer.from(await profilePicture.arrayBuffer());

    //   const filePath = path.join(uploadDir, fileName);
    //   writeFileSync(filePath, buffer);

    //   imagePath = `/uploads/${fileName}`;
    // }

    const hashedPa = await hash(password, Number(process.env.SALT));

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPa,
      },
    });

    return NextResponse.json({ message: "user created" });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: "Faild to Fetch", error },
      { status: 500 }
    );
  }
}
