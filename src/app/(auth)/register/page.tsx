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

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-2xl font-bold">Register</h1>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full max-w-md p-6 border border-gray-300 rounded-lg shadow-md"
      >
        {/* Name field */}
        <div>
          <label className="block text-sm font-semibold mb-2">Name</label>
          <input
            {...form.register("name")}
            placeholder="Your Name"
            className="w-full py-2 px-4 rounded-lg border border-gray-300"
            required
          />
        </div>

        {/* Email field */}
        <div>
          <label className="block text-sm font-semibold mb-2">Email</label>
          <input
            type="email"
            {...form.register("email")}
            placeholder="you@example.com"
            className="w-full py-2 px-4 rounded-lg border border-gray-300"
            required
          />
        </div>

        {/* Username field */}
        <div>
          <label className="block text-sm font-semibold mb-2">Username</label>
          <input
            {...form.register("username")}
            placeholder="Username"
            className="w-full py-2 px-4 rounded-lg border border-gray-300"
            required
          />
        </div>

        {/* Password field */}
        <div>
          <label className="block text-sm font-semibold mb-2">Password</label>
          <input
            type="password"
            {...form.register("password")}
            placeholder="********"
            className="w-full py-2 px-4 rounded-lg border border-gray-300"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg mt-4 text-white bg-blue-600 hover:bg-blue-700"
        >
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
