import { redirect } from "next/navigation";
import { auth } from "";

export default async function requireUser() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login");
  }

  return session;
}
