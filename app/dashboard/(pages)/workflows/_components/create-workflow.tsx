"use client";

import { auth } from "@/auth";
import Slack from "@/components/layout/slack";
import Text from "@/components/typeography/text";
import Title from "@/components/typeography/title";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createWorkflowForm } from "@/lib/form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const CreateWorkflow = () => {
  const session = useSession();
  const { push, refresh } = useRouter();

  const [open, setOpen] = useState<boolean>(false);
  const [pending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof createWorkflowForm>>({
    resolver: zodResolver(createWorkflowForm),
    defaultValues: {
      description: "",
      name: "",
    },
  });

  const onSubmit = async (value: z.infer<typeof createWorkflowForm>) => {
    setOpen(false);
    startTransition(async () => {
      console.log(session);
      if (!session) push("/login");

      try {
        const response = await fetch("/api/workflow/create", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ ...value, email: session.data?.user?.email }),
        });
        console.log(response);
        if (response.ok) {
          const { message, workflow } = await response.json();
          toast.success(message);
          refresh();
          // push(`workflows/editor/${workflow.id}`);
        }
      } catch (err) {}
    });
  };

  return (
    <div>
      <Slack dir="col" gap={5}>
        <button
          className="bg-foreground text-background rounded-md p-2 text-sm "
          onClick={() => setOpen(true)}
        >
          Create Workflow
        </button>
      </Slack>

      <Dialog
        open={open}
        onOpenChange={(value) => {
          setOpen(value);
          form.reset();
        }}
      >
        <DialogContent className="w-[95%] max-w-[425px] border-4 border-foreground">
          <DialogHeader>
            <DialogTitle>
              <Title level={4}>Create Workflow</Title>
            </DialogTitle>
            <DialogDescription>
              <Text>
                Create a new workflow by filling out the details below.
              </Text>
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-4 py-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem
                    className="grid grid-cols-4 items-center gap-4"
                    {...field}
                  >
                    <FormLabel htmlFor="name" className="text-right">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        placeholder="autocode generator"
                        className="col-span-3"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem
                    className="grid grid-cols-4 items-center gap-4"
                    {...field}
                  >
                    <FormLabel htmlFor="description" className="text-right">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="description"
                        placeholder="like for what"
                        className="col-span-3"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <button
                  type="submit"
                  className="bg-foreground text-background rounded-md p-2 text-sm "
                >
                  {pending ? (
                    <Loader2 className="animate-spin" />
                  ) : (
                    "Create Workflow"
                  )}
                </button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateWorkflow;
