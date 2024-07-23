"use client";
import Lottie from "lottie-react";
import PhoneAnimation from "../../public/assets/landing-phone.json";

export default function Home() {
  return (
    <main className="h-svh flex w-full bg-[#FADAEA]">
      <div className="w-full sm:w-1/2 flex h-full items-center ">HI there</div>
      <div className="hidden sm:flex w-1/2 h-full items-center justify-center">
        <Lottie animationData={PhoneAnimation} />
      </div>
    </main>
  );
}
