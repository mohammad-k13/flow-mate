"use client";
import Slack from "@/components/layout/slack";
import Title from "@/components/typeography/title";
import Text from "@/components/typeography/text";
import { NodeType } from "@/lib/types";
import React, { Dispatch, SetStateAction, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Loader2, MoreVertical } from "lucide-react";
import { createWorkflowForm } from "@/lib/form-schema";

import { prisma } from "@/prisma";
import { toast } from "sonner";
import { deleteWorkflow, editWorkflow } from "@/actions/workflows";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = {
    setUpdateWorkflows: Dispatch<SetStateAction<boolean>>;
    name: string;
    description: string;
    id: string;
    createdAt: Date;
    nodes: NodeType[];
};

const WorkFlowCard = ({ name, description, id, createdAt, nodes, setUpdateWorkflows }: Props) => {
    const { push, refresh } = useRouter();
    const [pending, startTransition] = useTransition();
    const [opening, startOpenWorkflow] = useTransition();
    const [editing, startEditing] = useTransition();
    const [openDialog, setOpenDialog] = useState<boolean>(false);

    const form = useForm<z.infer<typeof createWorkflowForm>>({
        resolver: zodResolver(createWorkflowForm),
        defaultValues: {
            description,
            name
        }
    })

    const deleteWorkflowHandler = () => {
        startTransition(async () => {
            const statusCode = await deleteWorkflow(id.toString());
            if (statusCode === 200) {
                toast.success("Workflow Deleted Successfully!");
                setUpdateWorkflows((pv) => !pv);
            } else {
                toast.error("Faild to Fetch");
            }
        });
    };
    const openWorkflowHanlder = () => {
        startOpenWorkflow(() => {
            push(`workflows/${id}`);
        });
    };

    const onSubmit = ({description, name}: z.infer<typeof createWorkflowForm>) => {
        startEditing(async () => {
            const statusCode = await editWorkflow(id, {name, description});
            if(statusCode === 200){
                toast.success("Changes Saved!");
                setOpenDialog(false);
                setUpdateWorkflows(pv => !pv)
            }
        })
    }

    return (
        <Slack
            className="w-[98%] lg:max-w-[450px] h-[180px] shadow-border-2 px-3 py-2 relative"
            align="start"
            justify="between"
            dir="col"
        >
            {/* task: add dialog to edit workflow */}
            <div
                className="absolute top-2 right-2 p-1 rounded-sm cursor-pointer hover:bg-secondary transition-colors"
                onClick={() => setOpenDialog(true)}
            >
                <MoreVertical size={20} />
            </div>
            <Slack dir="col" align="start">
                <Title level={3}>{name}</Title>
                <Text>{description}</Text>
                <Text className="text-sm">{id}</Text>
            </Slack>

            <Slack justify="between" className="w-full max-sm:flex-col">
                <Slack className="text-sm">
                    <Text>Nodes: </Text>
                    <Text>{nodes.length}</Text>
                </Slack>
                <Slack align="end" justify="end" gap={8} className="">
                    <button
                        className="bg-destructive text-destructive-foreground rounded-md p-2 text-sm h-[36px]"
                        onClick={deleteWorkflowHandler}
                    >
                        {pending ? <Loader2 className="animate-spin" /> : "Delete Workflow"}
                    </button>
                    <button
                        className="bg-foreground text-background rounded-md p-2 text-sm h-[36px]"
                        onClick={openWorkflowHanlder}
                    >
                        {opening ? <Loader2 className="animate-spin" /> : "Open Workflow"}
                    </button>
                </Slack>
            </Slack>

            <Dialog open={openDialog} onOpenChange={(value) => setOpenDialog(value)}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Workflow</DialogTitle>
                        <DialogDescription>
                            Make changes to your workflow here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-4 items-center gap-4" {...field}>
                                        <FormLabel htmlFor="name" className="text-right">
                                            Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input id="name" name={name} defaultValue={name} className="col-span-3" />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-4 items-center gap-4" {...field}>
                                        <FormLabel htmlFor="description" className="text-right">
                                            Description
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                id="description"
                                                defaultValue={description}
                                                className="col-span-3"
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <DialogFooter>
                                <button type="submit" className="bg-foreground text-background rounded-md p-2 text-sm ">
                                    {editing ? <Loader2 className="animate-spin" /> : "Save Workflow"}
                                </button>
                            </DialogFooter>
                        </form>
                    </Form>

                    {/* <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter> */}
                </DialogContent>
            </Dialog>
        </Slack>
    );
};

export default WorkFlowCard;
