"use client";

import {
    Calendar,
    ChevronDown,
    ChevronsUpDown,
    Home,
    HomeIcon,
    Inbox,
    LucideAppWindow,
    Moon,
    Search,
    Settings,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import Slack from "@/components/layout/slack";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Text from "@/components/typeography/text";
import Title from "@/components/typeography/title";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { IntegrateAppLinks, IntegrationLinks, SettingLinks, WorkflowLinks } from "@/constance";
import Link from "next/link";
import Image from "next/image";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useTheme } from "next-themes";

const DashboardLayout = () => {
    const session = useSession();
    const { setTheme } = useTheme();

    return (
        <Sidebar>
            <SidebarContent>
                <Slack gap={10} justify="start" className="pt-3 pl-4">
                    <Image src={"/icons/Logo.svg"} width={25} height={25} alt="logo" />
                    <Title level={4}>FlowMate</Title>
                </Slack>
                {/* <!-- ========== Start Home ========== --> */}
                <SidebarGroup>
                    <SidebarGroupLabel>Home</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link href={"/dashboard"}>
                                        <HomeIcon />
                                        <Text>Dashboard</Text>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* <!-- ========== Start Wrokflow Links ========== --> */}
                <SidebarGroup>
                    <SidebarGroupLabel>Workflow</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {WorkflowLinks.map((item) => (
                                <SidebarMenuItem key={item.label}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.path}>
                                            <item.icon />
                                            <Text>{item.label}</Text>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* <!-- ========== Start Settings ========== --> */}
                <SidebarGroup>
                    <SidebarGroupLabel>Settings</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {SettingLinks.map((item) => (
                                <SidebarMenuItem key={item.label}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.path}>
                                            <item.icon />
                                            <Text>{item.label}</Text>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}

                            {/* Dark Theme */}
                            <SidebarMenuItem>
                                <SidebarMenuButton>
                                    <Moon />
                                    <Slack justify="between" className="w-full">
                                        <Text>Dark Theme</Text>
                                        <Switch onCheckedChange={(value) => setTheme(value ? "dark" : "light")} />
                                    </Slack>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* <!-- ========== Start Integration ========== --> */}
                <SidebarGroup>
                    <SidebarGroupLabel>Integration</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {IntegrationLinks.map((item) => (
                                <SidebarMenuItem key={item.label}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.path}>
                                            <item.icon />
                                            <Text>{item.label}</Text>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>

                        {/* Integration App list */}
                        <SidebarMenu>
                            <Collapsible defaultOpen className="group/collapsible">
                                <SidebarMenuItem>
                                    <CollapsibleTrigger asChild>
                                        <SidebarMenuItem>
                                            <SidebarMenuButton>
                                                <LucideAppWindow />
                                                <Text>Integrate App</Text>
                                                <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    </CollapsibleTrigger>
                                    <CollapsibleContent>
                                        <SidebarMenuSub>
                                            {IntegrateAppLinks.map((item) => (
                                                <SidebarMenuItem key={item.label}>
                                                    <SidebarMenuButton asChild onClick={item.onClick}>
                                                        <div>
                                                            <item.icon />
                                                            <Text>{item.label}</Text>
                                                        </div>
                                                    </SidebarMenuButton>
                                                </SidebarMenuItem>
                                            ))}{" "}
                                        </SidebarMenuSub>
                                    </CollapsibleContent>
                                </SidebarMenuItem>
                            </Collapsible>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="w-[98%] overflow-hidden">
                <Slack className="w-full" gap={2} justify="between">
                    <Slack className="w-4/5 overflow-hidden" justify="between">
                        <Slack gap={5}>
                            <Avatar className="border-2 border-black">
                                <AvatarImage src={session.data?.user?.image ?? ""} />
                                <AvatarFallback>AV</AvatarFallback>
                            </Avatar>
                            <Slack dir="col" align="start" className="w-full overflow-hidden">
                                <Title level={5} className="text-sm text-ellipsis whitespace-nowrap">
                                    {session.data?.user?.name}
                                </Title>
                                <Text className="text-xs text-secondary-foreground overflow-hidden text-ellipsis whitespace-nowrap">
                                    {session.data?.user?.email}
                                </Text>
                            </Slack>
                        </Slack>
                    </Slack>
                    <Slack className="overflow-hidden">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button>
                                    <ChevronsUpDown size={18} />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56">
                                <DropdownMenuLabel>
                                    <Slack gap={5}>
                                        <Avatar className="border-2 border-foreground">
                                            <AvatarImage src={session.data?.user?.image ?? ""} />
                                            <AvatarFallback>AV</AvatarFallback>
                                        </Avatar>
                                        <Slack dir="col" align="start" className="w-full overflow-hidden">
                                            <Title level={5} className="text-sm text-ellipsis whitespace-nowrap">
                                                {session.data?.user?.name}
                                            </Title>
                                            <Text className="text-xs text-secondary-foreground overflow-hidden text-ellipsis whitespace-nowrap">
                                                {session.data?.user?.email}
                                            </Text>
                                        </Slack>
                                    </Slack>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuSeparator className="my-1" />

                                <DropdownMenuItem className="w-full hover:outline-none">
                                    <Button
                                        className="text-sm w-full hover:bg-destructive hover:text-destructive-foreground"
                                        onClick={() => signOut()}
                                    >
                                        Log out
                                    </Button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </Slack>
                </Slack>
            </SidebarFooter>
        </Sidebar>
    );
};

export default DashboardLayout;
