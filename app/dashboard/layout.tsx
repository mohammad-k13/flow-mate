import Slack from "@/components/layout/slack";
import React, { ReactNode } from "react";

type Props = {
    children: ReactNode
}

const DashboardLayout = ({children}: Props) => {
  return (
    <section className="w-full h-screen">
      <Slack className="h-full">
        <aside className="w-fit p-5 bg-yellow-300 h-full"></aside>
        <main className="w-full p-5 h-full">{children}</main>
      </Slack>
    </section>
  );
};

export default DashboardLayout;
