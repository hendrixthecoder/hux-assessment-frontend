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

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/contacts/${contact._id}`);
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
    }
  };

  return (
    <div>
      <button
        disabled={isLoading}
        className={isLoading ? "cursor-not-allowed" : ""}
        onClick={handleDelete}
      >
        <Trash2 />
      </button>
    </div>
  );
};

export default DeleteContactDialog;
