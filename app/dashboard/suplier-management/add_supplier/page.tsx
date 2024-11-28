/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { client } from "@/app/_utils/axios";
import { Loader } from "lucide-react";
// Import custom components
import ControlledSelect from "@/app/_components/Forms/ControlledSelect";

// Define input types for form
type Address = {
    label?: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    _id?: string;
};

type UserCategory = {
    _id: string;
    role: string[];
};

type SupplierCategory = {
    _id: string;
    name: string;
};

type Inputs = {
    firstName: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    lastName: string;
    password: string;
    phoneNumber: string;
    email: string;
    dob: string;
    _id?: string;
    address?: Address[];
    userCategory?: string;
    SupplierCategory?: string;
};

export default function AddSupplier() {
    const [userCategory, setUserCategory] = useState<UserCategory[] | null>(null);
    const [supplierCategory, setSupplierCategory] = useState<SupplierCategory[] | null>(null);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<Inputs>({
        reValidateMode: "onChange",
    });

    const onSubmit = useMutation({
        mutationFn: async (data: Inputs) => {
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

            // Send the transformed data to the server
            const response = await client.post("user/", transformedData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            toast.success(response.data.message);
            return response.data;
        },
    });

    useEffect(() => {
        const fetchUserCategory = async () => {
            try {
                const response = await client.get("/user-category");
                const response2 = await client.get("/supplier-category");
                setUserCategory(response.data);
                setSupplierCategory(response2.data.data);
            } catch (error) {
                console.error("Error fetching user category:", error);
            }
        };
        fetchUserCategory();
    }, []);

    if (!userCategory || !supplierCategory)
        return (
            <div className="grid place-items-center h-svh">
                <Loader className="animate-spin" size={64} />
            </div>
        );

    return (
        <div className="px-5">
            <div className="text-center mb-6">
                <h2 className="font-bold text-2xl">Add Supplier</h2>
                <p className="text-gray-600">Sub Line</p>
            </div>

            <form className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" onSubmit={handleSubmit((data) => onSubmit.mutate(data))} noValidate>
                {/* Form inputs remain the same */}
                
                <ControlledSelect
                    label="User Category"
                    name="userCategory"
                    options={
                        userCategory.map((category) => ({
                            value: category._id,
                            label: category.role[0], // Assuming role is an array, taking first item
                        }))
                    }
                    register={register}
                    errors={errors}
                    required
                />

                <ControlledSelect
                    label="Supplier Category"
                    name="SupplierCategory"
                    options={
                        supplierCategory.map((category) => ({
                            value: category._id,
                            label: category.name,
                        }))
                    }
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