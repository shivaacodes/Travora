import React from "react";
import { Appbar } from "@/components/custom/Appbar";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-900 via-rose-900 to-gray-900 animate-gradient-slow bg-[length:200%_200%]">
      <Appbar />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
                Your Unused Travel Plans, Someone Else&apos;s Dream Trip.
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-200 md:text-xl font-large">
                Explore personalized travel opportunities, buy or sell unused
                tickets, vouchers, and packages, and let AI find the best deals
                for you.
              </p>
            </div>
          </div>
        </div>
      </main>

      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl">
                Ready to turn your unused tickets into unforgettable journeys?
              </h2>
              <p className="mx-auto max-w-[600px] text-gray-100 md:text-xl">
                Join today and discover a world of possibilities with
                personalized travel deals!
              </p>
            </div>
            <div className="w-full max-w-sm">
              <Link
                href={{
                  pathname: "/auth",
                  query: {
                    authType: "signUp",
                  },
                }}
              >
                <Button className="bg-rose-600 text-white hover:bg-rose-800 ">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="flex w-full shrink-0 flex-col items-center gap-2 px-4 py-6 sm:flex-row md:px-6">
        <p className="text-sm text-white">Made with ⚡ by Shiva</p>
      </footer>
    </div>
  );
}
