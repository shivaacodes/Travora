"use client";

import { signIn } from "next-auth/react";
import React from "react";

export default function signInPage() {
  return (
    <div>
      <h1>signInPage</h1>
      <button onClick={() => signIn("google")}>SignIn with Google</button>
    </div>
  );
}
