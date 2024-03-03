import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import MainNav from "@/components/MainNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SeuPC",
  description: "Site SeuPC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`flex flex-row  ${inter.className}`} >
        <MainNav />
        <div className="w-full" >
        {children}
        </div>
        </body>
    </html>
  );
}
