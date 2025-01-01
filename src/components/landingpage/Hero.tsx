"use client";

import SparklesText from "@/components/magicui/sparkles-text";
import Footer from "./Footer";
import Link from "next/link";
import Globe from "../magicui/globe";

export default function Hero() {
  return (
    <>
      {/* Header */}
      <div className="absolute flex justify-between items-center p-6 sm:p-8 px-4 sm:px-12 z-50 top-0 w-full">
        <h2 className="text-3xl sm:text-4xl flex items-center font-urbanist gap-1 font-semibold">
          Travora
        </h2>
        <div className="flex gap-2">
          <Link
            className="text-black border-2 border-black/80 px-6 font-urbanist font-semibold py-1.5 sm:py-1.5 text-sm sm:text-base rounded-full"
            href="/signup"
          >
            Sign up
          </Link>

          <Link
            className="text-black border-2 border-black/80 px-6 font-urbanist font-semibold py-1.5 sm:py-1.5 text-sm sm:text-base rounded-full"
            href="/signin"
          >
            Sign in
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col h-screen px-6 w-full absolute justify-center items-center overflow-hidden rounded-lg bg-white">
        <div className="right-0 opacity-80 absolute h-full sm:[mask-image:radial-gradient(600px_circle_at_center,white,transparent)] [mask-image:radial-gradient(300px_circle_at_center,white,transparent)]"></div>
        <h1 className="pointer-events-none leading-tight sm:leading-none bg-white/30 font-urbanist w-full max-w-5xl sm:max-w-4xl z-50 whitespace-pre-wrap text-center text-4xl sm:text-7xl font-semibold">
          Turn Unused Travel Deals Into{" "}
          <SparklesText
            className="sm:mb-3 font-medium text-purple-700 font-playwrite"
            text="Magical "
          />
          Adventures with Travora
        </h1>
        <p className="text-lg font-semibold text-gray-700 sm:text-xl max-w-72 sm:max-w-xl text-center font-urbanist mt-4">
          {/* Turn your unused tickets into memories for someone else—personalized
          deals, instant exchanges, and endless possibilities. */}
        </p>

        <Globe />

        <Footer />
      </div>
    </>
  );
}
