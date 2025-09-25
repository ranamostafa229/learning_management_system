import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GithubIcon, Mail } from "lucide-react";

const LoginPage = () => {
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
          className={buttonVariants({
            variant: "outline",
            className: "w-full cursor-pointer text-accent-foreground",
          })}
        >
          <GithubIcon className="size-4" />
          Continue with Github
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

export default LoginPage;
