"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import Text from "../typeography/text";
import { loginForm, profileForm } from "@/lib/form-schema";
import Slack from "../layout/slack";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import Title from "@/components/typeography/title";
import { signIn, useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import PasswordInput from "../ui/password-input";
import Link from "next/link";
import Icon from "../icons/logo";
import GithubIcon from "../icons/github-icon";
import Image from "next/image";
import GoogleIcon from "../icons/google-icon";
import { useEffect, useState, useTransition } from "react";
import { AuthError } from "next-auth";
import { Loader2 } from "lucide-react";
import InputFileWithPreview from "@/components/ui/input-file-with-preview";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type UserInfoType = {
    name: string;
    email: string;
    image: string;
};

const ProfileForm = () => {
    const {data: session, status} = useSession();
    const [profilePicture, setProfilePicture] = useState<File | null>(null);
    const [userInfo, setUserInfo] = useState<UserInfoType>();

    const form = useForm<z.infer<typeof profileForm>>({
        resolver: zodResolver(profileForm),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit = (value: z.infer<typeof profileForm>) => {};

    useEffect(() => {
      if(status !== "authenticated") return;
      form.setValue("name", session?.user?.name ?? "")
      form.setValue("email", session?.user?.email ?? "")
    }, [status])
//     useEffect(() => {
//         if (auth_session.status === "authenticated") {
//             setUserInfo({
//                 name: auth_session.data.user?.name ?? "",
//                 email: auth_session.data.user?.email ?? "",
//                 image: auth_session.data.user?.image ?? "",
//             });
//         }
//     }, [auth_session.status]);
    return (
        <Slack dir="col" className="w-full max-w-[500px]">
            <Slack dir="col" className="mb-10">
                <Title level={5}>Your Information</Title>
                <Text className="text-sm">See Your Information!</Text>
            </Slack>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 w-full">
                  <Avatar className="w-[65px] h-[65px]">
                        <AvatarImage src={status === 'authenticated' ? session.user?.image as string : ""}/>
                        <AvatarFallback>AV</AvatarFallback>
                  </Avatar>
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="flex items-center justify-start gap-5">
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your full name" className="!m-0" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        disabled
                        render={({ field }) => (
                            <FormItem className="flex items-center justify-start gap-5">
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Email" className="!m-0" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {/* <InputFileWithPreview onFileSelect={setProfilePicture} label="Upload New Profile" /> */}
                </form>
            </Form>
        </Slack>
    );
};

export default ProfileForm;
