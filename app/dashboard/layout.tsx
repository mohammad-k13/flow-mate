import DashboardSidebar from "@/components/global/dashboard/dashboard-sidebar";
import Slack from "@/components/layout/slack";
import { CanvasProvider } from "@/providers/canvas-provider";
import React, { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardBreadcrumb from "@/components/global/dashboard/Breadcrumb";
import Title from "@/components/typeography/title";
type Props = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: Props) => {
  return (
    <SidebarProvider>
      <section className="w-full h-screen">
        <Slack className="w-full h-full">
          <DashboardSidebar />
          <Slack dir="col" className="w-full h-full">
            <header className="h-[50px] w-full px-2">
              <Slack className="h-full" justify="start" gap={15}>
                <SidebarTrigger />
                <DashboardBreadcrumb />
              </Slack>
            </header>
            <main className="w-full" style={{ height: "calc(100vh - 50px)" }}>
              <Slack className="h-full p-2">
                <CanvasProvider>{children}</CanvasProvider>
              </Slack>
            </main>
          </Slack>
        </Slack>
      </section>
    </SidebarProvider>
  );
};

export default DashboardLayout;
