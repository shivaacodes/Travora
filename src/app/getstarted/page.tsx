"use client";

import ErrorMessage from "@/components/ErrorMessage";
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

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export default function GetStarted() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen w-screen flex items-center justify-center font-urbanist relative">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"></div>

      {/* Back to Homepage Button */}
      <Link
        href="/"
        className={buttonVariants({
          variant: "outline",
          className: "absolute top-5 right-5 py-2 px-4 flex items-center gap-2",
        })}
      >
        <FaArrowLeft className="size-5" /> Back to Homepage
      </Link>

      <Card className="max-w-sm mx-auto rounded-3xl">
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            You are almost finished!
          </CardTitle>
          <CardDescription>Enter your details to get started.</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            className="grid gap-4"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>First Name</Label>
                <Input
                  {...register("firstName")}
                  type="text"
                  placeholder="Draco"
                />
                <ErrorMessage error={errors.firstName?.message} />
              </div>
              <div className="grid gap-2">
                <Label>Last Name</Label>
                <Input
                  {...register("lastName")}
                  type="text"
                  placeholder="Malfoy"
                />
                <ErrorMessage error={errors.lastName?.message} />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>Email</Label>
              <Input
                {...register("email")}
                type="text"
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
            <Button>Get Started</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
