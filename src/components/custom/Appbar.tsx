"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function Appbar({ isSpectator = false }) {
  const router = useRouter();

  return (
    <div className="flex justify-between px-2 py-4 md:px-10 xl:px-20">
      <div
        onClick={() => {
          router.push("/home");
        }}
        className="flex flex-col justify-center text-lg font-bold text-white hover:cursor-pointer"
      >
        Travora
      </div>
      <div className="flex items-center gap-x-4">
        {isSpectator && (
          <Button className="bg-gray-600 text-white hover:bg-gray-700">
            Wallet
          </Button>
        )}
        <div className="space-x-3">
          <Link
            href={{
              pathname: "/auth",
              query: {
                authType: "signUp",
              },
            }}
          >
            <Button variant={"ghost"} className="text-white hover:bg-white/10">
              Signup
            </Button>
          </Link>
          <Button
            className="bg-rose-600 text-white hover:bg-rose-800"
            onClick={() => alert("Sign-in functionality here")}
          >
            Sign In
          </Button>
        </div>
        <Button
          className="bg-rose-600 text-white hover:bg-rose-800"
          onClick={() => alert("Logout functionality here")}
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
