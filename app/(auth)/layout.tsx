import Navbar from "@/components/global/navbar";
import Slack from "@/components/layout/slack";
import Title from "@/components/typeography/title";
import React, { type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <section className="w-full" style={{height: "calc(100vh - 3.5rem)"}}>
      <Navbar />

      <Slack className="w-full h-full ">
        <Slack className="w-[95%] max-w-[550px] h-fil shadow-border-2 self-center p-8" dir="col" gap={3}> {children}</Slack>
      </Slack>
    </section>
  );
};

export default AuthLayout;
