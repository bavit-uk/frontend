/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter, useSearchParams } from "next/navigation"; // For handling token from URL
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { client } from "@/app/_utils/axios";
import { toast } from "react-toastify";
import { useState } from "react";
import ControlledInput from "@/app/_components/Forms/ControlledInput";

type Inputs = {
  newPassword: string;
  confirmPassword: string;
};

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("resetToken"); // Extract the token from the URL

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onChange",
  });

  const newPassword = watch("newPassword");

  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const onSubmit = useMutation({
    mutationFn: async (data: Inputs) => {
      setLoading(true);
      const response = await client.post("/auth/reset-password", {
        token,
        password: data.newPassword,
      });
      setLoading(false);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Password reset successfully.");
      router.push("/login");
    },
    onError: (error: any) => {
      setLoading(false);
      toast.error(error.response?.data?.message || "Error resetting password.");
    },
  });

  return (
    <div className="bg-gray-200 p-8 h-screen flex items-center justify-center">
      <form
        className="space-y-4 w-full max-w-md px-6 py-8 bg-white shadow-md rounded-lg"
        onSubmit={handleSubmit((data) => onSubmit.mutate(data))}
        noValidate
      >
        <h3 className="text-2xl font-bold text-center mb-6">Reset Password</h3>

        <ControlledInput
          type="password"
          placeholder="New Password"
          errors={errors}
          register={register}
          name="newPassword"
          rules={{
            required: "New Password is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
            pattern: {
              value:
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                "Password must contain 1 uppercase, 1 lowercase, 1 number, and 1 special character",
            },
          }}
          classes={{
            input: "text-xl p-4",
          }}
          required
        />

        <ControlledInput
          type="password"
          placeholder="Confirm New Password"
          errors={errors}
          register={register}
          name="confirmPassword"
          rules={{
            required: "Confirm Password is required",
            validate: (value) =>
              value === newPassword || "The passwords do not match",
          }}
          classes={{
            input: "text-xl p-4",
          }}
          required
        />

        <button
          className="w-full rounded-md bg-red-500 px-6 py-4 text-xl font-medium text-white"
          type="submit"
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
