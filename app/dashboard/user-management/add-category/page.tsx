"use client";

import { useEffect, useState } from "react";
import { useAppDispatch } from "@/app/store/hook";
import { useRouter } from "next/navigation";
import { set, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { client } from "@/app/_utils/axios";
import ControlledInput from "@/app/_components/Forms/ControlledInput";
import { cookies } from "next/headers";
import { Loader } from "lucide-react";
import ControlledTextArea from "@/app/_components/Forms/ControlledTextArea";
import ControlledCheckbox from "@/app/_components/Forms/ControlledCheckbox";

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
    uid: string;
};

export default function Page() {
    const onSubmit = useMutation({
        mutationFn: async (data: Inputs) => {
            // Restructure the data into the desired format
            // const transformedData = {
            //     firstName: data.firstName,
            //     lastName: data.lastName,
            //     email: data.email.toLowerCase(),
            //     phoneNumber: data.phoneNumber,
            //     dateOfBirth: data.dateOfBirth,
            //     Address: {
            //         street: data.street,
            //         city: data.city,
            //         state: data.state,
            //         zipCode: data.zipCode,
            //         country: data.country,
            //     },
            // };
            const transformedData = {
                user: {
                    firstName: data.firstName,
                    lastName: data.lastName,
                    // email: data.email.toLowerCase(),
                    phoneNumber: data.phoneNumber,
                    dateOfBirth: data.dateOfBirth,
                },
                Address: {
                    // _id: userData?.user._id,
                    // street: data.street,
                    city: data.city,
                    state: data.state,
                    zipCode: data.zipCode,
                    country: data.country,
                },
            };

            console.log("Transformed Data:", transformedData);
            console.log("Token :", localStorage.getItem);

            // Send the transformed data to the server
            const response = await client.patch("auth/update-profile", transformedData, {
                // console.log( "transformedData" , transformedData)
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            return response.data.data;
        },
    });
    const {
        register,
        handleSubmit,
        watch,
        getValues,
        formState: { errors },
    } = useForm<Inputs>({
        reValidateMode: "onChange",
    });

    return (
        <div className="px-5">
            <div className="text-center mb-6">
                <h2 className="font-bold text-2xl">Add Category</h2>
                <p className="text-gray-600">Update Your Profile Information</p>
            </div>

            <form className=" space-y-5 " onSubmit={handleSubmit((data) => onSubmit.mutate(data))} noValidate>
                <ControlledInput
                    label="Role"
                    type="text"
                    name="role"
                    placeholder="Enter a Role"
                    // value={userData.firstName}
                    errors={errors}
                    register={register}
                    // rules={{
                    //     required: "First Name is required",
                    //     pattern: {
                    //         value: /^[a-zA-Z\s,.'-]+$/,
                    //         message: "Special characters not allowed",
                    //     },
                    //     minLength: {
                    //         value: 2,
                    //         message: "First Name should be atleast 2 characters",
                    //     },
                    // }}
                    classes={{
                        input: "text-xl px-4 py-3",
                    }}
                    required
                />

                <ControlledTextArea label="Description" name="description" register={register} />

                <ControlledCheckbox label="Active" name="active" register={register} />

                

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
