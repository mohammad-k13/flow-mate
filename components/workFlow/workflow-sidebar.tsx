"use client";

import React, { useEffect, useState, useTransition, type DragEvent } from "react";
import Slack from "../layout/slack";
import Title from "../typeography/title";
import Text from "../typeography/text";
import { NodeType, NodeTypes } from "@/lib/types";
import { sidebarNodes } from "@/constance";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import { getAllIntegrations } from "@/actions/my-integration";
import { IntegrationType } from "@/app/dashboard/(pages)/my-integration/page";
import { SidebarProvider } from "../ui/sidebar";
import { Skeleton } from "../ui/skeleton";
import { v4 } from "uuid";
import useCanvas from "@/providers/canvas-provider";

const WorkFlowSidebar = () => {
    const session = useSession();

    const [pending, startTransition] = useTransition();
    const [integrations, setIntegrations] = useState<IntegrationType[]>([]);

    const { setNodes } = useCanvas();

    const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: string) => {
        console.log(nodeType);
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.dropEffect = "move";
    };

    const addCardToCanvas = (title: string, description: string, type: NodeTypes) => {
        const newNode: NodeType = {
            id: v4(),
            position: {
                x: 150,
                y: 150,
            },
            data: {
                title,
                description,
            },
            type,
        };
        setNodes((pv) => [...pv, newNode]);
    };

    useEffect(() => {
        startTransition(async () => {
            if (session.data?.userId) {
                const userIntegration = (await getAllIntegrations(session.data.userId)) as IntegrationType[];
                setIntegrations(userIntegration);
            }
        });
    }, [session.status]);

    return (
        <Slack dir="col" gap={22} className="py-5 w-full h-full overflow-y-auto" justify="start">
            <Slack gap={5} align="center" justify="center" className="h-fit w-full" dir="col">
                <Title level={2}>Your Cards</Title>
                <Text>This is a Description for Each Card</Text>
            </Slack>

            <div className="w-[80%] h-[3px] bg-black"></div>

            <Slack className="w-full h-[80%]" dir="col" justify="start" gap={18}>
                {pending && (
                    <>
                        {" "}
                        <Skeleton className="w-[80%] min-w-[200px] max-md:w-full h-[150px]" />{" "}
                        <Skeleton className="w-[80%] min-w-[200px] max-md:w-full h-[150px]" />{" "}
                        <Skeleton className="w-[80%] min-w-[200px] max-md:w-full h-[150px]" />
                    </>
                )}
                {!pending &&
                    integrations
                        .filter((item) => item.provider !== "discord")
                        .map((item) => (
                            <Slack
                                key={item.id}
                                dir="col"
                                align="start"
                                draggable
                                className="w-[80%] min-w-[200px] max-md:w-full h-fit p-3 shadow-border-3 cursor-grab bg-background"
                                onDragStart={(event) => onDragStart(event, item.provider)}
                            >
                                <Title level={5} className="capitalize">
                                    {item.provider}
                                </Title>
                                <Text className="capitalize">
                                    {
                                        sidebarNodes.find((node) => node.type.toLowerCase() === item.provider)?.data
                                            .description
                                    }
                                </Text>
                                <div className="w-full h-[1px] bg-foreground my-3" />
                                <Slack align="center" gap={15}>
                                    <button
                                        className="bg-foreground text-background p-2 rounded-md hover:bg-foreground/90 transition-colors"
                                        onClick={() => {
                                            addCardToCanvas(
                                                item.provider,
                                                sidebarNodes.find((node) => node.type.toLowerCase() === item.provider)
                                                    ?.data.description ?? "",
                                                item.provider
                                            );
                                        }}
                                    >
                                        Add To Canvas
                                    </button>
                                    <div className="w-[1px] bg-foreground h-3/4 "></div>
                                    <Text className="text-sm font-300">Grab Card and drag into worflow</Text>
                                </Slack>
                            </Slack>
                        ))}
            </Slack>
        </Slack>
    );
};

export default WorkFlowSidebar;
