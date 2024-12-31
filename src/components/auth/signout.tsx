import { signOut } from "next-auth/react";

export default function Signout() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">
        Are you sure you want to sign out?
      </h1>
      <div>
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Yes, Sign Out
        </button>
      </div>
    </div>
  );
}
