"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Text from "../typeography/text";
import { loginForm } from "@/lib/form-schema";
import Slack from "../layout/slack";

import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import Title from "@/components/typeography/title";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import PasswordInput from "../ui/password-input";
import Link from "next/link";

const LoginForm = () => {
  const { push } = useRouter();

  const form = useForm<z.infer<typeof loginForm>>({
    resolver: zodResolver(loginForm),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginWithGithub = async () => {
    await signIn("github", { redirectTo: "/dashboard" });
  };

  const loginWithGoogle = async () => {
    await signIn('google', {redirectTo: "/dashboard"})
  }

  const onSubmit = async (value: z.infer<typeof loginForm>) => {
    const result = await signIn("credentials", {
      email: value.email,
      password: value.password,
      redirect: false,
    });

    if (result?.error && result.error === "CredentialsSignin") {
      toast.error("Email Or Password Isn't Correct");
    } else {
      push("/dashboard");
    }
  };

  return (
    <>
      <Title level={3}>Enter to Your Account</Title>
      <Text>Start automate your workflow by login to account</Text>


      <Slack className="providers mt-5" gap={8}>
        <Button onClick={loginWithGithub} className="!py-1">
          Login with Github
        </Button>
        <Button onClick={loginWithGithub} className="!py-1">
          Login with Google
        </Button>
      </Slack>

      <div className="h-[1px] w-[80%] bg-muted-foreground mx-auto !my-5"></div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Eamil" {...field} />
                </FormControl>
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
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-accent text-black font-700 w-full hover:bg-accent/80"
          >
            Submit
            {/* {pending ? <Loader className="animate-spin" /> : "Submit"} */}
          </Button>
        </form>
      </Form>

      <Link href={"/register"} className="mt-4">
        <Text className="text-chart-1">Create Account</Text>
      </Link>
    </>
  );
};

export default LoginForm;
