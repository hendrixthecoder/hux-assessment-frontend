"use client";
import { User } from "@/types";
import React from "react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { editContactValidationSchema } from "@/lib";

interface PageProps {
  contact: User;
}

const EditContactForm = ({ contact }: PageProps) => {
  const { push } = useRouter();

  const formik = useFormik({
    initialValues: {
      email: contact.email,
      firstName: contact.firstName,
      lastName: contact.lastName,
      phoneNumber: contact.phoneNumber,
    },
    validationSchema: editContactValidationSchema,
    onSubmit: async (values) => {
      try {
        await axios.put(`/api/contacts/${contact._id}`, values, {
          withCredentials: true,
        });

        toast.success("Contact edited successfully!");

        push("/contact-list");
      } catch (error) {
        if (error instanceof AxiosError) {
          const errorMessage =
            error.response?.data?.data.message || "An error occurred";
          toast.error(errorMessage);
        } else {
          toast.error("An unexpected error occurred");
        }
      }
    },
  });
  return (
    <div className="flex h-full ">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col w-1/2 items-center justify-center gap-2 "
      >
        <div className="flex flex-col gap-1 w-3/5">
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            className="outline-none rounded p-2 border"
          />
          {formik.touched.email && formik.errors.email ? (
            <div>{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="flex flex-col gap-1 w-3/5">
          <label htmlFor="firstName">First Name:</label>
          <input
            id="firstName"
            name="firstName"
            type="firstName"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            className="outline-none rounded p-2 border"
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div>{formik.errors.firstName}</div>
          ) : null}
        </div>

        <div className="flex flex-col gap-1 w-3/5">
          <label htmlFor="lastName">Last Name:</label>
          <input
            id="lastName"
            name="lastName"
            type="lastName"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            className="outline-none rounded p-2 border"
          />
        </div>

        <div className="flex flex-col gap-1 w-3/5">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="phoneNumber"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            className="outline-none rounded p-2 border"
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
            <div>{formik.errors.phoneNumber}</div>
          ) : null}
        </div>

        <button
          type="submit"
          className="p-3 rounded bg-primary text-white w-3/5 mt-3"
        >
          Edit contact
        </button>
      </form>
    </div>
  );
};

export default EditContactForm;
