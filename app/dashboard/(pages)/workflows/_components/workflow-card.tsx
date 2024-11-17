"use client";
import Slack from "@/components/layout/slack";
import Title from "@/components/typeography/title";
import Text from "@/components/typeography/text";
import { NodeType } from "@/lib/types";
import React, { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Loader2, MoreVertical } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { prisma } from "@/prisma";
import { toast } from "sonner";

type Props = {
  name: string;
  description: string;
  id: string | number;
  createdAt: Date;
  nodes: NodeType[];
};

const WorkFlowCard = ({ name, description, id, createdAt, nodes }: Props) => {
  const { push, refresh } = useRouter();
  const [pending, startTransition] = useTransition();

  const deleteWorkflow = () => {
    startTransition(async () => {
      const response = await fetch("/api/workflow/delete/" + id, {
        method: "DELETE",
      });
      const { message } = await response.json();
      if (response.ok) {
        toast.success(message);
      } else {
        toast.error(message);
      }
      refresh();
    });
  };

  return (
    <div className="w-[98%] lg:max-w-[500px] shadow-border-2 px-3 py-2 relative">
      <Slack dir="col" align="start">
        <Slack dir="col" align="start">
          <Title level={3}>{name}</Title>
          <Text>{description}</Text>
          <Text className="text-sm">{id}</Text>
        </Slack>

        <Slack align="end" justify="end" gap={8} className="w-full mt-5">
          <button
            className="bg-destructive text-destructive-foreground rounded-md p-2 text-sm "
            onClick={deleteWorkflow}
          >
            {pending ? <Loader2 className="animate-spin" /> : "Delete Workflow"}
          </button>
          <button
            className="bg-foreground text-background rounded-md p-2 text-sm "
            onClick={() => {
              push(`workflows/editor/${id}`);
            }}
          >
            Open Workflow
          </button>
        </Slack>
      </Slack>
    </div>
  );
};

export default WorkFlowCard;
