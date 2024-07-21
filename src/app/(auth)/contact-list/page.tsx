import { getSession } from "@/middleware";
import React from "react";

const page = async () => {
  const session = await getSession();
  return <div>Welcome {session?.firstName}</div>;
};

export default page;
