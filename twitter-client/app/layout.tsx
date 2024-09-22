"use client"
import { Inter } from "next/font/google";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const inter = Inter({ subsets: ["latin"] });



const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <GoogleOAuthProvider clientId="422324338177-pklrgh2d7hsanmh0s2qje77ns3qgmefi.apps.googleusercontent.com">
            {children}
            <Toaster position="bottom-center" reverseOrder={true} />
            <ReactQueryDevtools initialIsOpen={false} />
          </GoogleOAuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
