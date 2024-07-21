"use server";
import { getSession } from "@/middleware";
import { fetchUserContacts } from "@/utils";
import { notFound } from "next/navigation";
import React from "react";

const ContactListPage = async () => {
  const session = await getSession();
  if (!session) notFound();

  const contacts = await fetchUserContacts();

  return (
    <div>
      Welcome {session?.firstName}
      {contacts.length ? (
        contacts.map(({ firstName, lastName }, idx) => (
          <p key={idx}>{`${firstName} ${lastName}`}</p>
        ))
      ) : (
        <p>No contacts, create contacts to see them here.</p>
      )}
      {/* <form action="/api/auth/logout" method="POST">
        <button type="submit">Logout</button>
      </form> */}
    </div>
  );
};

export default ContactListPage;
