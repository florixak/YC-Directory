import { Button } from "./ui/button";
import { signIn } from "@/auth";
import { GitHubLogoIcon, GlobeIcon } from "@radix-ui/react-icons";

const LoginButtons = () => {
  const loginWithGitHub = async () => {
    "use server";
    await signIn("github");
  };

  const loginWithGoogle = async () => {
    "use server";
    await signIn("google");
  };

  return (
    <div className="flex flex-col gap-4 w-[20rem] mx-auto text-white">
      <Button onClick={loginWithGitHub} className="btn btn-primary py-5">
        <GitHubLogoIcon />
        Login with GitHub
      </Button>
      <Button onClick={loginWithGoogle} className="btn btn-primary py-5">
        <GlobeIcon />
        Login with Google
      </Button>
    </div>
  );
};

export default LoginButtons;
