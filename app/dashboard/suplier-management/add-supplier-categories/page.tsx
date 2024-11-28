"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { client } from "@/app/_utils/axios";
import ControlledInput from "@/app/_components/Forms/ControlledInput";
import ImageUpload from "@/app/_components/ImageUpload/ImageUpload";

type Inputs = {
    name: string;
    images: string[];
    description: string;
    permissions: string[]; // Track selected permissions
};


export default function AddSupplierCategory() {
    const {
        register,
        handleSubmit,
        getValues,
        
        setValue,
        reset,
        formState: { errors },
    } = useForm<Inputs>({
        reValidateMode: "onChange",
    });
    console.log("getValues", getValues());
    const onSubmit = useMutation({
        mutationFn: async (data: Inputs) => {
            const transformedData = {
                ...data,
                images: data.images && data.images.length > 0 
                    ? data.images[0]  // Take the first image URL
                    : null  // or null if no image
            };

            const response = await client.post("/supplier-category", transformedData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            return response.data.data;
        },
    });


    return (
        <div className="px-5">
            <div className="text-center mb-6">
                <h2 className="font-bold text-2xl">Add Supplier Category</h2>
                <p className="text-gray-600">Update Your Profile Information</p>
            </div>

            <form
                className="space-y-5"
                onSubmit={handleSubmit((data) => onSubmit.mutate(data))}
                noValidate
            >
                <ControlledInput
                    label="Category Name"
                    type="text"
                    name="name"
                    placeholder="Enter a Category Name"
                    errors={errors}
                    register={register}
                    rules={{
                        required: "Category Name is required",
                        pattern: {
                            value: /^[a-zA-Z\s,.'-]+$/,
                            message: "Special characters not allowed",
                        },

                    }}
                    classes={{
                        input: "text-xl px-4 py-3",
                    }}
                    required
                />
                <ControlledInput
                    label="Description"
                    type="text"
                    name="description"
                    placeholder="Enter a Description"
                    rules={{
                        required: "Description is required",
                        pattern: {
                            value: /^[a-zA-Z\s,.'-]+$/,
                            message: "Special characters not allowed",
                        },

                    }}
                    errors={errors}
                    register={register}
                    classes={{
                        input: "text-xl px-4 py-3",
                    }}
                    required
                />

                <ImageUpload
                    text="Upload Images"
                    maxFiles={1}
                    setValue={setValue}
                    errors={errors}
                    fieldName="images"
                    type="image"
                />
                


                {/* Submit Buttons */}
                <div className="md:col-span-2 lg:col-span-3 flex justify-end gap-5 mt-4">
                    <button
                        type="button"
                        onClick={() => reset()}
                        className="bg-gray-500 rounded-md px-8 py-4 font-medium text-white hover:bg-gray-600 transition-colors"
                    >
                        Reset
                    </button>
                    <button
                        type="submit"
                        className="bg-red-500 rounded-md px-8 py-4 font-medium text-white hover:bg-red-600 transition-colors"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}