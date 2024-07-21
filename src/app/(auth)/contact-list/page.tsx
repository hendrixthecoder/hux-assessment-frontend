"use server";
import { fetchUserContacts } from "@/utils";
import React from "react";

const ContactListPage = async () => {
  const contacts = await fetchUserContacts();

  return (
    <div className="bg-slate-900 text-white h-full">
      {contacts.length ? (
        contacts.map(({ firstName, lastName }, idx) => (
          <div key={idx}>{`${firstName} ${lastName}`}</div>
        ))
      ) : (
        <div>No contacts, create contacts to see them here.</div>
      )}
    </div>
  );
};

export default ContactListPage;
