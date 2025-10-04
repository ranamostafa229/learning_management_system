import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function useSignout() {
  const router = useRouter();
  const handleSignout = async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login");
          toast.success("Logged out successfully");
        },
        onError: (error) => {
          console.log(error.error.message);
          toast.error(`Failed to log out`);
        },
      },
    });
  };
  return handleSignout;
}
