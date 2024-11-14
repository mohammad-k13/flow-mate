import GitHub from "next-auth/providers/github";
import credentials from "next-auth/providers/credentials";
import { NextAuthConfig } from "next-auth";
import { loginForm } from "./lib/form-schema";
import { prisma } from "./prisma";
import { compare } from "bcryptjs";


export default {
  providers: [
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    credentials({
      credentials: {
        email: { label: "email" },
        passowrd: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        const validatedData = loginForm.safeParse(credentials);

        if (validatedData.success) {
          const { email, password } = validatedData.data;

          try {
            const user = await prisma.user.findFirst({ where: { email } });
            if (!user) return null;

            const passwordMatch = await compare(password, user.password!);

            return passwordMatch ? user : null;
          } catch (err) {
            return null;
          }
        }
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
