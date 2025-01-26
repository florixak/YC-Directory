"use client";

import { useActionState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const LoginForm = () => {
  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    console.log(formData.get("login"), formData.get("password"));
    return { ...prevState, status: "SUCCESS" };
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
