import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, XIcon } from "lucide-react";
import Link from "next/link";

const PaymentCancelled = () => {
  return (
    <div className="flex flex-1 w-full min-h-screen items-center justify-center">
      <Card className="w-[520px]">
        <CardContent className="space-y-3">
          <div className="flex justify-center w-full">
            <XIcon className="size-12 p-2 bg-red-500/30 text-red-500 rounded-full" />
          </div>
          <div className="space-y-1 text-center w-full">
            <h2 className="text-xl font-semibold ">Payment Cancelled</h2>
            <p className="text-muted-foreground text-sm tracking-tight text-balance">
              Your payment has been cancelled. If this was a mistake, please try
              again.
            </p>
            <Link
              href={"/dashboard"}
              className={buttonVariants({ className: "w-full mt-5" })}
            >
              <ArrowLeft className="size-4" />
              Go back to Homepage
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentCancelled;
