import Footer from "@/components/landingpage/Footer";
import { GithubButton } from "@/components/landingpage/GithubButton";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full items-center justify-center min-h-screen">
      <GithubButton />
      Hello World!
      <Footer />
    </div>
  );
}
