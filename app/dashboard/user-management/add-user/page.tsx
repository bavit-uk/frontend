/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/app/store/hook";
import { useRouter } from "next/navigation";
import { set, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { client } from "@/app/_utils/axios";
import { Loader } from "lucide-react";
// Import custom components
import ControlledInput from "@/app/_components/Forms/ControlledInput";
import ControlledSelect from "@/app/_components/Forms/ControlledSelect";

// Define input types for form
type Address = {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  _id: string;
};

type Inputs = {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  phoneNumber: string;
  password: string;
  email: string;
  userCategory: string;
  dob: string;
  country: string;
  _id: string;
  address: Address[];
};

export default function ProfileSettingsPage() {
  const [userData, setuserData] = useState<Inputs | null>(null);
  const [userCategory, setUserCategory] = useState<{ _id: string; role: string }[] | null>(null);
  console.log("userCategory :  ", userCategory);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({
    reValidateMode: "onChange",
  });

  console.log("getvalues", getValues());
  console.log("errors", errors);

  const onSubmit = useMutation({
    mutationFn: async (data: Inputs) => {
      console.log("Mutation is right here", data?.userCategory);
      // Restructure the data into the desired format
      const transformedData = {
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        email: data.email,
        password: data.password,
        userType: data.userCategory,
        dob: data.dob,
        address: [
          {
            label: "Home",
            street: data.street,
            city: data.city,
            state: data.state,
            postalCode: data.postalCode,
            country: data.country,
          },
        ],
      };
      // console.log("Transformed Data:", transformedData);
      // console.log("Token :", localStorage.getItem);

            // Send the transformed data to the server
            console.log( "transformedData" , transformedData)
            const response = await client.post("user/", transformedData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            // console.log("Response:", response.data.message);
            toast.success("User has been Added Successfully!");
            reset();
            return response.data;
        },
    });

    useEffect(() => {
        const fetchUserCategory = async () => {
            try {
                const response = await client.get("/user-category");
                console.log("User Category:", response.data);
                setUserCategory(response.data);
            } catch (error) {
                console.error("Error fetching user category:", error);
            }
        };
        fetchUserCategory();
    }, []);
    
    if (!userCategory)
        return (
            <div className="grid place-items-center h-svh">
                <Loader className="animate-spin" size={64} />
            </div>
        );
    return (
        <div className="px-5">
            <div className="text-center mb-6">
                <h2 className="font-bold text-2xl">Add User</h2>
                <p className="text-gray-600">Add  Information</p>
            </div>

      <form
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
        onSubmit={handleSubmit((data) => onSubmit.mutate(data))}
        noValidate
      >
        <ControlledInput
          label="First Name"
          type="text"
          name="firstName"
          placeholder="First Name"
          // value={userData.firstName}
          errors={errors}
          register={register}
          rules={{
            required: "First Name is required",
            pattern: {
              value: /^[a-zA-Z\s,.'-]+$/,
              message: "Special characters not allowed",
            },
            minLength: {
              value: 2,
              message: "First Name should be atleast 2 characters",
            },
            maxLength: {
              value: 50,
              message: "First Name should be maximum 50 characters",
            },
            validate: (value) => value.trim() !== "" || "First Name cannot be empty or just spaces",
          }}
          classes={{
            input: "text-xl px-4 py-3",
          }}
          required
        />

        <ControlledInput
          label="Last Name"
          type="text"
          name="lastName"
          placeholder="Last Name"
          errors={errors}
          register={register}
          rules={{
            required: "Last Name is required",
            pattern: {
              value: /^[a-zA-Z\s,.'-]+$/,
              message: "Special characters not allowed",
            },
            minLength: {
              value: 2,
              message: "Last Name should be atleast 2 characters",
            },
            maxLength: {
              value: 50,
              message: "Last Name should be maximum 50 characters",
            },
            validate: (value) => value.trim() !== "" || "Last Name cannot be empty or just spaces",
          }}
          classes={{
            input: "text-xl px-4 py-3",
          }}
          required
        />

                <ControlledInput
                    label="Email"
                    type="email"
                    name="email"
                    placeholder="Enter Email"
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
                    classes={{
                        input: "text-xl px-4 py-3",
                    }}
                    required

                />

        <ControlledInput
          label="Phone Number"
          type="tel"
          name="phoneNumber"
          placeholder="Cell Number"
          mask={"+44(999)-999-9999"}
          errors={errors}
          register={register}
          rules={{
            required: "Cell Number is required",
            pattern: {
              value: /^\+44\s?\(?\d{2,5}\)?[-.\s]?\d{3}[-.\s]?\d{3,4}$/,
              message: "Invalid Cell Number",
            },
          }}
          classes={{
            input: "text-xl px-4 py-3",
          }}
          required
        />

        <ControlledInput
          label="Password"
          type="password"
          name="password"
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
          classes={{
            input: "text-xl px-4 py-3",
          }}
          required
        />

        <ControlledInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          errors={errors}
          register={register}
          rules={{
            required: "Confirm Password is required",
            validate: (value) => value === getValues("password") || "Passwords do not match",
          }}
          classes={{
            input: "text-xl px-4 py-3",
          }}
          required
        />

        <ControlledInput
          label="Date of Birth"
          type="date"
          name="dob"
          placeholder="Date of Birth"
          // value={userData.dateOfBirth}
          errors={errors}
          register={register}
          // rules={{
          //     required: "Password is required",
          //     pattern: {
          //         value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          //         message: "Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character",
          //     },
          // }}
          classes={{
            input: "text-xl p-4 w-full",
          }}
          required
        />

        <ControlledInput
          label="Street"
          type="text"
          name={`street`}
          placeholder="Enter Street"
          errors={errors}
          register={register}
          rules={{}}
          classes={{
            input: "text-xl p-4 w-full",
          }}
          required
        />

        <ControlledInput
          label="City"
          type="text"
          name={`city`}
          placeholder="Enter City"
          errors={errors}
          register={register}
          rules={{
            pattern: {
              value: /^[a-z ,.'-]+$/i,
              message: "Invalid City",
            },
          }}
          classes={{
            input: "text-xl p-4 w-full",
          }}
          required
        />

        <ControlledInput
          label="State"
          type="text"
          name={`state`}
          placeholder="Enter State"
          errors={errors}
          register={register}
          rules={{
            pattern: {
              value: /^[a-z ,.'-]+$/i,
              message: "Invalid State",
            },
          }}
          classes={{
            input: "text-xl p-4 w-full",
          }}
          required
        />

        <ControlledInput
          label="Postal Code"
          type="text"
          name={`postalCode`}
          placeholder="Enter Zip Code"
          errors={errors}
          register={register}
          // rules={{
          //     pattern: {
          //         value: /^\d{5}(-\d{4})?$/,
          //         message: "Invalid Postal Code",
          //     },
          // }}
          classes={{
            input: "text-xl p-4 w-full",
          }}
          required
        />

        <ControlledInput
          label="Country"
          type="text"
          name={`country`}
          placeholder="Country"
          errors={errors}
          register={register}
          rules={{
            pattern: {
              value: /^[a-zA-Z\s,.'-]+$/,
              message: "Invalid Country",
            },
          }}
          classes={{
            input: "text-xl p-4 w-full",
          }}
          required
        />

        <ControlledSelect
          label="User Category"
          name="userCategory"
          options={userCategory.map((category: { _id: string; role: string }) => ({
            value: category._id,
            label: category.role,
          }))}
          register={register}
          errors={errors}
          required
        />

        <div className="md:col-span-2 lg:col-span-3 flex justify-end gap-5 mt-4">
          <button
            onClick={() => reset()}
            type="button"
            className="bg-gray-500 rounded-md px-8 py-4 font-medium text-white hover:bg-gray-600 transition-colors"
          >
            Reset
          </button>
          <button
            type="submit"
            className="bg-red-500 rounded-md px-8 py-4 font-medium text-white hover:bg-red-600 transition-colors"
          >
            Add User
          </button>
        </div>
      </form>
    </div>
  );
}
