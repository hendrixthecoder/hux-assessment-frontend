"use client";
import Lottie from "lottie-react";
import PhoneAnimation from "../../public/assets/landing-phone.json";
import Link from "next/link";

export default function Home() {
  return (
    <main className="h-svh flex w-full p-4 md:p-10">
      <div className="w-full sm:w-1/2 flex flex-col h-full justify-center gap-5">
        <p className="font-extrabold text-5xl md:text-6xl">
          Simplify your connections and never miss a beat, all in one Cliq!
        </p>
        <p className="text-xl">
          Create, edit and manage your contacts in just a few steps!
        </p>
        <div className="flex items-center gap-3">
          <Link href="/register" className="p-3 rounded bg-primary text-white">
            Create account
          </Link>
          <Link
            href="/login"
            className="p-3 rounded border border-primary text-primary"
          >
            Login
          </Link>
        </div>
      </div>
      <div className="hidden sm:flex w-1/2 h-full items-center justify-center">
        <Lottie animationData={PhoneAnimation} />
      </div>
    </main>
  );
}
