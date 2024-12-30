"use client";

import { signIn } from "next-auth/react";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1>Login</h1>
      <button onClick={() => signIn("credentials")}>Sign in with Email</button>
      <button onClick={() => signIn("google")}>Sign in with Google</button>
    </div>
  );
}
