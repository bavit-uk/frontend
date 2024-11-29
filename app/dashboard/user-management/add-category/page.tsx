"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { client } from "@/app/_utils/axios";
import ControlledInput from "@/app/_components/Forms/ControlledInput";
import ControlledCheckbox from "@/app/_components/Forms/ControlledCheckbox";
import { Loader } from "lucide-react";
import { toast } from "react-toastify";

type Inputs = {
    role: string;
    description: string;
    permissions: string[];
};

type PermissionNode = {
    label: string;
    value: string;
    children: string[];
};

export default function AddCategoryForm() {
    const [permissions, setPermissions] = useState<PermissionNode[]>([]);

    const {
        register,
        handleSubmit,
        getValues,
        watch,
        setValue,
        reset,
        formState: { errors },
    } = useForm<Inputs>({
        defaultValues: {
            role: "",
            description: "",
            permissions: [],
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
        onSuccess: () => {
            reset();
            // toast.success("Password reset successfully.");
            alert("Category successfully added!");
        },
        onError: (error) => {
            console.error("Error adding category:", error);
            alert("Failed to add category. Please try again.");
        },
    });

    const selectedPermissions = watch("permissions");
    console.log("selectedPermissions : " , selectedPermissions)

    const handlePermissionChange = (
        permission: string,
        checked: boolean,
        isParent: boolean = false
    ) => {
        let updatedPermissions = [...selectedPermissions];

        if (isParent) {
            const permissionNode = permissions.find(node => node.value === permission);
            if (permissionNode) {
                if (checked) {
                    if (!updatedPermissions.includes(permission)) {
                        updatedPermissions.push(permission);
                    }
                    permissionNode.children.forEach(child => {
                        if (!updatedPermissions.includes(child)) {
                            updatedPermissions.push(child);
                        }
                    });
                } else {
                    updatedPermissions = updatedPermissions.filter(p => p !== permission);
                    updatedPermissions = updatedPermissions.filter(
                        p => !permissionNode.children.includes(p)
                    );
                }
            }
        } else {
            const parentNode = permissions.find(node =>
                node.children.includes(permission)
            );
            if (parentNode && selectedPermissions.includes(parentNode.value)) {
                updatedPermissions = checked
                    ? [...updatedPermissions, permission]
                    : updatedPermissions.filter(p => p !== permission);
            }
        }

        setValue("permissions", updatedPermissions, { shouldValidate: true });
    };

    const formatPermissions = (permissionsData: any): PermissionNode[] => {
        return Object.keys(permissionsData).map(key => {
            const parent = permissionsData[key].parent;
            const children = permissionsData[key].children || [];
            return {
                label: parent,
                value: parent,
                children,
            };
        });
    };

    useEffect(() => {
        const fetchPermissions = async () => {
            try {
                const response = await client.get("/permissions");
                const permissionsData = response.data.permissions;
                const formattedPermissions = formatPermissions(permissionsData);
                setPermissions(formattedPermissions);
            } catch (error) {
                console.error("Error fetching permissions:", error);
            }
        };
        fetchPermissions();
    }, []);

    const isParentSelected = (parentPermission: string) => {
        return selectedPermissions.includes(parentPermission);
    };

    const canSelectChild = (parentPermission: string) => {
        return selectedPermissions.includes(parentPermission);
    };

    if (permissions.length === 0) {
        return (
            <div className="grid place-items-center h-screen">
                <Loader className="animate-spin" size={64} />
            </div>
        );
    }

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
                    errors={errors}
                    register={register}
                    rules={{
                        required: "Description is required",
                        pattern: {
                            value: /^[a-zA-Z0-9\s,.'-]+$/,
                            message: "Special characters not allowed",
                        },
                    }}
                    classes={{
                        input: "text-xl px-4 py-3",
                    }}
                    required
                />

                <div>
                    <h3 className="font-semibold text-lg text-gray-800 mb-3">
                        Select Permissions
                    </h3>
                    {permissions.map(permissionNode => (
                        <div key={`parent-${permissionNode.value}`} className="mb-4">
                            <div className="mb-2">
                                <ControlledCheckbox
                                    label={`${permissionNode.label}`}
                                    name={`permissions.${permissionNode.value}`}
                                    isFormControlled
                                    watch={() => isParentSelected(permissionNode.value)}
                                    setValue={(name, checked) =>
                                        handlePermissionChange(permissionNode.value, checked, true)
                                    }
                                />
                            </div>
                            <div className="pl-4 space-y-3">
                                {permissionNode.children.map(childPermission => (
                                    <ControlledCheckbox
                                        key={childPermission}
                                        label={childPermission}
                                        name={`permissions.${childPermission}`}
                                        isFormControlled
                                        disabled={!canSelectChild(permissionNode.value)}
                                        watch={() =>
                                            selectedPermissions.includes(childPermission)
                                        }
                                        setValue={(name, checked) =>
                                            handlePermissionChange(childPermission, checked)
                                        }
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-end gap-5 mt-4">
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
