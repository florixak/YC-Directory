"use client";

import { useActionState, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import { registerFormSchema } from "@/lib/validation";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";

const RegisterForm = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const handleFormSubmit = async (prevState: any, formData: FormData) => {
    try {
      const formValues = {
        login: formData.get("login") as string,
        email: formData.get("email") as string,
        password: formData.get("password") as string,
        confirmPassword: formData.get("confirm-password") as string,
      };

      await registerFormSchema.parseAsync(formValues);

      // if (formValues.password !== formValues.confirmPassword)
      //   return { ...prevState, status: "PASSWORD_NOT_MATCH" };

      toast({
        title: "Success",
        description: "Successfully registered",
      });

      return { ...prevState, status: "SUCCESS" };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;

        setErrors(fieldErrors as unknown as Record<string, string>);

        return { ...prevState, status: "ERROR" };
      }

      toast({
        title: "Error",
        description: "An unexpected error has occured",
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
      <div>
        <Input
          id="login"
          name="login"
          type="text"
          placeholder="Username"
          required
        />
        {errors.login && <p className="text-red-500">{errors.login}</p>}
      </div>

      <div>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Email"
          required
        />
        {errors.email && <p className="text-red-500">{errors.email}</p>}
      </div>
      <div>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          required
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password}</p>
        )}
      </div>

      <div>
        <Input
          id="confirm-password"
          name="confirm-password"
          type="password"
          placeholder="Confirm Password"
          required
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm">{errors.confirmPassword}</p>
        )}
      </div>

      <p className="text-center text-sm">
        Already registered?{" "}
        <Link href="/login" className="text-primary hover:text-primary/70">
          Login here.
        </Link>
      </p>
      <Button
        type="submit"
        className="btn btn-primary py-5 text-white"
        disabled={isPending}
      >
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;
