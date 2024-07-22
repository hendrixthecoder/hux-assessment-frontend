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

  return <div>{contact?.firstName}</div>;
};

export default ContactPage;
