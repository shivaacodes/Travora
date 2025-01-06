"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import SubmitButton from "@/components/SubmitButtons";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { FaArrowLeft } from "react-icons/fa";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Loader from "@/components/Loader";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password field cannot be empty."),
});

type FormFields = z.infer<typeof schema>;

export default function Login() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
    setLoading(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] px-4">
      <Link
        href="/"
        className={buttonVariants({
          variant: "outline",
          className: "absolute top-5 right-5 flex items-center gap-2 py-2 px-4",
        })}
      >
        <FaArrowLeft className="size-5" />
        Back to Homepage
      </Link>

      <div className="flex flex-col items-center space-y-6">
        <Card className="max-w-2xl p-4 rounded-3xl font-urbanist">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Login</CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Enter your email to access your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="flex flex-col space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register("email")}
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    {...register("password")}
                    id="password"
                    type="password"
                    placeholder="password"
                  />
                  {errors.password && (
                    <p className="text-red-600 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>
              <SubmitButton text="Login" />
            </form>
          </CardContent>
        </Card>

        <p className="text-lg text-gray-700 font-urbanist">
          New User?{" "}
          <Link
            href="/auth/getstarted"
            className="text-red-600 hover:underline"
          >
            Get Started
          </Link>
        </p>
      </div>
    </div>
  );
}
