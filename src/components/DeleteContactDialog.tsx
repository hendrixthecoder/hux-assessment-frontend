"use client";
import React, { useRef, useState } from "react";
import { User } from "@/types";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

interface PageProps {
  contact: User;
}

const DeleteContactDialog = ({ contact }: PageProps) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const handleOpenDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
      setIsDialogOpen(true);
    }
  };

  const handleCloseDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
      setIsDialogOpen(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/contacts/${contact._id}`);
      handleCloseDialog();
      toast.success("Contact deleted successfully!");

      router.refresh();
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.data?.message || "An error occurred";
        toast.error(errorMessage);
      } else {
        toast.error("An unexpected error occurred");
      }
    }

    handleCloseDialog();
  };

  return (
    <div>
      <button onClick={handleOpenDialog}>
        <Trash2 />
      </button>
      <dialog ref={dialogRef}>
        <p>
          Are you sure you want to delete {contact.firstName} {contact.lastName}
          ?
        </p>
        <button type="button" onClick={handleDelete}>
          Yes, delete
        </button>
        <button type="button" onClick={handleCloseDialog}>
          Cancel
        </button>
      </dialog>
    </div>
  );
};

export default DeleteContactDialog;
