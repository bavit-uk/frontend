/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import ControlledInput from "../../Forms/ControlledInput";
import ControlledSelect from "../../Forms/ControlledSelect";
import Divider from "../../ui/Divider";
import { closeModal, openModal } from "../../_lib/features/auth/authSlice";
import { useForm } from "react-hook-form";
// import GoogleLogo from "@assets/Icons/google.webp";
// import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import { client } from "../../../_utils/axios";

import { AxiosError } from "axios";
import Loader from "../../Loader";
// import { useGoogleLogin } from '@react-oauth/google';
import { auth, googleProvider } from "../../../_utils/firebase";
import { signInWithPopup } from "firebase/auth";
import { useAppDispatch } from "../../_lib/hooks";
import { toast } from "react-toastify";
import Modal from "../../ui/Modal";
import { useState } from "react";
import Button from "../../ui/Button";
import { clearFilter } from "../../_lib/features/homepage/filterSlice";
import Login from "../Login";
import { useRouter } from "next/navigation";

type Inputs = {
  // userType: "Supplier" | "Customer";
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword:string;
};

// type GoogleTokenType = {
//   authuser: string;
//   code: string;
//   prompt: string;
//   scope: string;
// };

const Register = ({}) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [googleToken, setGoogleToken] = useState<string | null>(null);
  const [isUserTypeModalOpen, setIsUserTypeModalOpen] = useState(false);
  const [userType, setUserType] = useState("Customer");
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({
    reValidateMode: "onChange",
  });
  
  const handleLogin = () => {
    router.push("/login");
  };

  const close = () => {
    dispatch(closeModal());
  };
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  const onSubmit = useMutation({
    mutationFn: async (data: Inputs) => {
      // Send only the password in the payload
      const response = await client.post("/auth/register", {
        ...data,
        // Omit the confirmPassword from the payload
        confirmPassword: undefined,
      });
      return response.data.data;
    },

    onSuccess: (data) => {
      toast.success("You have successfully registered");
      router.push("/login");
    },
    onError: (error: AxiosError<any>) => {
      toast.error(error.response?.data?.message || "There was an error registering");
    },
  });

  // const googleSignup = useGoogleLogin({
  //   flow: 'auth-code',
  //   onSuccess: async (codeResponse) => {
  //     setGoogleToken(codeResponse.code || null);
  //     setIsUserTypeModalOpen(true);
  //   },
  //   onError: (errorResponse) => {
  //     console.log(errorResponse);
  //     toast.error('Failed to signup using google.');
  //   },
  // });

  // const handleSignupWithGoogle = useMutation({
  //   mutationFn: async () => {
  //     return client.post('/auth/signup-with-google', {
  //       code: googleToken,
  //       credentials: 'customHooks',
  //       // userType: userType,
  //       userType: 'Admin',
  //     });
  //   },
  //   onSuccess: (response) => {
  //     toast.success(response.data.message);
  //     setIsUserTypeModalOpen(false);
  //   },
  //   onError: (error: any) => {
  //     console.log(error);
  //     toast.error(
  //       error.response.data.message || 'Failed to signin with google.'
  //     );
  //   },
  // });
  const googleSignup = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      // Proceed with user registration flow
      if (user) {
        const googleUser = {
          email: user.email,
          firstName: user.displayName?.split(" ")[0],
          lastName: user.displayName?.split(" ")[1],
          // Add other user fields here if needed
        };

        // You can now either automatically log in the user or show the user type selection
        toast.success("Google sign-up successful!");
        // dispatch(openModal({ mode: "userType" })); // Example: show user type modal
        // Optionally, save the user in your Redux store, etc.
      }
    } catch (error) {
      console.error("Google Sign-up Error:", error);
      toast.error("Failed to sign up using Google. Please try again.");
    }
  };

  return (
    <div className="bg-gray-200 p-8 h-screen w-full">
      <form
        className=" space-y-2 my-4 w-1/2 mx-auto space-y-4 px-4 py-6 bg-white shadow-md rounded-lg"
        onSubmit={handleSubmit((data) => onSubmit.mutate(data))}
        noValidate
      >
        {onSubmit.isPending && <Loader />}
        {/* <ControlledSelect
          errors={errors}
          register={register}
          rules={{
            required: "User Type is required",
          }}
          name="userType"
          options={[
            { value: "Supplier", label: "Supplier" },
            { value: "Customer", label: "Customer" },
          ]}
          classes={{
            select: "text-xl px-4 py-3",
          }}
          required
        /> */}

        {/* First Name */}
        <ControlledInput
          type="text"
          name="firstName"
          placeholder="First Name"
          errors={errors}
          register={register}
          rules={{
            required: "First Name is required",
            pattern: {
              value: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
              message: "Invalid First Name",
            },
            minLength: {
              value: 2,
              message: "First Name should be at least 2 characters",
            },
          }}
          classes={{ input: "text-xl px-4 py-3" }}
          required
        />

         {/* Last Name */}
         <ControlledInput
          type="text"
          name="lastName"
          placeholder="Last Name"
          errors={errors}
          register={register}
          rules={{
            required: "Last Name is required",
            pattern: {
              value: /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/,
              message: "Invalid Last Name",
            },
            minLength: {
              value: 2,
              message: "Last Name should be at least 2 characters",
            },
          }}
          classes={{ input: "text-xl px-4 py-3" }}
          required
        />
         {/* Phone Number */}
         <ControlledInput
          type="tel"
          name="phoneNumber"
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
          classes={{ input: "text-xl px-4 py-3" }}
          required
        />

       {/* Email */}
       <ControlledInput
          type="email"
          name="email"
          placeholder="Email"
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
          classes={{ input: "text-xl px-4 py-3" }}
          required
        />











      
{/* Password */}
<ControlledInput
          type="password"
          name="password"
          placeholder="Password"
          errors={errors}
          register={register}
          rules={{
            required: "Password is required",
            pattern: {
              value:
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                "Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character",
            },
          }}
          classes={{ input: "text-xl px-4 py-3" }}
          required
        />

        {/* Confirm Password */}
        <ControlledInput
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          errors={errors}
          register={register}
          rules={{
            required: "Confirm Password is required",
            validate: (value: string) =>
              value === password || "Passwords do not match", // Validate password match
          }}
          classes={{ input: "text-xl px-4 py-3" }}
          required
        />

        <button
          className="bg-red-500 w-full rounded-md px-6 py-4 text-xl font-medium text-white"
          onClick={close}
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
          {/* <Image src={GoogleLogo} alt="Google Logo" width={48} height={48} /> */}
          <p className="text-xl text-gray-600">Sign Up with Google</p>
        </button>

        <p className="text-center text-lg text-gray-500">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => {
              handleLogin();
            }}
            className="text-primary text-blue-500 hover:underline"
          >
            Login Here
          </button>
        </p>
      </form>
      {/* <button onClick={() => setIsUserTypeModalOpen(true)}>
        Open MODAL {userType}
      </button> */}
      <Modal
        isOpen={isUserTypeModalOpen}
        setIsOpen={setIsUserTypeModalOpen}
        title="Registration"
        childrenContainerClassName="lg:max-w-[400px]"
      >
        {/* <div className='form-control'>
        <label className='label cursor-pointer'>
          <span className='label-text text-lg'>Customer</span>
          <input
            type='radio'
            value={userType}
            name='user-type'
            className='radio checked:bg-primary'
            checked={userType === 'Customer'}
            onChange={() => setUserType('Customer')}
          />
        </label>
      </div> */}
        {/* <div className='form-control'>
        <label className='label cursor-pointer'>
          <span className='label-text text-lg'>Seller</span>
          <input
            type='radio'
            value={userType}
            name='user-type'
            className='radio checked:bg-primary'
            onChange={() => setUserType('Seller')}
            checked={userType === 'Seller'}
          />
        </label>
      </div> */}
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
            // onClick={() => {
            //   handleSignupWithGoogle.mutate();
            // }}
            label="Register"
            className="flex-1"
          ></Button>
        </div>
      </Modal>
    </div>
  );
};

export default Register;
