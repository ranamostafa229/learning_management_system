"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { authClient } from "@/lib/auth-client";
import { ArrowLeftCircle } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, useTransition } from "react";
import { toast } from "sonner";
import { signInWithEmail } from "../login/_components/LoginForm";

export default function VerifyRequestPage() {
  return (
    <Suspense>
      <VerifyRequest />
    </Suspense>
  );
}
const VerifyRequest = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [otpPending, startOtpTransition] = useTransition();
  const [emailPending, startEmailTransition] = useTransition();

  const paramas = useSearchParams();
  const email = paramas.get("email") as string;
  const isOTPCompleted = otp.length === 6;

  function verifyOTP() {
    startOtpTransition(async () => {
      await authClient.signIn.emailOtp({
        email: email,
        otp: otp,
        fetchOptions: {
          onSuccess: () => {
            toast.success(
              "Email verified successfully, you will be redirected soon!"
            );
            router.push("/");
          },
          onError: (error) => {
            console.log(error.error.message);
            toast.error(`Error verifying Email OTP`);
          },
        },
      });
    });
  }
  return (
    <Card className="rounded-md w-full mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Please check your email</CardTitle>
        <CardDescription className="">
          We have sent a verification code to your email. Please check your
          inbox and paste the code to verify your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center space-y-2 ">
          <InputOTP
            maxLength={6}
            value={otp}
            onChange={(value) => setOtp(value)}
            className="gap-2"
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <p className="text-sm text-muted-foreground">
            Enter the 6-digit code send to your email.
          </p>
        </div>
        <Button
          className="w-full rounded-sm cursor-pointer"
          onClick={verifyOTP}
          disabled={otpPending || !isOTPCompleted}
        >
          Verify Account
        </Button>
      </CardContent>
      <div className="flex items-center justify-center text-muted-foreground">
        <p>Didn&apos;t receive the email?</p>
        <Button
          variant={"link"}
          className="cursor-pointer font-bold"
          onClick={() =>
            signInWithEmail(email, false, router, startEmailTransition)
          }
          disabled={emailPending}
        >
          Resend Email
        </Button>
      </div>
      <Link
        href={"/login"}
        className={buttonVariants({
          variant: "link",
        })}
      >
        <ArrowLeftCircle />
        Back to login
      </Link>
    </Card>
  );
};
