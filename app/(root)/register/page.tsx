import LoginButtons from "@/components/LoginButtons";
import RegisterForm from "@/components/RegisterForm";

const Page = () => {
  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <h1 className="heading">Register</h1>
      </section>
      <RegisterForm />
      <div className="bg-primary/100 w-[20rem] h-[2px] mx-auto mt-5 mb-7 text-center text-sm rounded-md">
        Or use these
      </div>
      <LoginButtons />
    </>
  );
};

export default Page;
