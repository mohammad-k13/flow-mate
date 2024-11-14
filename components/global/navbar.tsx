import React from "react";
import { ModeToggle } from "../ui/toggle-theme";
import Slack from "@/components/layout/slack";
import Text from "@/components/typeography/text";
import Image from "next/image";
import Title from "../typeography/title";
import { Button } from "../ui/button";
import Link from "next/link";
import { auth } from "@/auth";

const Navbar = async () => {
  const session = await auth();
  return (
    <header className="w-full h-14">
      <nav className="w-full h-full px-5 max-md:hidden">
        <Slack justify="between" className="w-full h-full">
          <Slack gap={10}>
            <Image src={"/Logo.svg"} width={25} height={25} alt="logo" />
            {/* TASK: change font of this text */}
            <Title level={4}>FlowMate</Title>
          </Slack>

          <Slack gap={8} className="h-full">
            <Slack gap={18} className="mr-5">
              <Text className="font-600 hover:text-accent transition-colors">
                <Link href={"/"}>Home</Link>
              </Text>
              <Link href={"/about"}>
                <Text className="font-600 hover:text-accent transition-colors">
                  About
                </Text>
              </Link>
              <Link href={"/contact"}>
                <Text className="font-600 hover:text-accent transition-colors">
                  Contact
                </Text>
              </Link>
            </Slack>
            <ModeToggle />
            <Button className="border-2 ml-2">
              {session?.user ? (
                <Link href={"/dashboard"}>
                  <Text className="font-600">Dashboard</Text>
                </Link>
              ) : (
                <Link href={"/login"}>
                  <Text>Get Start</Text>
                </Link>
              )}
            </Button>
          </Slack>
        </Slack>
      </nav>
    </header>
  );
};

export default Navbar;
