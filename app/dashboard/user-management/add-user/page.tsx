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
// Import custom components
import ControlledInput from "@/app/_components/Forms/ControlledInput";

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
    phoneNumber: string;
    email: string;
    dob: string;
    country: string;
    _id: string;
    address: Address[];
};

export default function ProfileSettingsPage() {
    const [userData, setuserData] = useState<Inputs | null>(null);
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
            // Restructure the data into the desired format
            const transformedData = {
                firstName: data.firstName,
                lastName: data.lastName,
                phoneNumber: data.phoneNumber,
                dob: data.dob,
                address: getValues().address.map((address: Address, index: number) => ({
                    _id: userData?.address[index]._id,
                    street: address.street,
                    city: address.city,
                    state: address.state,
                    postalCode: address.postalCode,
                    country: address.country,
                })),
            };

            console.log("Transformed Data:", transformedData);
            // console.log("Token :", localStorage.getItem);

            // Send the transformed data to the server
            const response = await client.patch("auth/update-profile", transformedData, {
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
