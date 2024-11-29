"use client";

import Slack from "@/components/layout/slack";
import Title from "@/components/typeography/title";
import React, { useEffect, useState, useTransition } from "react";
import { disconnectApp, getAllIntegrations } from "@/actions/my-integration";
import IntegrateAppCard from "@/components/routes/(dashboard)/my-integration/integrate-app-card";
import { IntegrateAppCardType } from "@/lib/types";
import { Skeleton } from "@/components/ui/skeleton";
import IntegrateAppCardLoader from "@/components/routes/(dashboard)/my-integration/integrate-app-card-loader";
import { IntegrateAppLinks } from "@/constance";
import { LiteralUnion, signIn, useSession } from "next-auth/react";
import { auth } from "@/auth";

export type IntegrationType = {
    id: number;
    provider: IntegrateAppCardType;
    expiresAt: Date;
    user: { email: string };
};

const MyIntegration = () => {
    const session = useSession();

    const [pending, startGettingIntegrations] = useTransition();
    const [disconnecting, startDisconnetc] = useTransition();
    const [integration, setIntegrations] = useState<IntegrationType[]>([]);
    const [updateData, setUpdateDate] = useState<boolean>(false);

    const connectAppHandler = (label: IntegrateAppCardType) => {
        if (label === "discord") {
            window.open(process.env.DISCORD_BOT_URL as string)
        } else {
            signIn(label.toLowerCase(), { redirectTo: "/dashboard/my-integration" });
        }
    };

    const disconnectAppHandler = (providerId: number) => {
        startDisconnetc(async () => {
            const statusCode = await disconnectApp(providerId);
            if (statusCode === 200) setUpdateDate((pv) => !pv);
        });
    };

    useEffect(() => {
        startGettingIntegrations(async () => {
            if (session.data?.user) {
                const integration_prisma = (await getAllIntegrations(session.data.userId)) as IntegrationType[];
                setIntegrations(integration_prisma);
            }
        });
    }, [updateData, session.status]);

    return (
        <section className="w-full h-full">
            <header className="w-full px-2 h-16">
                <Slack className="w-full" justify="between">
                    <Title level={2}>My Intergration Apps</Title>
                </Slack>
            </header>
            <main className="w-full h-full">
                <Slack dir="col" justify="start" className="h-full w-full" gap={25}>
                    <Slack dir="col" align="start" className="w-full" gap={18}>
                        {pending ? (
                            <Skeleton className="h-[36px] w-[230px] rounded-sm" />
                        ) : (
                            <Title level={4}>My Integration</Title>
                        )}
                        <Slack align="start" gap={8}>
                            {pending && <IntegrateAppCardLoader />}
                            {!pending &&
                                integration.map((item) => (
                                    <IntegrateAppCard
                                        key={item.id}
                                        provider_id={item.id}
                                        type={item.provider}
                                        status="disconnect"
                                        expiresAt={item.expiresAt}
                                        imagePath={"/icons/" + item.provider + ".svg"}
                                        pendingState={disconnecting}
                                        onClick={disconnectAppHandler}
                                    />
                                ))}
                        </Slack>
                    </Slack>
                    <div className="w-[80%] bg-secondary h-[1px]"></div>
                    <Slack dir="col" align="start" className="w-full" gap={18}>
                        <Title level={4}>Integration Apps</Title>

                        <Slack align="start" gap={8}>
                            {IntegrateAppLinks.map((item) => (
                                <IntegrateAppCard
                                    key={item.label}
                                    type={item.label as IntegrateAppCardType}
                                    status="connect"
                                    imagePath={"/icons/" + item.label + ".svg"}
                                    onClick={connectAppHandler}
                                />
                            ))}
                        </Slack>
                    </Slack>
                </Slack>
            </main>
        </section>
    );
};

export default MyIntegration;
