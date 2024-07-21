import { User } from "@/types";
import React from "react";
import { Icon, Icons } from "./Icons";
import Link from "next/link";

interface SidebarOptions {
  id: number;
  name: string;
  href: string;
  Icon: Icon;
}

const sidebarOptions: SidebarOptions[] = [
  {
    id: 1,
    name: "Create Contact",
    href: "/create-contact",
    Icon: "UserPlus",
  },
  {
    id: 2,
    name: "Contact List",
    href: "/contact-list",
    Icon: "UsersRound",
  },
];

const Sidebar = ({ session }: { session: User }) => {
  return (
    <div className="w-1/5 flex flex-col min-h-screen bg-gray-900 text-white p-4 flex-shrink-0">
      <p>Welcome {session.firstName}</p>
      <ul className="mt-2 space-y-1" role="list">
        {sidebarOptions.map((option) => {
          const Icon = Icons[option.Icon];
          return (
            <li key={option.id}>
              <Link
                href={option.href}
                className="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-3 rounded-md p-2 text-sm leading-6 font-semibold"
              >
                <span className="text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="truncate">{option.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
