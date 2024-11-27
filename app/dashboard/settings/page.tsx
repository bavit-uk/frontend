/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import {  useEffect, useState } from "react";

import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { client } from "@/app/_utils/axios";
// Import custom components
import ControlledInput from "@/app/_components/Forms/ControlledInput";

import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";

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

    const {
        register,
        handleSubmit,

        reset,
        getValues,
        formState: { errors },
    } = useForm<Inputs>(
        {
        reValidateMode: "onChange",
    });

    // const cookieStore = await cookies(); // This returns a ReadonlyRequestCookies object
    // const token = cookieStore.get("accessToken")?.value; // Access the token value

    // useEffect(() => {
    //     const fetchProfile = async () => {
    //         const response = await client.get("auth/profile" , {
    //             headers: {
    //                 Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDA5OTYzNjljZjc3OWQzZGI5NjlmNyIsImlhdCI6MTczMjI5NjU1MywiZXhwIjoxNzMyMzAwMTUzfQ.g3pWIyg4ue3MhZ5G5bYAQm-90GAQL0dqSmH9MPWkx5M`,
    //     }});
    //         console.log("response", response.data.data);
    //         // const { firstName, lastName, email, phoneNumber, dateOfBirth, address, city, state, zipCode } = response.data.data;
    //         // setValues({ firstName, lastName, email, phoneNumber, dateOfBirth, address, city, state, zipCode });
    //     };
    //     fetchProfile();
    // }, []);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await client.get("auth/profile", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                });
                const data = await response.data;
                if (response) {
                    setuserData(data);
                    reset({ ...data.user, address: data.address });
                }
                console.log("response", data);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchProfile();
    }, []);

    // console.log("getvalues", getValues());
    // console.log("errors", errors);

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
            // _id: userData?.user._id,
            // // street: data.street,
            // city: data.city,
            // state: data.state,
            // zipCode: data.zipCode,
            // country: data.country,
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

    // const updateUser = async (data: Inputs) => {
    //     console.log("before sending req", data);
    //     // data.email = data.email.toLowerCase();
    //     // data.userType = "Customer";
    //     const response = await client.post("auth/update-profile", data, {
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${localStorage.getItem("token")}`,
    //         },
    //     });
    //     return response.data.data;
    // };

    if (!userData)
        return (
            <div className="grid place-items-center h-svh">
                <Loader />
            </div>
        );
    return (
        <div className="px-5">
            <div className="text-center mb-6">
                <h2 className="font-bold text-2xl">Profile Settings</h2>
                <p className="text-gray-600">Update Your Profile Information</p>
            </div>

            <form className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" onSubmit={handleSubmit((data: Inputs) => onSubmit.mutate(data))} noValidate>
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
                    // value={userData.user.lastName}

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
                    placeholder="Email"
                    value={userData.email}
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
                    readOnly
                />

                <ControlledInput
                    label="Phone Number"
                    type="tel"
                    name="phoneNumber"
                    placeholder="Cell Number"
                    value={userData.phoneNumber}
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

                {/* <ControlledInput
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
                /> */}

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

                {getValues().address.map((data: any, index:number) => (
                    <>
                        <div key={index} className=" md:col-span-2 lg:col-span-3">
                            Address {index + 1}
                        </div>
                        <div className="grid col-span-3 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            <ControlledInput
                                label="Street"
                                type="text"
                                name={`address.${[index]}.street`}
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
                                name={`address.${[index]}.city`}
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
                                name={`address.${[index]}.state`}
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
                                name={`address.${[index]}.postalCode`}
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
                                name={`address.${[index]}.country`}
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
                        </div>
                    </>
                ))}

                <div className="md:col-span-2 lg:col-span-3 flex justify-end gap-5 mt-4">
                    <button type="button" className="bg-gray-500 rounded-md px-8 py-4 font-medium text-white hover:bg-gray-600 transition-colors">
                        Reset
                    </button>
                    <button type="submit" className="bg-red-500 rounded-md px-8 py-4 font-medium text-white hover:bg-red-600 transition-colors">
                        {"Update Profile"}
                    </button>
                </div>
            </form>
        </div>
    );
}

