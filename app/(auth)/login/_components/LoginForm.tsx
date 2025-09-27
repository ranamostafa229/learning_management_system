"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { GithubIcon, Loader, Mail } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

const LoginForm = () => {
  const [githubPending, startGithubTransition] = useTransition();
  async function signInWithGithub() {
    startGithubTransition(async () => {
      await authClient.signIn.social({
        provider: "github",
        callbackURL: "/",
        fetchOptions: {
          onSuccess: () => {
            toast.success(
              "Signed in with Github, you will be redirected soon!"
            );
          },
          onError: (error) => {
            console.log(error.error.message);
            toast.error(`Error signing in with Github`);
          },
        },
      });
    });
  }
  return (
    <Card className="rounded-md ">
      <CardHeader className=" w-full text-center text-2xl font-semibold">
        Welcome Back
      </CardHeader>
      <CardDescription className="text-center">
        Log In to Your Cursus Account!
      </CardDescription>
      <CardContent className="flex flex-col gap-4">
        <Button
          onClick={signInWithGithub}
          disabled={githubPending}
          className={buttonVariants({
            variant: "outline",
            className: "w-full cursor-pointer text-accent-foreground",
          })}
        >
          {githubPending ? (
            <>
              <Loader className="size-4 animate-spin" />
              <span className="ml-2">Loading...</span>
            </>
          ) : (
            <>
              <GithubIcon className="size-4" />
              Continue with Github
            </>
          )}
        </Button>
        <div className="flex items-center">
          <div className="flex-grow border-t border-gray-400"></div>
          <span className="px-3 text-gray-400">or Continue with</span>
          <div className="flex-grow border-t border-gray-400"></div>
        </div>
        <div>
          <div className="relative">
            <Mail className="absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground" />

            <Input type="email" placeholder="Email Address" className="pl-12" />
          </div>
          <Button className="mt-4 w-full rounded-sm cursor-pointer">
            Continue with Email
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
