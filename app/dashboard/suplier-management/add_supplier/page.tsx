/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";

import { toast } from "react-toastify";
import { client } from "@/app/_utils/axios";
import { Loader } from "lucide-react";
// Import custom components
import ControlledInput from "@/app/_components/Forms/ControlledInput";
import ControlledSelect from "@/app/_components/Forms/ControlledSelect";

// Define input types for form
type Address = {
    label: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
};

type Inputs = {
    label: string;
    password: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    firstName: string;
    lastName: string;
    phoneNumber: string;
    email: string;
    dob: string;
    country: string;
    address: Address[];
};

export default function AddSupplier() {
    const [userCategory, setUserCategory] = useState<any | null>(null);
    const [supplierCategory, setSupplierCategory] = useState<any | null>(null);
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

    const onSubmit = useMutation({
        mutationFn: async (data: Inputs) => {
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
                        label: data.label,
                        street: data.street,
                        city: data.city,
                        state: data.state,
                        postalCode: data.postalCode,
                        country: data.country,
                    },
                ],
            };

            const response = await client.post("/supplier", transformedData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });

            toast.success(response.data.message);
            return response.data;
        },
        onSuccess: () => {
            reset();
            toast.success("Supplier added successfully!");
        },
        onError: (error: any) => {
            console.error("Error adding supplier:", error);
            toast.error("Failed to add supplier. Please try again.");
        },
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const [userCategoryResponse, supplierCategoryResponse] = await Promise.all([
                    client.get("/user-category"),
                    client.get("/supplier-category"),
                ]);
                setUserCategory(userCategoryResponse.data);
                setSupplierCategory(supplierCategoryResponse.data.data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };
        fetchCategories();
    }, []);

    if (!userCategory || !supplierCategory)
        return (
            <div className="grid place-items-center h-screen">
                <Loader className="animate-spin" size={64} />
            </div>
        );

    return (
        <div className="px-5">
            <div className="text-center mb-6">
                <h2 className="font-bold text-2xl">Add Supplier</h2>
                <p className="text-gray-600">Fill in the supplier details below</p>
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
                    errors={errors}
                    register={register}
                    rules={{
                        required: "First Name is required",
                        pattern: /^[a-zA-Z\s,.'-]+$/,
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
                        pattern: /^[a-zA-Z\s,.'-]+$/,
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
                        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    }}
                    required
                />

                <ControlledInput
                    label="Phone Number"
                    type="tel"
                    name="phoneNumber"
                    placeholder="Cell Number"
                    errors={errors}
                    register={register}
                    rules={{
                        required: "Phone Number is required",
                        pattern: /^(\+1\s?)?(\d{3}|\(\d{3}\))[\s\-]?\d{3}[\s\-]?\d{4}$/,
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
                        pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/,
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
                    required
                />

                <ControlledInput
                    label="Date of Birth"
                    type="date"
                    name="dob"
                    placeholder="Date of Birth"
                    errors={errors}
                    register={register}
                    required
                />

                <ControlledInput
                    label="Label"
                    type="text"
                    name="label"
                    placeholder="Address Label"
                    errors={errors}
                    register={register}
                    required
                />

                <ControlledInput
                    label="Street"
                    type="text"
                    name="street"
                    placeholder="Street"
                    errors={errors}
                    register={register}
                    required
                />

                <ControlledInput
                    label="City"
                    type="text"
                    name="city"
                    placeholder="City"
                    errors={errors}
                    register={register}
                    rules={{
                        pattern: /^[a-zA-Z\s,.'-]+$/,
                    }}
                    required
                />

                <ControlledInput
                    label="State"
                    type="text"
                    name="state"
                    placeholder="State"
                    errors={errors}
                    register={register}
                    rules={{
                        pattern: /^[a-zA-Z\s,.'-]+$/,
                    }}
                    required
                />

                <ControlledInput
                    label="Postal Code"
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code"
                    errors={errors}
                    register={register}
                    rules={{
                        pattern: /^\d{5}(-\d{4})?$/,
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

                <ControlledSelect
                    label="Supplier Category"
                    name="supplierCategory"
                    options={supplierCategory.map(
                        (category: { _id: string; name: string }) => ({
                            value: category._id,
                            label: category.name,
                        })
                    )}
                    register={register}
                    errors={errors}
                    required
                />

                <div className="md:col-span-2 lg:col-span-3 flex justify-end gap-5 mt-4">
                    <button
                        type="button"
                        className="bg-gray-500 rounded-md px-8 py-4 font-medium text-white hover:bg-gray-600 transition-colors"
                        onClick={() => reset()}
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
