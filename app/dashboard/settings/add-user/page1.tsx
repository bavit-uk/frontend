/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import {  useState } from "react";
import { useAppDispatch } from "@/app/store/hook";
import { useRouter } from "next/navigation";
import { set, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { client } from "@/app/_utils/axios";
// Import custom components
import ControlledInput from "@/app/_components/Forms/ControlledInput";
import { cookies } from "next/headers";
import { Loader } from "lucide-react";

// Define input types for form
type Inputs = {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    dateOfBirth: string;
    zipCode: string;
    state: string;
    city: string;
    address: string;
    country: string;
};

export default function ProfileSettingsPage() {
    const [userData, setuserData] = useState<Inputs | null>(null);
    const router = useRouter();
    const {
        register,
        handleSubmit,
        watch,
        getValues,
        formState: { errors },
    } = useForm<Inputs>({
        reValidateMode: "onChange",
    });


    console.log("getvalues", getValues());
    console.log("errors", errors);
    const onSubmit = useMutation({
        mutationFn: async (data: Inputs) => {
            console.log("before sending req", data);
            const response = await client.post("auth/update-profile", data, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            return response.data.data;
        },

        onSuccess: (data, inputs) => {
            toast.success("You have successfully registered");
            // dispatch(openModal({ mode: "login" }));
        },
        onError: (error: AxiosError<any>) => {
            console.log(error.response?.data);
            toast.error(error.response?.data?.message || "There was an error registering");
        },
    });

    const updateUser = async (data: Inputs) => {
        console.log("before sending req", data);
        // data.email = data.email.toLowerCase();
        // data.userType = "Customer";
        const response = await client.post("auth/update-profile", data, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data.data;
    }

    return (
        <div className="px-5">
            <div className="text-center mb-6">
                <h2 className="font-bold text-2xl">Add User</h2>
                <p className="text-gray-600">Sub Line Writtern Here</p>
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
                    // value={userData.lastName}
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
                    name="dateOfBirth"
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
                    name="street"
                    placeholder="Enter Street"
                    errors={errors}
                    register={register}
                    rules={{
                       
                    }}
                    classes={{
                        input: "text-xl p-4 w-full",
                    }}
                    required
                />

                <ControlledInput
                    label="City"
                    type="text"
                    name="city"
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
                    name="state"
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
                    label="Zip Code"
                    type="text"
                    name="zipCode"
                    placeholder="Enter Zip Code"
                    errors={errors}
                    register={register}
                    rules={{
                      
                        pattern: {
                            value: /^\d{5}(-\d{4})?$/,
                            message: "Invalid Zip Code",
                        },
                    }}
                    classes={{
                        input: "text-xl p-4 w-full",
                    }}
                    required
                />

                <ControlledInput
                    label="Country"
                    type="text"
                    name="country"
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

                <div className="md:col-span-2 lg:col-span-3 flex justify-end gap-5 mt-4">
                    <button type="button" className="bg-gray-500 rounded-md px-8 py-4 font-medium text-white hover:bg-gray-600 transition-colors">
                        Reset
                    </button>
                    <button  type="submit" className="bg-red-500 rounded-md px-8 py-4 font-medium text-white hover:bg-red-600 transition-colors">
                        Add User
                    </button>
                </div>
            </form>
        </div>
    );
}
