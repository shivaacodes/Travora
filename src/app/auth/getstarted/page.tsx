"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { buttonVariants } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ErrorMessage from "@/components/ErrorMessage";
import axios from "axios";

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  username: z.string().min(4, "Username must be at least 4 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormFields = z.infer<typeof schema>;

export default function GetStarted() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    console.log(data);
    try {
      const response = await axios.post("/api/users/signup", data);
      console.log("Data saved successfully!", response.data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error(
          "Error saving data:",
          error.response?.data || error.message
        );
      } else {
        console.error("Unexpected error:", error);
      }
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-screen font-urbanist">
      <div className="absolute inset-0 -z-10 bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>

      <Link
        href="/"
        className={buttonVariants({
          variant: "outline",
          className: "absolute top-5 right-5 flex items-center gap-2 py-2 px-4",
        })}
      >
        <FaArrowLeft className="size-5" /> Back to Homepage
      </Link>

      <Card className="mx-auto max-w-2xl p-4 rounded-3xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">
            You are almost finished!
          </CardTitle>
          <CardDescription className="text-lg text-gray-600">
            Enter your details to get started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="grid gap-6"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className="grid grid-cols-2 gap-6">
              <div className="grid gap-2">
                <Label>Name</Label>
                <Input {...register("name")} type="text" placeholder="Draco" />
                <ErrorMessage error={errors.name?.message} />
              </div>
              <div className="grid gap-2">
                <Label>Username</Label>
                <Input
                  {...register("username")}
                  type="text"
                  placeholder="draco123"
                />
                <ErrorMessage error={errors.username?.message} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input
                {...register("email")}
                type="email"
                placeholder="dracomalfoy@example.com"
              />
              <ErrorMessage error={errors.email?.message} />
            </div>
            <div className="grid gap-2">
              <Label>Password</Label>
              <Input
                {...register("password")}
                type="password"
                placeholder="password"
              />
              <ErrorMessage error={errors.password?.message} />
            </div>
            <Button type="submit">Get Started</Button>
          </form>
        </CardContent>
      </Card>

      <p className="mt-6 text-lg text-gray-700">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-red-600 hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
