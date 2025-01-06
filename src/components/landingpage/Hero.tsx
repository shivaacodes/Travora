"use client";

import Link from "next/link";
import { GithubButton } from "@/components/landingpage/GithubButton";

export default function Hero() {
  return (
    <>
      {/* Header */}
      <div className="absolute flex justify-between items-center p-6 sm:p-8 px-4 sm:px-12 z-50 top-0 w-full">
        <h2 className="text-3xl sm:text-4xl flex items-center font-urbanist gap-1 font-bold">
          Travora
        </h2>
        <div className="flex gap-4 font-urbanist font-semibold">
          <GithubButton />
          <Link
            className="text-black border-2 border-black/80 px-6 py-1.5 sm:py-1.5 text-sm sm:text-base rounded-full"
            href="/auth/getstarted"
          >
            Sign up
          </Link>
          <Link
            className="text-black border-2 border-black/80 px-6 py-1.5 sm:py-1.5 text-sm sm:text-base rounded-full font-urbanist"
            href="/auth/login"
          >
            Sign in
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col h-screen px-6 w-full absolute justify-center items-center overflow-hidden bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute right-0 opacity-80 h-full sm:[mask-image:radial-gradient(600px_circle_at_center,white,transparent)] [mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"></div>
        <h1 className="pointer-events-none leading-tight sm:leading-none bg-white/30 w-full max-w-5xl sm:max-w-4xl z-50 whitespace-pre-wrap text-center text-5xl sm:text-8xl font-semibold font-urbanist mt-[-6rem] sm:mt-[-8rem]">
          Travel deals just got{" "}
          <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-800 bg-clip-text text-transparent">
            effortlessly yours!
          </span>{" "}
        </h1>
        <p className="text-lg font-semibold text-gray-700 sm:text-xl max-w-72 sm:max-w-xl text-center font-urbanist mt-4"></p>
      </div>
    </>
  );
}
