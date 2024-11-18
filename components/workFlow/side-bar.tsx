"use client";

import React, { type DragEvent } from "react";
import Slack from "../layout/slack";
import Title from "../typeography/title";
import Text from "../typeography/text";
import { NodeTypes } from "@/lib/types";
import { sidebarNodes } from "@/constance";
import { Button } from "../ui/button";

const WorkFlowSidebar = () => {
    const onDragStart = (event: DragEvent<HTMLDivElement>, nodeType: NodeTypes) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.dropEffect = "move";
    };

    return (
        <Slack dir="col" gap={12} className="pb-5 pt-20 w-full h-full overflow-y-auto">
            <Slack gap={5} align="center" justify="center" className="" dir="col">
                <Title level={2}>Your Cards</Title>
                <Text>This is a Description for Each Card</Text>
            </Slack>

            <div className="w-[80%] h-[3px] bg-black my-3"></div>

            <Slack className="w-full h-full" dir="col" gap={18}>
                {sidebarNodes.map((nodeInfo) => (
                    <Slack
                        key={nodeInfo.id}
                        dir="col"
                        align="start"
                        draggable
                        className="w-[80%] max-md:w-full h-[200px] p-3 shadow-border-3 cursor-grab bg-background"
                        onDragStart={(event) => onDragStart(event, nodeInfo.type)}
                    >
                        <Title level={5}>{nodeInfo.data.title}</Title>
                        <Text className="capitalize">{nodeInfo.data.description}</Text>
                        <div className="w-full h-[1px] bg-foreground my-3" />
                        <Text className="text-sm font-300">Grab Card and drag into worflow</Text>
                    </Slack>
                ))}
            </Slack>
        </Slack>
    );
};

export default WorkFlowSidebar;
