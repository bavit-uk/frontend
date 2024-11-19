"use client";

import ControlledInput from "@components/Forms/ControlledInput";
import ControlledSelect from "@components/Forms/ControlledSelect";
import Divider from "@components/Layout/Divider";
import { closeModal, openModal } from "@lib/features/auth/authSlice";
import { useForm } from "react-hook-form";
import GoogleLogo from "@assets/Icons/google.webp";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { client } from "@utils/axios";
import { AxiosError } from "axios";
import Loader from "@components/Loader";
import { useGoogleLogin } from "@react-oauth/google";
import { useAppDispatch } from "@lib/hooks";
import { toast } from "react-toastify";
import Modal from "@components/ui/Modal";
import { useState } from "react";
import Button from "@components/ui/Button";

type Inputs = {
  userType: "Seller" | "Customer";
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type GoogleTokenType = {
  authuser: string;
  code: string;
  prompt: string;
  scope: string;
};

const Register = ({}) => {
  const dispatch = useAppDispatch();
  const [googleToken, setGoogleToken] = useState<string | null>(null);
  const [isUserTypeModalOpen, setIsUserTypeModalOpen] = useState(false);
  const [userType, setUserType] = useState("Customer");
  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    formState: { errors },
  } = useForm<Inputs>({
    reValidateMode: "onChange",
  });

  const close = () => {
    dispatch(closeModal());
  };

  const onSubmit = useMutation({
    mutationFn: async (data: Inputs) => {
      data.email = data.email.toLowerCase();
      data.userType = "Customer";
      const response = await client.post("/auth/signup", data);
      return response.data.data;
    },
    onSuccess: (data: User, inputs) => {
      toast.success("You have successfully registered");
      dispatch(openModal({ mode: "login" }));
    },
    onError: (error: AxiosError<any>) => {
      console.log(error.response?.data);
      toast.error(error.response?.data?.message || "There was an error registering");
    },
  });

  const googleSignup = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (codeResponse) => {
      setGoogleToken(codeResponse.code || null);
      setIsUserTypeModalOpen(true);
    },
    onError: (errorResponse) => {
      console.log(errorResponse);
      toast.error("Failed to signup using google.");
    },
  });

  const handleSignupWithGoogle = useMutation({
    mutationFn: async () => {
      return client.post("/auth/signup-with-google", {
        code: googleToken,
        credentials: "customHooks",
        // userType: userType,
        userType: "Customer",
      });
    },
    onSuccess: (response) => {
      toast.success(response.data.message);
      setIsUserTypeModalOpen(false);
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(error.response.data.message || "Failed to signin with google.");
    },
  });

  return (
    <>
      <form className="mt-4 space-y-2" onSubmit={handleSubmit((data) => onSubmit.mutate(data))} noValidate>
        {onSubmit.isPending && <Loader />}
        {/* <ControlledSelect
          errors={errors}
          register={register}
          rules={{
            required: "User Type is required",
          }}
          {...register("userType")}
          options={[
            { value: "Seller", label: "Seller" },
            { value: "Customer", label: "Customer" },
          ]}
          classes={{
            select: "text-xl px-4 py-3",
          }}
          required
        /> */}

        <ControlledInput
          type="text"
          placeholder="First Name"
          errors={errors}
          register={register}
          rules={{
            required: "First Name is required",
            pattern: {
              value: /^[a-z ,.'-]+$/i,
              message: "Invalid First Name",
            },
            minLength: {
              value: 2,
              message: "First Name should be atleast 2 characters",
            },
          }}
          {...register("firstName")}
          classes={{
            input: "text-xl px-4 py-3",
          }}
          required
        />

        <ControlledInput
          type="text"
          placeholder="Last Name"
          errors={errors}
          register={register}
          rules={{
            required: "Last Name is required",
            pattern: {
              value: /^[a-z ,.'-]+$/i,
              message: "Invalid Last Name",
            },
            minLength: {
              value: 2,
              message: "Last Name should be atleast 2 characters",
            },
          }}
          {...register("lastName")}
          classes={{
            input: "text-xl px-4 py-3",
          }}
          required
        />

        <ControlledInput
          type="tel"
          placeholder="Cell Number"
          mask={"+1(999)-999-9999"}
          errors={errors}
          register={register}
          rules={{
            required: "Cell Number is required",
            pattern: {
              value: /^(\+1\s?)?(\d{3}|\(\d{3}\))[\s\-]?\d{3}[\s\-]?\d{4}$/,
              message: "Invalid Cell Number",
            },
          }}
          {...register("phoneNumber")}
          classes={{
            input: "text-xl px-4 py-3",
          }}
          required
        />

        <ControlledInput
          type="email"
          placeholder="Email"
          errors={errors}
          register={register}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Invalid email address",
            },
          }}
          {...register("email")}
          classes={{
            input: "text-xl px-4 py-3",
          }}
          required
        />

        <ControlledInput
          type="password"
          placeholder="Password"
          errors={errors}
          register={register}
          rules={{
            required: "Password is required",
            pattern: {
              value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message: "Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character",
            },
          }}
          {...register("password")}
          classes={{
            input: "text-xl px-4 py-3",
          }}
          required
        />

        <ControlledInput
          type="password"
          placeholder="Confirm Password"
          errors={errors}
          register={register}
          rules={{
            required: "Confirm Password is required",
            validate: (value) => value === watch("password") || "Passwords do not match",
          }}
          {...register("confirmPassword")}
          classes={{
            input: "text-xl px-4 py-3",
          }}
          required
        />

        <button
          className="w-full rounded-md bg-primary px-6 py-4 text-xl font-medium text-white"
          // onClick={close}
          type="submit"
        >
          Sign Up
        </button>

        <Divider
          label="or"
          classes={{
            divider: "!my-8",
            label: "text-xl uppercase -top-3",
          }}
        />

        <button
          type="button"
          className="mx-auto flex items-center justify-center gap-4 rounded-md border border-gray-600/50 px-8 py-2"
          onClick={() => googleSignup()}
        >
          <Image src={GoogleLogo} alt="Google Logo" width={48} height={48} />
          <p className="text-xl text-gray-600">Sign Up with Google</p>
        </button>

        <p className="text-center text-lg text-gray-500">
          Already have an account?{" "}
          <button
            onClick={() => {
              dispatch(openModal({ mode: "login" }));
            }}
            className="text-primary hover:underline"
          >
            Login Here
          </button>
        </p>
      </form>
      {/* <button onClick={() => setIsUserTypeModalOpen(true)}>Open MODAL {userType}</button> */}
      <Modal
        isOpen={isUserTypeModalOpen}
        setIsOpen={setIsUserTypeModalOpen}
        title="Registration"
        childrenContainerClassName="lg:max-w-[400px]"
      >
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text text-lg">Customer</span>
            <input
              type="radio"
              value={userType}
              name="user-type"
              className="radio checked:bg-primary"
              checked={userType === "Customer"}
              onChange={() => setUserType("Customer")}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text text-lg">Seller</span>
            <input
              type="radio"
              value={userType}
              name="user-type"
              className="radio checked:bg-primary"
              onChange={() => setUserType("Seller")}
              checked={userType === "Seller"}
            />
          </label>
        </div>
        <div className="mt-8 flex w-full gap-2">
          <Button
            variant={"filled"}
            onClick={() => {
              setGoogleToken(null);
              setIsUserTypeModalOpen(false);
            }}
            className="flex-1 border-red-500 bg-transparent text-red-500"
            label="Cancel"
          ></Button>
          <Button
            onClick={() => {
              handleSignupWithGoogle.mutate();
            }}
            label="Register"
            className="flex-1"
          ></Button>
        </div>
      </Modal>
    </>
  );
};

export default Register;
