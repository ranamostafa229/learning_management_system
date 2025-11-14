import Link from "next/link";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

const EmptyState = ({
  description,
  href,
  buttonText,
}: {
  description: string;
  href?: string | null;
  buttonText?: string | null;
}) => {
  return (
    <div className={cn("bg-card p-8 space-y-3 ")}>
      <div
        className={cn(
          "text-center ",
          buttonText
            ? "flex flex-wrap items-center justify-center lg:justify-between gap-3"
            : "flex-col"
        )}
      >
        <p className="text-muted-foreground text-sm sm:text-base">
          {description}
        </p>
        {buttonText && (
          <Link
            href={href || "#"}
            className={buttonVariants({
              size: "sm",
            })}
          >
            {buttonText}
          </Link>
        )}
      </div>
    </div>
  );
};

export default EmptyState;
