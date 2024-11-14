"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { registerForm } from "@/lib/form-schema";
import InputFileWithPreview from "../ui/input-file-with-preview";
import Title from "../typeography/title";
import Text from "../typeography/text";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import PasswordInput from "../ui/password-input";
import Link from "next/link";

const RegisterForm = () => {
  const [pending, startSubmit] = useTransition();
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const { push } = useRouter();

  // 1. Define your form.
  const form = useForm<z.infer<typeof registerForm>>({
    resolver: zodResolver(registerForm),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof registerForm>) => {
    startSubmit(async () => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);

      if (profilePicture) {
        formData.append("profilePicture", profilePicture);
      }

      const response = await fetch("/api/register", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();

        toast.success("Account Created!", { description: result.message });
        push("/login");
      } else {
        if (response.status === 500) {
          toast.error("Faild to Fetch");
        } else {
          const { message } = await response.json();
          toast.error("Error", { description: message });
        }
      }
    });
  };
  return (
    <>
      <Title level={3}>Create Account</Title>
      <Text>Create a Account and Make your Life automate</Text>

      <div className="h-[1px] w-[80%] bg-muted-foreground mx-auto !my-10"></div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 w-full"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    placeholder="*********"
                    type="password"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <InputFileWithPreview onFileSelect={setProfilePicture} />
          <Button
            type="submit"
            className="bg-accent text-black font-700 w-full hover:bg-accent/80"
          >
            {pending ? <Loader className="animate-spin" /> : "Submit"}
          </Button>
        </form>
      </Form>
      <Link href={"/login"} className="mt-4">
        <Text className="text-chart-1">Do you have Account?</Text>
      </Link>
    </>
  );
};

export default RegisterForm;
