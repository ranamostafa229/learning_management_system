"use client";
import { Button } from "@/components/ui/button";
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
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

const VerifyRequest = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [otpPending, startOtpTransition] = useTransition();
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
    </Card>
  );
};

export default VerifyRequest;
