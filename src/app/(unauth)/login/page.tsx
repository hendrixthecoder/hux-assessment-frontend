"use client";
import axios, { AxiosError } from "axios";
import { toast } from "react-hot-toast";
import { useFormik } from "formik";
import { loginValidationSchema } from "@/lib";
import { useRouter } from "next/navigation";
import Lottie from "lottie-react";
import LoginAnimation from "../../../../public/assets/login-animation.json";
import Link from "next/link";
import { useState } from "react";

const LoginForm = () => {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);

        await axios.post("/api/auth/login", values, {
          withCredentials: true,
        });

        toast.success("Login successful!");

        push("/contact-list");
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
        </div>
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500 text-xs">{formik.errors.email}</div>
        ) : null}
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
        <button
          type="submit"
          className="p-3 rounded bg-primary text-white w-3/5 mt-3"
        >
          Login
        </button>
        <div className="flex items-center justify-between gap-3 w-3/5">
          <Link className="text-xs text-primary" href="/">
            Back Home
          </Link>

          <Link className="text-xs text-primary" href="/register">
            Don&apos;t have an account? Register
          </Link>
        </div>
      </form>
      <div className="hidden sm:flex w-1/2 min-h-full items-center justify-center">
        <Lottie animationData={LoginAnimation} />
      </div>
    </div>
  );
};

export default LoginForm;
