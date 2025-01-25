import { auth } from "@/auth";
import LoginButtons from "@/components/LoginButtons";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const session = await auth();

  if (session) {
    return redirect("/");
  }

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <h1 className="heading">Login</h1>
      </section>
      <LoginButtons />
    </>
  );
};

export default Page;
