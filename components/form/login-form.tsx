"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Text from "../typeography/text";
import { loginForm } from "@/lib/form-schema";
import Slack from "../layout/slack";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import Title from "@/components/typeography/title";
import { signIn } from "next-auth/react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import PasswordInput from "../ui/password-input";
import Link from "next/link";
import Icon from "../icons/logo";
import GithubIcon from "../icons/github-icon";
import Image from "next/image";
import GoogleIcon from "../icons/google-icon";
import { useEffect, useTransition } from "react";
import { AuthError } from "next-auth";
import { Loader2 } from "lucide-react";

const LoginForm = () => {
    const [loginPending, startLogin] = useTransition();
    const [githubPending, startLoginWithGithub] = useTransition();
    const [googlePending, startLoginWithGoogle] = useTransition();

    const searchParams = useSearchParams();
    const error: AuthError["type"] = searchParams.get("error") as AuthError["type"];
    const { push } = useRouter();

    const form = useForm<z.infer<typeof loginForm>>({
        resolver: zodResolver(loginForm),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const loginWithGithub = () => {
        startLoginWithGithub(() => {
            signIn("github", { redirectTo: "/dashboard" });
        });
    };

    const loginWithGoogle = async () => {
        startLoginWithGoogle(() => {
            signIn("google", { redirectTo: "/dashboard" });
        });
    };

    const onSubmit = (value: z.infer<typeof loginForm>) => {
        startLogin(async () => {
            const result = await signIn("credentials", {
                email: value.email,
                password: value.password,
            });

            if (result?.error && result.error === "CredentialsSignin") {
                toast.error("Email Or Password Isn't Correct");
            } else {
                push("/dashboard");
            }
        });
    };

    useEffect(() => {
        if (error === "OAuthAccountNotLinked") {
            toast.error("Account Not Linked", { description: "Please sign in using the original method." });
        }
    }, [error]);

    return (
        <>
            <Title level={3} className="text-center">
                Enter to Your Account
            </Title>
            <Text className="text-center">Start automate your workflow by login to account</Text>

            <Slack className="providers my-5 max-md:flex-col !max-md:gap-[12px] w-full" gap={8}>
                <Button onClick={loginWithGithub} className="w-full !py-1">
                    <GithubIcon />
                    {githubPending ? <Loader2 className="animate-spin" /> : "Login with Github"}
                </Button>
                <Button onClick={loginWithGoogle} className="w-full !py-1">
                    <GoogleIcon />
                    {googlePending ? <Loader2 className="animate-spin" /> : "Login with Google"}
                </Button>
            </Slack>

            <div className="h-[1px] w-full bg-muted-foreground mx-auto my-5"></div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-8">
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
                                    <PasswordInput placeholder="*********" type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="bg-accent text-black font-700 w-full hover:bg-accent/80">
                        {loginPending ? <Loader2 className="animate-spin" /> : "Log in"}
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
