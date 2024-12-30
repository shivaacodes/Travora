"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

type RegisterFormInput = {
  name: string;
  email: string;
  username: string;
  password: string;
};

//Server-side
export default function RegisterPage() {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<RegisterFormInput>();
  const router = useRouter();

  const onSubmit = async (data: RegisterFormInput) => {
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("/api/users/register", data);

      if (response.status === 201) {
        setMessage("User registered successfully!");
        // Redirect to login page after successful registration
        setTimeout(() => {
          router.push("/signin");
        }, 2000);
      } else {
        setMessage(`Error: ${response.data.error || response.data.message}`);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setMessage(
          `An unexpected error occurred: ${
            error.response?.data?.message || error.message
          }`
        );
      } else {
        setMessage("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };
  // Client-side
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* Name field */}
        <div>
          <label>Name</label>
          <input {...form.register("name")} placeholder="Your Name" required />
        </div>

        {/* Email field */}
        <div>
          <label>Email</label>
          <input
            type="email"
            {...form.register("email")}
            placeholder="you@example.com"
            required
          />
        </div>

        {/* Username field */}
        <div>
          <label>Username</label>
          <input
            {...form.register("username")}
            placeholder="Username"
            required
          />
        </div>

        {/* Password field */}
        <div>
          <label>Password</label>
          <input type="password" {...form.register("password")} required />
        </div>

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>

      {/* Display messages */}
      {message && (
        <p
          className={`mt-4 text-center ${
            message.includes("Error") ? "text-red-500" : "text-green-500"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
