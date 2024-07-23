import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "Phonebook",
  description: "Communicate better",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-svh">
      <main className="h-full p-4 md:p-10">{children}</main>
      <Toaster />
    </div>
  );
}
