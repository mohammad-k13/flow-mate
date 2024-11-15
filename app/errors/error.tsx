"use client";

import { useRouter } from "next/router";
import Link from "next/link";
import React from "react";

const AuthErrorPage = () => {
  const router = useRouter();
  const { error } = router.query;

  let errorMessage = "An unknown error occurred.";

  if (error === "OAuthAccountNotLinked") {
    errorMessage =
      "An account with this email already exists. Please sign in using the original method.";
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold">Authentication Error</h1>
      <p className="mt-4 text-red-500">{errorMessage}</p>
      <Link href="/auth/login" className="mt-6 text-blue-500 underline">
        Go to Login
      </Link>
    </div>
  );
};

export default AuthErrorPage;
