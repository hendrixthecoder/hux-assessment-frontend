"use server";
import { getSession, logout } from "@/middleware";
import React from "react";

const page = async () => {
  const session = await getSession();

  return (
    <div>
      Welcome {session?.firstName}
      <form action="/api/auth/logout" method="POST">
        <button type="submit">Logout</button>
      </form>
    </div>
  );
};

export default page;
