"use client";

import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type RegisterFormInput = {
  name: string;
  email: string;
  username: string;
  password: string;
};

type SignupFormProps = {
  onRegister: (data: RegisterFormInput) => Promise<void>;
  loading: boolean;
  message: string;
};

export default function SignupForm({
  onRegister,
  loading,
  message,
}: SignupFormProps) {
  const form = useForm<RegisterFormInput>();

  const onSubmit = (data: RegisterFormInput) => {
    onRegister(data);
  };

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="space-y-8 max-w-lg mx-auto"
    >
      {/* Name field */}
      <div>
        <Label htmlFor="name" className="text-lg">
          Name
        </Label>
        <Input
          id="name"
          {...form.register("name")}
          placeholder="Name"
          className="p-4 text-lg"
          required
        />
      </div>

      {/* Email field */}
      <div>
        <Label htmlFor="email" className="text-lg">
          Email
        </Label>
        <Input
          id="email"
          type="email"
          {...form.register("email")}
          placeholder="you@example.com"
          className="p-4 text-lg"
          required
        />
      </div>

      {/* Username field */}
      <div>
        <Label htmlFor="username" className="text-lg">
          Username
        </Label>
        <Input
          id="username"
          {...form.register("username")}
          placeholder="Username"
          className="p-4 text-lg"
          required
        />
      </div>

      {/* Password field */}
      <div>
        <Label htmlFor="password" className="text-lg">
          Password
        </Label>
        <Input
          id="password"
          type="password"
          {...form.register("password")}
          placeholder="Password"
          className="p-4 text-lg"
          required
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={loading}
        className="w-[400px] py-3 text-lg h-12 rounded-lg"
      >
        {loading ? "..." : "Signup"}
      </Button>

      {/* Display messages */}
      {message && (
        <p
          className={`mt-4 text-center text-lg ${
            message.includes("Error") ? "text-red-500" : "text-green-500"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}
