/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ControlledInput from "../../Forms/ControlledInput";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { client } from "@/app/_utils/axios";
import { toast } from "react-toastify";

type Inputs = {
  email: string;
};

const ForgetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = useMutation({
    mutationFn: async (data: Inputs) => {
      const response = await client.post("/auth/forget-password", {
        email: data.email.toLowerCase(),
      });
      return response.data;
    },
    onSuccess: () => {
      toast.success("Password reset email sent successfully.");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message || "Error sending password reset email."
      );
    },
  });

  const handleFormSubmit: SubmitHandler<Inputs> = async (data) => {
    onSubmit.mutate(data); // Using mutate directly here with the form data
  };

  return (
    <div className="bg-gray-200 p-8 h-screen">
      <form
        className=" space-y-2 my-4 w-1/2 mx-auto space-y-4 px-4 py-6 bg-white shadow-md rounded-lg"
        onSubmit={handleSubmit(handleFormSubmit)}
        noValidate
      >
        <h3 className="text-xl font-bold">Forget Password</h3>
        <ControlledInput
          type="email"
          placeholder="Enter your email"
          errors={errors}
          register={register}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          }}
          name="email"
          classes={{
            input: "text-xl p-4",
          }}
          required
        />

        <button
          className="w-full rounded-md bg-red-500 px-6 py-4 text-xl font-medium text-white"
          type="submit"
        >
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgetPassword;
