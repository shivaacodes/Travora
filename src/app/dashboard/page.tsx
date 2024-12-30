"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1>Welcome to TradeTrail</h1>
      <button className="btn" onClick={() => router.push("/signin")}>
        Login
      </button>
      <button className="btn" onClick={() => router.push("/register")}>
        Signup
      </button>
    </div>
  );
}
