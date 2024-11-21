/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useForm } from "react-hook-form";
import ControlledInput from "../../Forms/ControlledInput";
import { useMutation } from "@tanstack/react-query";
import { client } from "@/app/_utils/axios";
import { toast } from "react-toastify";

type Inputs = {
  newPassword: string;
  confirmPassword: string;
};

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "onChange",
  });

  const newPassword = watch("newPassword");

  const onSubmit = useMutation({
    mutationFn: async (data: Inputs) => {
      // API endpoint might be different based on your backend setup
      const response = await client.post("/auth/reset-password", {
        password: data.newPassword,
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Password reset successfully.");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Error resetting password.");
    },
  });

  return (
    <form
      className="space-y-4 px-4"
      onSubmit={handleSubmit((data) => onSubmit.mutate(data))}
      noValidate
    >
      <h3 className="text-xl font-bold">Reset Password</h3>
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
        className="w-full rounded-md bg-primary px-6 py-4 text-xl font-medium text-white"
        type="submit"
      >
        Reset Password
      </button>
    </form>
  );
};

export default ResetPassword;
