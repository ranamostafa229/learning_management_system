"use client";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useConfetti } from "@/hooks/use-confetti";
import { ArrowLeft, CheckIcon } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

const PaymentSuccessful = () => {
  const { triggerConfetti } = useConfetti();
  useEffect(() => {
    triggerConfetti();
  }, [triggerConfetti]);
  return (
    <div className="flex flex-1 min-h-screen w-full justify-center items-center">
      <Card className="w-[520px]">
        <CardContent className="space-y-3">
          <div className="flex justify-center w-full ">
            <CheckIcon className="size-12 p-2 bg-green-500/30 text-green-500 rounded-full" />
          </div>
          <div className="text-center space-y-1 w-full">
            <h2 className="text-xl font-semibold">Payment Successful</h2>
            <p className="text-sm text-muted-foreground text-balance tracking-tight">
              Thank you for your payment! Your transaction has been completed
              successfully you now have access to the purchased course.
            </p>
            <Link
              href={"/dashboard"}
              className={buttonVariants({ className: "w-full mt-5" })}
            >
              <ArrowLeft className="size-4" />
              Go to Dashboard
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccessful;
