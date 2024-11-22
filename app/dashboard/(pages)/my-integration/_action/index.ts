"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma";

//session
export const createSession = async (sessionToken: string, userId: string) => {
    if (!sessionToken || !userId) return 403;

    const expires = new Date();
    expires.setHours(expires.getHours() + 24 * 10);
    try {
        await prisma.session.upsert({
            where: { userId },
            update: { expires },
            create: {
                sessionToken,
                expires,
                userId,
            },
        });
    } catch (err: any) {
        console.log(err.message);
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
        return 409;
    }
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24 * 10);

    try {
        await prisma.oAuthToken.upsert({
            where: {
                userId_provider: { userId, provider },
            },
            update: {
                accessToken,
                refreshToken: refreshToken ?? "",
                expiresAt,
            },
            create: {
                userId,
                provider,
                accessToken,
                refreshToken: refreshToken ?? "",
                expiresAt,
            },
        });
    } catch (err) {
        console.log(err);
        return 500;
    }
};

export const disconnectApp = async (providerId?: number) => {
    if (!providerId) return 409;

    try {
        await prisma.oAuthToken.delete({ where: { id: Number(providerId) } });
        return 200;
    } catch (err) {
        console.log(err);
        return 500;
    }
};

//queries
export const getAllIntegrations = async (userId: string) => {
    if(!userId) return 409
    try {
        const result = await prisma.oAuthToken.findMany({
            where: {
                userId,
            },
            select: { id: true, provider: true, expiresAt: true, user: { select: { email: true } } },
        });
        return result;
    } catch (err) {
        console.log(err);
        return 500;
    }
};
