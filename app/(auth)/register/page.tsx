import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import React from "react";

const SignInPage = async () => {
  const onClick = async () => {
    "use server";

    await signIn("github", { redirectTo: "/" });
  };
  return (
    <div>
      <Button onClick={onClick}>Github</Button>
    </div>
  );
};

export default SignInPage;
