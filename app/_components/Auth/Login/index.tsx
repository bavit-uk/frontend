/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import ControlledInput from "../../Forms/ControlledInput";
import { closeModal, openModal } from "../../_lib/features/auth/authSlice";
import { useAppDispatch } from "../../_lib/hooks";
// import Image from 'next/image';
import Link from "next/link";
import { useForm } from "react-hook-form";
// import GoogleLogo from '@assets/Icons/google.webp';
import Divider from "../../ui/Divider";
import { useMutation } from "@tanstack/react-query";
import { client } from "../../../_utils/axios";
import { AxiosError } from "axios";
import { setUser } from "../../_lib/features/user/userSlice";
import { toast } from "react-toastify";
// import { useGoogleLogin } from '@react-oauth/google';
import { useRouter } from "next/navigation";
// import { useRouter } from "next/navigation";

type Inputs = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const Login = ({}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,

    getValues,
    formState: { errors },
  } = useForm<Inputs>({
    reValidateMode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
  });
const handleForgetPassword=()=>{
  router.push('./forget-password')
}

const handleRegister=()=>{
  router.push('./register')
}
console.log(handleRegister)

  // const googleLogin = useGoogleLogin({
  //   flow: 'auth-code',
  //   onSuccess: async (codeResponse) => {
  //     const response = await client.post('/auth/signin-with-google', {
  //       credentials: 'customHooks',
  //       code: codeResponse.code,
  //     });

  //     const user = response.data.data;
  //     dispatch(
  //       setUser({
  //         user: user,
  //         persist: getValues().rememberMe,
  //         mode: 'login',
  //       })
  //     );
  //     toast.success('Logged in successfully');
  //     dispatch(closeModal());
  //   },
  //   onError: (errorResponse) => console.log(errorResponse),
  // });
  const onSubmit = useMutation({
    mutationFn: async (data: Inputs) => {
      data.email = data.email.toLowerCase();
      const response = await client.post("/auth/login", data);
      console.log("REsponse : " , response.data.data.accessToken)
      localStorage.setItem("accessToken" , response.data.data.accessToken)
      const token = localStorage.getItem("accessToken")
      console.log("token : " , token)
      return response.data.data;
    },
    onSuccess: (data, inputs) => {
      dispatch(
        setUser({
          user: data,
          persist: inputs.rememberMe,
          mode: "login",
        })
      );
      toast.success("Logged in successfully"); // Success Toast

      // Handle redirection based on user type
      if (data.userType === "Seller" && data.dealership?.status !== "Active") {
        router.push("/verify-seller");
      } else if (data.userType === "Customer") {
        router.push("/vehicles");
      } else {
        router.push("/dashboard/settings");
      }
      dispatch(closeModal());
    },
    onError: (error: AxiosError<any>) => {
      // Backend Error Handling
      const errorMessage = error.response?.data?.message || "There was an error logging in";
      toast.error(errorMessage); // Display the error message from backend
    },
  });
  return (
    <div className="bg-gray-200 p-8 h-screen w-full">
      <form
        className=" space-y-2 my-4 w-1/2 mx-auto space-y-4 px-4 py-6 bg-white shadow-md rounded-lg"
        onSubmit={handleSubmit((data) => onSubmit.mutate(data))}
        noValidate
      >
        {onSubmit.isPending}
         {/* Email Input */}
         <ControlledInput
          type="email"
          placeholder="Email"
          errors={errors}
          register={register}
          rules={{
            required: "Email address is required", // Handling empty email
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: "Invalid email format", // Invalid email format
            },
          }}
          {...register("email")}
          classes={{
            input: "text-xl p-4",
          }}
          required
        />

     
        {/* Password Input */}
        <ControlledInput
          type="password"
          placeholder="Password"
          errors={errors}
          register={register}
          rules={{
            required: "Password is required", // Handling empty password
          }}
          {...register("password")}
          classes={{
            input: "text-xl p-4",
          }}
          required
        />

        <button

          className="bg-red-500 w-full rounded-md px-6 py-4 text-xl font-medium text-white"
          type="submit"
        >
          Login
        </button>

        <div className="!mt-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="rememberMe"
              {...register("rememberMe")}
              className="accent-primary h-6 w-6 rounded-md border border-gray-600/50"
            />
            <label
              htmlFor="rememberMe"
              className="select-none text-xl text-gray-500"
            >
              Remember me
            </label>
          </div>

          <button
            onClick={handleForgetPassword}

            className="text-primary text-blue-500 cursor-pointer text-xl hover:underline"
          >
            Forgot password?
          </button>
        </div>
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
          // onClick={() => googleLogin()}
        >
          {/* <Image src={GoogleLogo} alt='Google Logo' width={48} height={48} /> */}
          <p className="text-xl text-gray-600">Sign in with Google</p>
        </button>

        <p className="text-center text-lg text-gray-500">
          Don&apos;t have an account?{" "}
          <button
            type="button"
            onClick={() => {
              handleRegister()
            }}
            className="text-primary text-blue-500 hover:underline"
          >
            Register Here
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
