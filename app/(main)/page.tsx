import TagLine from "@/components/global/tag-line";
import Slack from "@/components/layout/slack";
import WorkflowCard from "@/components/routes/(main)/workflow-card";
import Title from "@/components/typeography/title";
import { Button } from "@/components/ui/button";
import React from "react";

const Home = async () => {
    return (
        <section className="w-full h-screen overflow-y-scroll pb-28">
            <TagLine />
            <div className="m-5 p-5">
                <Slack gap={30} wrap="wrap">
                    <WorkflowCard />
                    <WorkflowCard />
                    <WorkflowCard />
                    <WorkflowCard />
                    <WorkflowCard />
                    <WorkflowCard />
                    <WorkflowCard />
                    <WorkflowCard />
                </Slack>
            </div>
        </section>
    );
};

export default Home;
