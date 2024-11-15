import Slack from "@/components/layout/slack";
import { CanvasProvider } from "@/providers/canvas-provider";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <section className="w-full h-screen">
      <Slack className="h-full">
        <aside className="w-fit p-5 bg-yellow-300 h-full"></aside>
        <main className="w-full h-full">
          <Slack className="h-full p-2">
            <CanvasProvider>{children}</CanvasProvider>
          </Slack>
        </main>
      </Slack>
    </section>
  );
};

export default DashboardLayout;
