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

export default function Login() {
  return (
    <div className="relative h-screen w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
      {/* <div className="absolute inset-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)] -z-10"></div> */}
      <Link
        href="/"
        className={buttonVariants({
          variant: "outline",
          className: "absolute top-5 right-5 py-2 px-4 flex items-center gap-2",
        })}
      >
        <FaArrowLeft className="size-5" /> Back to Homepage
      </Link>

      <div className="flex h-full items-center justify-center px-4">
        <Card className="font-urbanist max-w-2xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription>
              Enter your email to access your account.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label>Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="john@example.com"
                />
              </div>
              <SubmitButton text="Login" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
