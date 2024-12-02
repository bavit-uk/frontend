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
      const response = await client.post("/auth/forgot-password", {
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
            required: "Email address is required", // Handling empty email
            validate: {
              containsAtSymbol: (value) => {
                if (!value.includes('@')) {
                  return "Email must contain '@' symbol"; // Custom check for '@'
                }
                return true; // If '@' exists, proceed to next validation
              },
              validEmailFormat: (value) => {
                // Split the email into two parts using '@'
                const parts = value.split('@');
                if (parts.length !== 2) {
                  return "Email must have a valid domain after '@'"; // Ensures only one '@' exists
                }
                
                const [localPart, domainPart] = parts;
        
                // Check if both parts are non-empty and the domain part has a dot (.)
                if (!localPart || !domainPart || !domainPart.includes('.')) {
                  return "Invalid email format. Please provide a valid domain."; // Checks domain validity
                }
                
                return true; // If everything passes
              },
              minLength: (value) => {
                // Min length validation (adjust as needed)
                if (value.length < 5) {
                  return "Email must be at least 5 characters long"; // Minimum length error message
                }
                return true;
              },
              maxLength: (value) => {
                // Max length validation (adjust as needed)
                if (value.length > 50) {
                  return "Email must be no more than 50 characters long"; // Maximum length error message
                }
                return true;
              }
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
