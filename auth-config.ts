import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Discord from "next-auth/providers/discord";
import credentials from "next-auth/providers/credentials";
import { NextAuthConfig } from "next-auth";
import { loginForm } from "./lib/form-schema";
import { prisma } from "./prisma";
import { compare } from "bcryptjs";
import { JWT } from "next-auth/jwt";
import { IAccessTokensType } from "./lib/types";
import { createSession, storeAccessToken } from "@/actions/my-integration";

declare module "next-auth" {
    interface Session extends IAccessTokensType {
        userId: string
    }
}

declare module "next-auth/jwt" {
    interface JWT extends IAccessTokensType {
        sessionToken: string;
    }
}

export default {
    providers: [
        GitHub({
            clientId: process.env.AUTH_GITHUB_ID,
            clientSecret: process.env.AUTH_GITHUB_SECRET,
        }),
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
        Discord({
            clientId: process.env.AUTH_DISCORD_ID,
            clientSecret: process.env.AUTH_DISCORD_SECRET,
        }),
        credentials({
            credentials: {
                email: { label: "email" },
                password: { label: "password", type: "password" },
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

    callbacks: {
        async jwt({ token, account }) {
            if (token && account) {
                token.sessionToken = token.sessionToken ?? `${account.provider}-${token.sub}-${new Date().getTime()}`;

                if (token.sessionToken && token.sub) {
                    const statusCode = await createSession(token.sessionToken, token.sub);
                    console.log(statusCode);
                }
                // store provider accessToken
                if (account.access_token) {
                    const statusCode = await storeAccessToken(
                        token.sub ?? "",
                        account.provider,
                        account.access_token,
                        account.refresh_token
                    );
                }
            }
            return token;
        },
        async session({ session, token }) {
            session.userId = token.sub!;
            return session;
        },
    },
} satisfies NextAuthConfig;
