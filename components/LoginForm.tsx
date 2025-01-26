"use client";

import { useActionState, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginForm = () => {
  const { toast } = useToast();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      toast({
        title: "Success",
        description: "Successfully logged in",
      });
      router.push(`/`);
      return { ...prevState, status: "SUCCESS" };
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to log in",
        variant: "destructive",
      });
      return { ...prevState, status: "ERROR" };
    }
  };

  const [state, formAction, isPending] = useActionState(handleFormSubmit, {
    error: "",
    status: "INITIAL",
  });

  return (
    <form
      action={formAction}
      className="flex flex-col gap-4 w-[20rem] mx-auto mt-10 text-black"
    >
      <Input
        id="login"
        name="login"
        type="text"
        placeholder="Username or email"
        required
      />
      <Input
        id="password"
        name="password"
        type="password"
        placeholder="Password"
        required
      />
      {error && <p className="text-red-500">{error}</p>}
      <p className="text-center text-sm">
        Not registered?{" "}
        <Link href="/register" className="text-primary hover:text-primary/70">
          Register here.
        </Link>{" "}
      </p>
      <Button
        type="submit"
        className="btn btn-primary py-5 text-white"
        disabled={isPending}
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
