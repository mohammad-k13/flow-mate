"use client";

import Slack from "@/components/layout/slack";
import Title from "@/components/typeography/title";
import React, { useEffect, useState, useTransition } from "react";
import { getAllIntegrations } from "./_action";

type IntegrationType = {
    provider: string;
    expiresAt: Date;
    user: { email: string };
};

const MyIntegration = () => {
    const [pending, startGettingIntegrations] = useTransition();
    const [integration, setIntegrations] = useState<IntegrationType[]>([]);

    useEffect(() => {
        startGettingIntegrations(async () => {
            const integration_prisma = await getAllIntegrations() as IntegrationType[];
            setIntegrations(integration_prisma)
        })
    }, [])

    return (
        <section className="w-full h-full">
            <header className="w-full px-2 h-16">
                <Slack className="w-full" justify="between">
                    <Title level={2}>My Intergration Apps</Title>
                </Slack>
            </header>
            <main>
                {/* task: Showing All integration App as Card */}
            </main>
        </section>
    );
};

export default MyIntegration;
