import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const myFont = localFont({ src: "../../public/fonts/Hoeflers/Hoeflers.otf" });

export const metadata: Metadata = {
  title: "Phonebook",
  description: "Communicate better",
};

export const dynamic = "force-dynamic";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={myFont.className}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
