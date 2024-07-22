"use client";
import React from "react";
import { AxiosError } from "axios";
import axios from "../../../config/axios";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import { registerValidationSchema } from "@/lib";
import { useRouter } from "next/navigation";

const CreateContactPage = () => {
  const { push } = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
    },
    validationSchema: registerValidationSchema,
    onSubmit: async (values) => {
      try {
        await axios.post("/api/contacts", values);

        toast.success("Contact created successfully!");
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
    <div>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        {formik.touched.email && formik.errors.email ? (
          <div>{formik.errors.email}</div>
        ) : null}

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        {formik.touched.password && formik.errors.password ? (
          <div>{formik.errors.password}</div>
        ) : null}

        <label htmlFor="firstName">First Name:</label>
        <input
          id="firstName"
          name="firstName"
          type="firstName"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        {formik.touched.firstName && formik.errors.firstName ? (
          <div>{formik.errors.firstName}</div>
        ) : null}

        <label htmlFor="lastName">Last Name:</label>
        <input
          id="lastName"
          name="lastName"
          type="lastName"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        {formik.touched.lastName && formik.errors.lastName ? (
          <div>{formik.errors.lastName}</div>
        ) : null}

        <label htmlFor="phoneNumber">Phone Number:</label>
        <input
          id="phoneNumber"
          name="phoneNumber"
          type="text"
          value={formik.values.phoneNumber}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
          <div>{formik.errors.phoneNumber}</div>
        ) : null}

        <button type="submit">Create Contact</button>
      </form>
    </div>
  );
};

export default CreateContactPage;
