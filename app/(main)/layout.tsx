import Navbar from "@/components/global/navbar";
import React, { type ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const MainPagesLayout = ({ children }: Props) => {
  return (
    <section className="w-full min-h-screen">
      <Navbar />

      <main>{children}</main>
    </section>
  );
};

export default MainPagesLayout;
