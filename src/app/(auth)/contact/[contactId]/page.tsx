import { getSession } from "@/middleware";
import { fetchUserContact } from "@/utils";
import { notFound } from "next/navigation";
import React from "react";

interface PageProps {
  params: {
    contactId: string;
  };
}

const ContactPage = async ({ params }: PageProps) => {
  const contactId = params.contactId;
  const session = await getSession();
  if (!session) return notFound();

  const contact = await fetchUserContact(contactId);
  if (!contact) return <p>Contact not found!</p>;

  return (
    <div className="p-3 h-full flex flex-col gap-3">
      <h1 className="text-xl">Contact Details</h1>
      <div className="flex flex-col gap-2">
        {contact.firstName} {contact.lastName}
      </div>
      <div className="flex flex-col gap-2">{contact.phoneNumber}</div>
      <div className="flex flex-col gap-2">{contact.email}</div>
    </div>
  );
};

export default ContactPage;
