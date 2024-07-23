"use client";
import React, { useState } from "react";
import { AxiosError } from "axios";
import axios from "../../../config/axios";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import { editContactValidationSchema } from "@/lib";
import { useRouter } from "next/navigation";

const CreateContactPage = () => {
  const { push, refresh } = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
    validationSchema: editContactValidationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);

        await axios.post("/api/contacts", values);

        toast.success("Contact created successfully!");
        push("/contact-list");
        refresh();
      } catch (error) {
        if (error instanceof AxiosError) {
          const errorMessage =
            error.response?.data?.data.message || "An error occurred";
          toast.error(errorMessage);
        } else {
          toast.error("An unexpected error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    },
  });
  return (
    <div className="h-full p-3">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col w-full md:w-1/2 items-center justify-center gap-2 h-full"
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
            <div className="text-red-500 text-xs">{formik.errors.email}</div>
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
            <div className="text-red-500 text-xs">
              {formik.errors.firstName}
            </div>
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
          {formik.touched.lastName && formik.errors.lastName ? (
            <div className="text-red-500 text-xs">{formik.errors.lastName}</div>
          ) : null}
        </div>

        <div className="flex flex-col gap-1 w-3/5">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="text"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            className="outline-none rounded p-2 border"
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
            <div className="text-red-500 text-xs">
              {formik.errors.phoneNumber}
            </div>
          ) : null}
        </div>

        <button
          type="submit"
          className="p-3 rounded bg-primary text-white w-3/5 mt-3"
        >
          Create Contact
        </button>
      </form>
    </div>
  );
};

export default CreateContactPage;
