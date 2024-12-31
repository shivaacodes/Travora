"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import SignupForm from "@/components/auth/signup";

export default function SignupPage() {
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleRegister = async (data: {
    name: string;
    email: string;
    username: string;
    password: string;
  }) => {
    setLoading(true);
    setMessage("");

    try {
      const response = await axios.post("/api/users/register", data);

      if (response.status === 201) {
        setMessage("User registered successfully!");
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
      <SignupForm
        onRegister={handleRegister}
        loading={loading}
        message={message}
      />
    </div>
  );
}
