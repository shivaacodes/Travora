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

// Schema validation
const schema = z.object({
  email: z.string().email(),
});

type FormFields = z.infer<typeof schema>;

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(schema),
  });

  // Form submission handler
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
  };

  return (
    <div className="relative h-screen w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
      {/* Back to Homepage Link */}
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

      {/* Login Form */}
      <div className="flex h-full items-center justify-center px-4">
        <Card className="max-w-2xl rounded-2xl font-urbanist">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription>
              Enter your email to access your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="text-red-600">{errors.email.message}</p>
                )}
              </div>
              <SubmitButton text="Login" />
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
