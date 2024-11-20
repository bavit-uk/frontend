"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { Paperclip } from "lucide-react";

interface SupplierFormData {
    name: string;
    email: string;
    phone: string;
    address: string;
    category: string;
    documents: FileList | null;
}

export default function page() {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<SupplierFormData>();
    const [dragActive, setDragActive] = useState(false);

    const onSubmit = (data: SupplierFormData) => {
        console.log(data);
        // Handle form submission
    };

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-6">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Add Supplier</h1>
                <p className="text-gray-600">Fill in the data to add Supplier</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-sm p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Supplier Name */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Supplier Name <span className="text-red-500">*</span>
                        </label>
                        <input {...register("name", { required: "Supplier name is required" })} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter Supplier Name" />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    {/* Category */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Supplier Category <span className="text-red-500">*</span>
                        </label>
                        <select {...register("category", { required: "Category is required" })} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">Select a category</option>
                            <option value="electronics">PC</option>
                            <option value="clothing">Laptop</option>
                            <option value="food">Custom PC</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Email <span className="text-red-500">*</span>
                        </label>
                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address",
                                },
                            })}
                            type="email"
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Email Address"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    {/* Phone */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Phone <span className="text-red-500">*</span>
                        </label>
                        <input
                            {...register("phone", {
                                required: "Phone number is required",
                                pattern: {
                                    value: /^\+?[\d\s-]+$/,
                                    message: "Invalid phone number",
                                },
                            })}
                            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="+1 (999) 999-9999"
                        />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                    </div>

                    {/* Address */}
                    <div className="space-y-2 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Address <span className="text-red-500">*</span>
                        </label>
                        <textarea {...register("address", { required: "Address is required" })} className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" rows={3} placeholder="Enter Complete Address" />
                        {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
                    </div>

                    {/* Document Upload */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Upload Documents</label>
                        <div className={`border-2 border-dashed rounded-lg p-6 ${dragActive ? "border-blue-500 bg-blue-50" : "border-gray-300"}`} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrag}>
                            <div className="flex flex-col items-center">
                                <Paperclip className="h-10 w-10 text-gray-400 mb-3" />
                                <p className="text-gray-600 text-center">Drag and drop a file or click to select a file to upload</p>
                                <input {...register("documents")} type="file" className="mt-4" multiple />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                    <button type="button" onClick={() => reset()} className="px-4 py-2 border rounded-md hover:bg-gray-50">
                        Reset
                    </button>
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                        Add Supplier
                    </button>
                </div>
            </form>
        </div>
    );
}
