"use server";
import { fetchUserContacts } from "@/utils";
import React from "react";
import { UserRoundPen } from "lucide-react";
import DeleteContactDialog from "@/components/DeleteContactDialog";

const ContactListPage = async () => {
  const contacts = await fetchUserContacts();

  return (
    <div className="h-full p-3">
      <div className="flex flex-col gap-1">
        {contacts.length ? (
          contacts.map((contact, idx) => (
            <div className="flex gap-2" key={idx}>
              <a
                href={`/contact/${contact._id}`}
              >{`${contact.firstName} ${contact.lastName}`}</a>
              <a href={`/contact/edit/${contact._id}`}>
                <UserRoundPen />
              </a>
              <DeleteContactDialog contact={contact} />
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
