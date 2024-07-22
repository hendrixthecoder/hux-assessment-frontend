import { getSession } from "@/middleware";
import { fetchUserContact } from "@/utils";
import { notFound } from "next/navigation";
import React from "react";
import EditContactForm from "@/components/EditContactForm";

interface PageProps {
  params: {
    contactId: string;
  };
}

const EditContactPage = async ({ params }: PageProps) => {
  const contactId = params.contactId;
  const session = await getSession();
  if (!session) return notFound();

  const contact = await fetchUserContact(contactId);
  if (!contact) return <p>Contact not found!</p>;

  return (
    <div>
      {contact?.firstName}
      <EditContactForm contact={contact} />
    </div>
  );
};

export default EditContactPage;
