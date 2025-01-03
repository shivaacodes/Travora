import { useSidebar } from "@/hooks/useSidebar";
import { Sidebar } from "../ui/sidebar";

export default function Dashboard() {
  const { isOpen, toggleSidebar } = useSidebar();

  return (
    <div className="min-h-screen flex">
      <button
        onClick={toggleSidebar}
        className="m-4 p-2 bg-blue-500 text-white rounded-md"
      >
        {isOpen ? "Close Sidebar" : "Open Sidebar"}
      </button>
      {isOpen && <Sidebar />}
      <main className="flex-1 p-8">Welcome to the Dashboard!</main>
    </div>
  );
}
