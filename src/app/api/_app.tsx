import { AppProps } from "next/app";
import { SidebarProvider } from "@/hooks/useSidebar";
import "@/styles/globals.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SidebarProvider>
      <Component {...pageProps} />
    </SidebarProvider>
  );
}
