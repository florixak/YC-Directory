import React from "react";
import { Button } from "./ui/button";
import { signIn } from "@/auth";

const LoginForm = () => {
  const loginWithGitHub = async () => {
    "use server";
    await signIn("github");
  };

  const loginWithGoogle = async () => {
    "use server";
    await signIn("google");
  };

  return (
    <div className="flex flex-col gap-4 w-[20rem] mx-auto mt-10">
      <Button onClick={loginWithGitHub} className="btn btn-primary py-5">
        Login with GitHub
      </Button>
      <Button onClick={loginWithGoogle} className="btn btn-primary py-5">
        Login with Google
      </Button>
    </div>
  );
};

export default LoginForm;
