"use client";
import axios, { AxiosError } from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { loginValidationSchema } from "@/lib";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const { push } = useRouter();
  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: loginValidationSchema,
    onSubmit: async (values) => {
      try {
        await axios.post("/api/auth/login", values, {
          withCredentials: true,
        });

        push("/contact-list");

        toast.success("Login successful!");
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

      <button type="submit">Login</button>
      <Toaster />
    </form>
  );
};

export default LoginForm;
