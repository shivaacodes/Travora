"use client";

import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900">
      <button
        onClick={() => signIn("google")}
        className="flex items-center bg-white text-gray-900 px-4 py-2 rounded-2xl shadow hover:shadow-lg transition-all duration-200"
      >
        <FcGoogle className="text-2xl mr-2" /> {/* Google logo */}
        Sign in with Google
      </button>
    </div>
  );
}
