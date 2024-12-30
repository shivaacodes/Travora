import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useRedirect(redirectPath = "/") {
  const { status } = useSession(); // Destructure for cleaner code
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(redirectPath);
    }
  }, [status, redirectPath]); // Dependencies for proper reactivity
}
