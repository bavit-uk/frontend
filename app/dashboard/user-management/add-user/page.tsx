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
    password:string;
    email: string;
    dob: string;
    country: string;
    _id: string;
    address: Address[];
};

export default function ProfileSettingsPage() {
    const [userData, setuserData] = useState<Inputs | null>(null);
    const [userCategory, setUserCategory] = useState< {_id:string; role:string}[] | null>(null);
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
            console.log("Mutation is right here");
            // Restructure the data into the desired format
            const transformedData = {
                firstName: data.firstName,
                lastName: data.lastName,
                phoneNumber: data.phoneNumber,
                email: data.email,
                password: data.password,
                userType: "67403b90e189e381d5f1cdc4",
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
            console.log("Transformed Data:", transformedData);
            // console.log("Token :", localStorage.getItem);

            // Send the transformed data to the server
            const response = await client.post("user/", transformedData, {
                // console.log( "transformedData" , transformedData)
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            // console.log("Response:", response.data.message);
            toast.success(response.data.message);
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
                <h2 className="font-bold text-2xl">Profile Settings</h2>
                <p className="text-gray-600">Update Your Profile Information</p>
            </div>

            <form className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" onSubmit={handleSubmit((data) => onSubmit.mutate(data))} noValidate>
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
                        required: "Email is required",
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: "Invalid email address",
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
                        validate: (value) =>
                            value === getValues("password") || "Passwords do not match",
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
                    options={
                        userCategory.map((category: {_id:string; role:string}) => ({
                            value: category._id,
                            label: category.role,
                        }))
                    }
                    register={register}
                    errors={errors}
                    required
                
                />

                <div className="md:col-span-2 lg:col-span-3 flex justify-end gap-5 mt-4">
                    <button type="button" className="bg-gray-500 rounded-md px-8 py-4 font-medium text-white hover:bg-gray-600 transition-colors">
                        Reset
                    </button>
                    <button type="submit" className="bg-red-500 rounded-md px-8 py-4 font-medium text-white hover:bg-red-600 transition-colors">
                        Add User
                    </button>
                </div>
            </form>
        </div>
    );
}
