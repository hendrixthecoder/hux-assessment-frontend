"use server";
import { fetchUserContacts } from "@/utils";
import Link from "next/link";
import React from "react";
import { UserRoundPen, Trash2 } from "lucide-react";

const ContactListPage = async () => {
  const contacts = await fetchUserContacts();

  return (
    <div className="bg-slate-900 text-white h-full">
      <div className="flex flex-col gap-1">
        {contacts.length ? (
          contacts.map(({ firstName, lastName, _id }, idx) => (
            <div className="flex gap-2" key={idx}>
              <a href={`/contact/${_id}`}>{`${firstName} ${lastName}`}</a>
              <a href={`/contact/edit/${_id}`}>
                <UserRoundPen />
              </a>
              <button>
                <Trash2 />
              </button>
            </div>
          ))
        ) : (
          <div>No contacts, create contacts to see them here.</div>
        )}
      </div>
    </div>
  );
};

export default ContactListPage;
