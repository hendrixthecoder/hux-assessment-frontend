"use client";
import { useRef, useState } from "react";
import { User } from "@/types";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

interface PageProps {
  contact: User;
}

const DeleteContactDialog = ({ contact }: PageProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  const handleOpenDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  const handleCloseDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/contacts/${contact._id}`);
      handleCloseDialog();
      toast.success("Contact deleted successfully!");

      // To visualize the absence of the deleted contact
      router.refresh();
    } catch (error) {
      if (error instanceof AxiosError) {
        const errorMessage =
          error.response?.data?.data?.message || "An error occurred";
        toast.error(errorMessage);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
      handleCloseDialog();
    }
  };

  return (
    <div>
      <button onClick={handleOpenDialog}>
        <Trash2 />
      </button>
      <dialog ref={dialogRef} className="rounded p-3 flex flex-col gap-3">
        <p>
          Are you sure you want to delete {contact.firstName} {contact.lastName}{" "}
          contact?
        </p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 text-white rounded-md p-2"
          >
            Yes, delete
          </button>
          <button type="button" onClick={handleCloseDialog}>
            Cancel
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default DeleteContactDialog;
