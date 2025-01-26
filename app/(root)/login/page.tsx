import { auth } from "@/auth";
import LoginButtons from "@/components/LoginButtons";
import LoginForm from "@/components/LoginForm";
import { redirect } from "next/navigation";

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
      <LoginForm />
      <div className="bg-primary/100 w-[20rem] h-[2px] mx-auto mt-5 mb-7 text-center text-sm rounded-md">
        Or use these
      </div>
      <LoginButtons />
    </>
  );
};

export default Page;
