import Slack from "@/components/layout/slack";
import { prisma } from "@/prisma";
import React from "react";
import CreateWorkflow from "./_components/create-workflow";
import WorkFlowCard from "./_components/workflow-card";
import Title from "@/components/typeography/title";
import Text from "@/components/typeography/text";

const WorkflowPage = async () => {
  try {
    const workflows = await prisma.workflow.findMany();
    return (
      <section className="w-full h-full pt-8">
        <header className="w-full">
          <Slack className="w-full" justify="end">
            <CreateWorkflow />
          </Slack>
        </header>
        {!workflows ||
          (!workflows.length && (
            <Slack className="h-full" dir="col" justify="around" gap={5}>
              <div className="text-center">
                <Title level={2}>No Workflow Added!</Title>
                <Text>
                  No workflows have been created yet. Please add a new workflow
                  to get started.
                </Text>
              </div>
              <div></div>
            </Slack>
          ))}
        {workflows.length && (
          <Slack
            wrap="wrap"
            className="p-2 overflow-y-auto"
            justify="start"
            align="start"
            gap={25}
          >
            {workflows.map(({ createdAt, description, id, name }) => (
              <WorkFlowCard
                key={id}
                createdAt={createdAt}
                description={description ?? ""}
                id={id}
                name={name}
                nodes={[]}
              />
            ))}
          </Slack>
        )}
      </section>
    );
  } catch (error) {
    console.error("Error fetching workflows:", error);
    return (
      <Text className="text-destructive">
        Something went wrong while fetching workflows. Please try again later.
      </Text>
    );
  }
};

export default WorkflowPage;
