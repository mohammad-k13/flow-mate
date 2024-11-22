import Slack from "@/components/layout/slack";
import Text from "@/components/typeography/text";
import Title from "@/components/typeography/title";
import { IntegrateAppCardType } from "@/lib/types";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import React, { ReactNode } from "react";

type Props = {
    type: IntegrateAppCardType;
    status: "connect" | "disconnect";
    provider_id?: number;
    imagePath: string;
    pendingState?: boolean;
    expiresAt?: Date;
    onClick: (item: any) => void;
};
const IntegrateAppCard = ({ imagePath, status, type, pendingState, provider_id, expiresAt, onClick }: Props) => {
    return (
        <article className="shadow-border-1 w-[200px] h-[250px]">
            <Slack dir="col" className="h-full" justify="around">
                <Slack dir="col" gap={2}>
                    <Image src={imagePath} width={32} height={32} alt={`${type}-logo`} />
                    <Title level={4} className="capitalize">
                        {type}
                    </Title>
                    <Text className="text-secondary-foreground text-center text-sm">Integration App With FlowMate</Text>
                </Slack>
                {expiresAt && (
                    <Slack dir="col">
                        <Text className="text-secondary-foreground text-xs">Expire At</Text>
                        <Text className="text-secondary-foreground text-xs">
                        {new Date(expiresAt).toLocaleDateString("en-US", {
                            weekday: "short", // Abbreviated day of the week
                            year: "numeric", // Full year
                            month: "long", // Full month name
                            day: "numeric", // Day of the month
                        })}
                    </Text>
                    </Slack>
                )}
                <div className="bg-secondary w-[90%] h-[1px]"></div>

                <button
                    className="w-[80%] text-sm bg-foreground text-background py-2 px-3 rounded hover:bg-foreground/80 capitalize transition-colors"
                    onClick={() => onClick(status === "disconnect" ? provider_id : type)}
                >
                    {pendingState ? <Loader2 className="animate-spin" /> : status}
                </button>
            </Slack>
        </article>
    );
};

export default IntegrateAppCard;
