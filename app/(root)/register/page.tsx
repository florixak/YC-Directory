import LoginButtons from "@/components/LoginButtons";
import RegisterForm from "@/components/RegisterForm";

const Page = () => {
  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <h1 className="heading">Register</h1>
      </section>
      <RegisterForm />
      <LoginButtons />
    </>
  );
};

export default Page;
