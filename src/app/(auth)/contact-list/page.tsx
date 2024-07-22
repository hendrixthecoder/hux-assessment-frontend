"use server";
import { fetchUserContacts } from "@/utils";
import Link from "next/link";
import React from "react";

const ContactListPage = async () => {
  const contacts = await fetchUserContacts();

  return (
    <div className="bg-slate-900 text-white h-full">
      <div className="flex flex-col gap-1">
        {contacts.length ? (
          contacts.map(({ firstName, lastName, _id }, idx) => (
            <Link
              href={`/contact/${_id}`}
              key={idx}
            >{`${firstName} ${lastName}`}</Link>
          ))
        ) : (
          <div>No contacts, create contacts to see them here.</div>
        )}
      </div>
    </div>
  );
};

export default ContactListPage;
