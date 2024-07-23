"use client";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import { registerValidationSchema } from "@/lib";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import RegisterAnimation from "../../../../public/assets/register-animation.json";
import Link from "next/link";
import { useState } from "react";

const RegisterForm = () => {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
        setIsLoading(true);

        await axios.post("/api/auth/register", values, {
          withCredentials: true,
        });

        toast.success("Registered successfully!");
        push("/contact-list");
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
    },
  });

  return (
    <div className="flex h-full w-full">
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col w-full md:w-1/2 items-center justify-center gap-2"
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
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            required
            className="outline-none rounded p-2 border"
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-xs">{formik.errors.password}</div>
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
          className={`p-3 rounded bg-primary text-white w-3/5 mt-3 ${
            isLoading ? "cursor-not-allowed" : ""
          }`}
        >
          Get me started!
        </button>

        <div className="flex items-center justify-between gap-3 w-3/5">
          <Link className="text-xs text-primary" href="/">
            Back Home
          </Link>

          <Link className="text-xs text-primary" href="/login">
            Have an account? Login
          </Link>
        </div>
      </form>
      <div className="hidden sm:flex w-1/2 min-h-full items-center justify-center">
        <Lottie animationData={RegisterAnimation} />
      </div>
    </div>
  );
};

export default RegisterForm;
