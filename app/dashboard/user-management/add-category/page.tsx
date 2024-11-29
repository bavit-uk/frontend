"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { client } from "@/app/_utils/axios";
import ControlledInput from "@/app/_components/Forms/ControlledInput";
import ControlledCheckbox from "@/app/_components/Forms/ControlledCheckbox";
import { Loader } from "lucide-react";

type Inputs = {
    role: string;
    description: string;
    permissions: string[]; // Track selected permissions
};

type PermissionNode = {
    label: string;
    value: string;
    children: string[];
};

type PermissionsData = {
    [key: string]: {
        name: string;
        subPermissions?: string[];
    }
};

export default function AddCategoryForm() {
    const [permissions, setPermissions] = useState<PermissionNode[]>([]);
    const {
        register,
        handleSubmit,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            role: "",
            description: "",
            permissions: [], // Initialize as an empty array
        },
    });

    const onSubmit = useMutation({
        mutationFn: async (data: Inputs) => {
            const response = await client.post("/user-category", data, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            });
            return response.data.data;
        },
    });

    // Watch the current permissions array
    const selectedPermissions = watch("permissions");

    // Handle checkbox state changes for permissions
    const handlePermissionChange = (permission: string, checked: boolean, isParent: boolean = false) => {
        let updatedPermissions = [...selectedPermissions];

        if (isParent) {
            // Find the current permission node
            const permissionNode = permissions.find(node => node.value === permission);

            if (permissionNode) {
                if (checked) {
                    // Add parent if not already present
                    if (!updatedPermissions.includes(permission)) {
                        updatedPermissions.push(permission);
                    }

                    // Add all child permissions
                    permissionNode.children.forEach(child => {
                        if (!updatedPermissions.includes(child)) {
                            updatedPermissions.push(child);
                        }
                    });
                } else {
                    // Remove parent
                    updatedPermissions = updatedPermissions.filter(p => p !== permission);

                    // Remove all child permissions (this is the key change)
                    updatedPermissions = updatedPermissions.filter(p =>
                        !permissionNode.children.includes(p)
                    );
                }
            }
        } else {
            // For child permissions, only allow selection if parent is selected
            const parentNode = permissions.find(node =>
                node.children.includes(permission)
            );

            if (parentNode && selectedPermissions.includes(parentNode.value)) {
                updatedPermissions = checked
                    ? [...updatedPermissions, permission]
                    : updatedPermissions.filter((p) => p !== permission);
            }
        }

        setValue("permissions", updatedPermissions, { shouldValidate: true });
    };

    // Format the permissions data
    const formatPermissions = (permissionsData: PermissionsData): PermissionNode[] => {
        return Object.keys(permissionsData).map((key) => {
            const permission = permissionsData[key];
            return {
                label: permission.name,
                value: permission.name,
                children: permission.subPermissions || [],
            };
        });
    };

    // Fetch permissions on component mount
    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const response = await client.get("/permissions");
                const permissionsData = response.data.permissions;
                // Format permissions into a usable structure
                const formattedPermissions = formatPermissions(permissionsData);
                setPermissions(formattedPermissions);
            } catch (error) {
                console.error("Error fetching permissions:", error);
            }
        };
        fetchPermissions();
    }, []);

    // Custom function to determine parent checkbox state
    // const isParentSelected = (parentPermission: string) => {
    //     const permissionNode = permissions.find(node => node.value === parentPermission);
    //     if (!permissionNode) return false;

        // Check if the parent permission itself is in the selected permissions
    //     return selectedPermissions.includes(parentPermission);
    // };

    // Check if child permission can be selected
    // const canSelectChild = (parentPermission: string) => {
    //     return selectedPermissions.includes(parentPermission);
    // };

    if (permissions.length === 0)
        return (
            <div className="grid place-items-center h-svh">
                <Loader className="animate-spin" size={64} />
            </div>
        );

    return (
        <div className="px-5">
            <div className="text-center mb-6">
                <h2 className="font-bold text-2xl">Add Category</h2>
                <p className="text-gray-600">Update Your Profile Information</p>
            </div>

            <form
                className="space-y-5"
                onSubmit={handleSubmit((data) => onSubmit.mutate(data))}
                noValidate
            >
                {/* Role Input */}
                <ControlledInput
                    label="Role"
                    type="text"
                    name="role"
                    placeholder="Enter a Role"
                    errors={errors}
                    register={register}
                    rules={{
                        required: "Role is required",
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

                {/* Permissions Checkboxes */}
                <div>
                    <h3 className="font-semibold text-lg text-gray-800 mb-3">
                        Select Permissions
                    </h3>
                    {permissions.map((permissionNode) => (
                        <div key={permissionNode.value} className="mb-4">
                            <div className="mb-2">
                                <ControlledCheckbox
                                    key={`parent-${permissionNode.value}`}
                                    label={`Select All ${permissionNode.label}`}
                                    name={`permissions.${permissionNode.value}`}
                                    isFormControlled
                                    watch={watch}
                                    setValue={(name, checked) =>
                                        handlePermissionChange(permissionNode.value, checked, true)
                                    }
                                />
                            </div>
                            <div className="pl-4 space-y-3">
                                {permissionNode.children.map((childPermission) => (
                                    <ControlledCheckbox
                                        key={childPermission}
                                        label={childPermission}
                                        name={`permissions.${childPermission}`}
                                        isFormControlled
                                        // disabled={!canSelectChild(permissionNode.value)}
                                        watch={watch}
                                        setValue={(name, checked) =>
                                            handlePermissionChange(childPermission, checked)
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

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