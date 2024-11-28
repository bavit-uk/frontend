/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { client } from "@/app/_utils/axios";
import ControlledInput from "@/app/_components/Forms/ControlledInput";
import { Checkbox } from "@mantine/core";

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

const AddCategoryForm = () => {
  const [permissions, setPermissions] = useState<PermissionNode[]>([]);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const { register, handleSubmit, formState: { errors }, setValue, getValues } = useForm<Inputs>({
    reValidateMode: "onChange",
  });

  const { mutate: addCategory } = useMutation({
    mutationFn: async (data: Inputs) => {
      const response = await client.post('/user-category', data, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return response.data;
    }
  });

  // Fetch permissions from the backend
  const fetchPermissions = async () => {
    try {
      const response = await client.get('/permissions');
      const permissionsData = response.data.permissions;
      const formattedPermissions = formatPermissions(permissionsData);
      setPermissions(formattedPermissions);  // Store formatted permissions
    } catch (error) {
      console.error("Error fetching permissions:", error);
    }
  };

  // Map the data to a tree structure of permission nodes
  const formatPermissions = (permissions: any): PermissionNode[] => {
    const formatted: PermissionNode[] = [];

    Object.keys(permissions).forEach((categoryKey) => {
      const category = permissions[categoryKey];
      formatted.push({
        label: category.parent,  // Parent permission
        value: category.parent,  // Value will be the same as parent permission
        children: category.children,  // Child permissions
      });
    });

    return formatted;
  };

  // Fetch permissions on component mount
  useEffect(() => {
    fetchPermissions();
  }, []);

  // Handle permission checkbox change
  const handlePermissionChange = (event: React.ChangeEvent<HTMLInputElement>, permission: string) => {
    if (event.target.checked) {
      setSelectedPermissions(prev => [...prev, permission]);
    } else {
      setSelectedPermissions(prev => prev.filter(item => item !== permission));
    }
  };

  // Handle form submit
  const onSubmit = (data: Inputs) => {
    const payload = {
      ...data,
      permissions: selectedPermissions, // Include selected permissions in the payload
    };

    console.log("Payload being sent:", payload);
    addCategory(payload);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-screen sm:w-96 mx-auto mt-10">
      <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Add New Category</h2>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        {/* Role Input */}
        <div className="mb-6">
          <ControlledInput
            label="Role"
            type="text"
            name="role"
            placeholder="Enter role"
            register={register}
            errors={errors}
            required
            classes={{
              input: "border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500",
            }}
          />
        </div>

        {/* Description Text Area */}
        <div className="mb-6">
          <ControlledInput
            label="Description"
            name="description"
            placeholder="Enter category description"
            register={register}
            errors={errors}
            required
            classes={{
              input: "border border-gray-300 rounded-md p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500",
            }}
          />
        </div>

        {/* Permissions Checkbox Tree */}
        <div className="mb-6">
          <h3 className="font-semibold text-lg text-gray-800 mb-3">Select Permissions</h3>
          <div className="space-y-4">
            {permissions.length > 0 ? (
              permissions.map((permission) => (
                <PermissionCheckbox
                  key={permission.value}
                  permission={permission}
                  selectedPermissions={selectedPermissions}
                  handlePermissionChange={handlePermissionChange}
                />
              ))
            ) : (
              <p>Loading permissions...</p>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            type="submit"
            className="bg-blue-500 text-white px-8 py-3 rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Add Category
          </button>
        </div>
      </form>
    </div>
  );
};

// Recursive component to render the permissions tree
const PermissionCheckbox = ({
  permission,
  selectedPermissions,
  handlePermissionChange
}: {
  permission: PermissionNode;
  selectedPermissions: string[];
  handlePermissionChange: (event: React.ChangeEvent<HTMLInputElement>, permission: string) => void;
}) => {
  const isChecked = selectedPermissions.includes(permission.value);

  return (
    <div className="ml-4 mt-2">
      <Checkbox
        label={permission.label}
        value={permission.value}
        checked={isChecked}
        onChange={(e) => handlePermissionChange(e, permission.value)}
        classNames={{
          input: "text-blue-600 border-blue-500 focus:ring-blue-600",
        }}
      />
      {permission.children && permission.children.length > 0 && (
        <div className="ml-6 space-y-2 mt-3">
          {permission.children.map((child) => (
            <Checkbox
              key={child}
              label={child}
              value={child}
              checked={selectedPermissions.includes(child)}
              onChange={(e) => handlePermissionChange(e, child)}
              classNames={{
                input: "text-blue-600 border-blue-500 focus:ring-blue-600",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AddCategoryForm;
