"use server";

import { prisma } from "@/prisma";

//session
export const createSession = async ({
    session,
    token,
}: {
    session: { sessionToken: string };
    token: { sub: string };
}) => {
    if (!session.sessionToken || !token.sub) return 403;

    const expires = new Date();
    expires.setHours(expires.getHours() + 24 * 10);
    try {
        await prisma.session.upsert({
            where: { sessionToken: session.sessionToken },
            update: { expires },
            create: {
                sessionToken: session.sessionToken,
                expires,
                userId: token.sub ?? "",
            },
        });
    } catch (err) {
        console.log(err);
        return 500;
    }
};

//mutation
export const storeAccessToken = async (
    userId: string,
    provider: string,
    accessToken: string,
    refreshToken?: string
) => {
    if (!userId || !provider || !accessToken) {
        return 403;
    }
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24 * 10);

    try {
        await prisma.oAuthToken.create({
            data: {
                accessToken,
                provider,
                userId,
                refreshToken: refreshToken ?? "",
                expiresAt,
            },
        });
    } catch (err) {
        console.log(err);
        return 500;
    }
};

//queries
export const getAllIntegrations = async () => {
    try {
        return await prisma.oAuthToken.findMany({
            select: { provider: true, expiresAt: true, user: { select: { email: true } } },
        });
    } catch (err) {
        console.log(err);
        return 500;
    }
};
