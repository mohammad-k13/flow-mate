"use client";

import Slack from "@/components/layout/slack";
import Title from "@/components/typeography/title";
import { Button } from "@/components/ui/button";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import WorkFlowSidebar from "@/components/workFlow/side-bar";
import WorkFlowCanvas from "@/components/workFlow/workflow-canvas";
import useCanvas from "@/providers/canvas-provider";
import { Loader } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useCallback, useEffect, useTransition } from "react";

const Editor = () => {
    const params = useParams<{ editorId: string }>();
    const { setWorkflowData, saveChanges, unsavedChanges } = useCanvas();

    const [saving, startSaveTransition] = useTransition();
    const [pending, startSetWorkflow] = useTransition();

    const saveChangesHandler = () => {
        startSaveTransition(() => saveChanges(params.editorId));
    };

    useEffect(() => {
        startSetWorkflow(() => setWorkflowData(params.editorId));
    }, [setWorkflowData]);
    return (
        <section className="w-full h-full font-work-sans">
            <header className="w-full px-2 h-14">
                <Slack className="w-full" justify="between">
                    <Title level={2}>Workflow Editor</Title>
                    <Slack className="" justify="center">
                        <Button className="hover:bg-chart-2" disabled={!unsavedChanges || saving} onClick={saveChangesHandler}>
                            {saving ? <Loader className="animate-spin" /> : "Save"}
                        </Button>
                    </Slack>
                </Slack>
            </header>
            <main style={{ height: "calc(100vh - 4.8rem - 50px)" }}>
                <ResizablePanelGroup direction="horizontal" className="h-full">
                    <ResizablePanel className="w-3/4">
                        <main className="w-[99%] h-full shadow-border-2">
                            {pending ? (
                                <Slack className="h-full bg-foreground/10">
                                    <Loader className="animate-spin" />
                                </Slack>
                            ) : (
                                <WorkFlowCanvas />
                            )}
                        </main>
                    </ResizablePanel>

                    <ResizableHandle withHandle />

                    <ResizablePanel className="w-1/4">
                        <main className="w-[99%] h-full shadow-border-2">
                            <WorkFlowSidebar />
                        </main>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </main>
        </section>
    );
};

export default Editor;
