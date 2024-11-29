import Slack from "@/components/layout/slack";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const WorkflowCardLoader = () => {
    return (
        <Skeleton className="w-[98%] h-[160px] lg:max-w-[400px] p-3 relative">
            <Slack dir="col" align="start">
                <Slack dir="col" align="start" gap={5}>
                    <Skeleton className="w-[250px] h-[20px] rounded-md" />
                    <Skeleton className="w-[150px] h-[10px] rounded-md" />{" "}
                    <Skeleton className="w-[150px] h-[10px] rounded-md" />{" "}
                </Slack>

                <Slack align="end" justify="end" gap={8} className="w-full mt-10 max-sm:flex-col">
                    <Skeleton className="w-[70px] h-[40px] rounded-md" />
                    <Skeleton className="w-[70px] h-[40px] rounded-md" />
                </Slack>
            </Slack>
        </Skeleton>
    );
};

export default WorkflowCardLoader;
