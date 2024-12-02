/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/app/store/hook";
import { useRouter } from "next/navigation";
import { set, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { client } from "@/app/_utils/axios";
import { Loader } from "lucide-react";
// Import custom components
import ControlledInput from "@/app/_components/Forms/ControlledInput";
import ControlledSelect from "@/app/_components/Forms/ControlledSelect";

// Define input types for form
type Address = {
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  label: string;
  _id?: string;
};

type Inputs = {
  firstName: string;
  userCategory: string;
  lastName: string;
  street: string;
  label: string;
  userType: string;
  city: string;
  state: string;
  postalCode: string;
  phoneNumber: string;
  password: string;
  email: string;
  dob: string;
  country: string;
  _id: string;
  address: Address[];
};

export default function ProfileSettingsPage() {
  const [userData, setUserData] = useState<Inputs | null>(null);
  const [editUserData, setEditUserData] = useState<any | null>([]);
  const [userCategory, setUserCategory] = useState<{ _id: string; role: string }[] | null>(null);
  const [userAddress, setUserAddress] = useState<Address[] | null>(null);

  const [isAddressExists, setIsAddressExists] = useState<boolean>(false); // Track address existence
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({
    reValidateMode: "onChange",
  });

  useEffect(() => {
    // Get user data from localStorage
    const storedService = localStorage.getItem("editUserData");

    console.log("vendor service data", storedService);
    if (storedService) {
      const parsedServiceData = JSON.parse(storedService);
      console.log(`parsed data`, parsedServiceData);
      setEditUserData(parsedServiceData);
      // Populate the form with data retrieved from localStorage
      setValue("firstName", editUserData.firstName);
      reset({
        firstName: editUserData.firstName,
        lastName: editUserData.lastName,
        phoneNumber: editUserData.phoneNumber,
        email: editUserData.email,
        password: "", // You might not want to pre-fill this
        dob: editUserData.dob,
        _id: editUserData._id,
        address: editUserData.address,
      });
    }
  }, [userCategory]);

  useEffect(() => {
    const fetchUserCategory = async () => {
      try {
        const response = await client.get("/user-category");
        setUserCategory(response.data);
      } catch (error) {
        console.error("Error fetching user category:", error);
        toast.error("Failed to load user categories.");
      }
    };
    fetchUserCategory();
  }, []);
  useEffect(() => {
    // Ensure the editUserData has been set and has the required _id
    if (editUserData?._id) {
      console.log("Edit user data after", editUserData);

      const fetchUserAddress = async () => {
        try {
          const response = await client.get(`/user/address/${editUserData._id}`);

          if (response.data && response.data.address) {
            const addresses = response.data.address;
            const addressesList = Array.isArray(addresses) ? addresses : [addresses];
            setUserAddress(addressesList);
            setIsAddressExists(true); // Address exists
          } else {
            setIsAddressExists(false); // Address doesn't exist
          }
          //   setUserAddress(response.data);
          console.log("Got the address", response.data);
        } catch (error) {
          console.error("Error fetching user address:", error);
          toast.error("Failed to load user address.");
        }
      };

      fetchUserAddress();
    }
  }, [editUserData]);
  //   useEffect(() => {
  //     console.log("Edit user data", editUserData);
  //     const fetchUserAddress = async () => {
  //       try {
  //         const response = await client.get(`/address/${editUserData?._id}`);
  //         setUserAddress(response.data);
  //         console.log("got the address", response.data);
  //       } catch (error) {
  //         console.error("Error fetching user category:", error);
  //         toast.error("Failed to load user categories.");
  //       }
  //     };
  //     if (editUserData.length > 0) {
  //       fetchUserAddress();
  //     }
  //   }, [editUserData]);

  useEffect(() => {
    // Check if userAddress and userAddress.address are present
    // console.log("User Address", userAddress);

    // console.log("Address is not here");
    if (userAddress && userAddress.length > 0) {
      // console.log("Address", userAddress.address.street);
      const firstAddress = userAddress[0];

      console.log("First Address", firstAddress);
      reset({
        label: firstAddress.label,
        street: firstAddress.street,
        city: firstAddress.city,
        state: firstAddress.state,
        postalCode: firstAddress.postalCode,
        country: firstAddress.country,
        // address: firstAddress, // You can keep this if you want to store the entire address object
      });
    }
  }, [userAddress, reset]);

  const onSubmit = useMutation({
    mutationFn: async (data: Inputs) => {
      // Prepare the address object
      console.log("dataaaayyy :", data);
      const address = [
        {
          _id: userAddress?.length && userAddress[0]?._id ? userAddress[0]._id : "",
          label: data.label,
          street: data.street,
          city: data.city,
          state: data.state,
          postalCode: data.postalCode,
          country: data.country,
        },
      ] as Address[];
  
      if (!address[0]?._id) {
        delete address[0]._id; // Remove _id if it doesn't exist
      }
  
      console.log("Adresssss : ", data);
      // Prepare the main payload
      const transformedData: Partial<Inputs> = {
        firstName: data.firstName,
        lastName: data.lastName,
        phoneNumber: data.phoneNumber,
        email: data.email,
        userType: data.userCategory,
        dob: data.dob,
        address,
      };
  
      // Add password only if it's provided
      if (data.password) {
        transformedData.password = data.password;
      }
  
      try {
        console.log("Transformed Data:", transformedData);
  
        const response = await client.patch(
          `/user/${editUserData._id}`, // Assuming you're updating by user ID
          transformedData,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
  
        // Show success message
        toast.success("User details updated successfully.");
        
        // Optionally, redirect to the user list page or stay on the edit page
        // router.push("/dashboard/user-management"); // Uncomment this line if you want to redirect back
  
        return response.data;
      } catch (error) {
        // Show error message if update fails
        toast.error("Update failed. Please try again.");
        throw error;
      }
    },
  });
  const handleReset = () => {
    // Reset form values to their initial state
    reset({
      firstName: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      password: '',
      dob: '',
      _id: '', // Clear user ID
      address: [], // Clear the address field
      label: '',
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: ''
    });
  
    // Optionally reset other states like userAddress, userCategory, etc.
    setUserAddress([]); // Clear user address state
    setIsAddressExists(false); // Reset address existence flag

  };
  

  if (!userCategory)
    return (
      <div className="grid place-items-center h-svh">
        <Loader className="animate-spin" size={64} />
      </div>
    );
  return (
    <div className="px-5">
      <div className="text-center mb-6">
        <h2 className="font-bold text-2xl">Edit User</h2>
        <p className="text-gray-600">Update User Information</p>
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
          placeholder="Enter Email"
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

        <ControlledInput
          label="Password"
          type="password"
          name="password"
          placeholder="Password"
          errors={errors}
          register={register}
          //   rules={{
          //     required: "Password is required",
          //     pattern: {
          //       value:
          //         /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          //       message:
          //         "Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character",
          //     },
          //   }}
          classes={{
            input: "text-xl px-4 py-3",
          }}
        />

        <ControlledInput
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          errors={errors}
          register={register}
          //   rules={{
          //     required: "Confirm Password is required",
          //     validate: (value) =>
          //       value === getValues("password") || "Passwords do not match",
          //   }}
          classes={{
            input: "text-xl px-4 py-3",
          }}
        />
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

        <br />

        <ControlledInput
          label="Label"
          type="text"
          name={`label`}
          placeholder="Label"
          errors={errors}
          register={register}
          rules={{}}
          classes={{
            input: "text-xl p-4 w-full",
          }}
          required
        />

        <ControlledInput
          label="Street"
          type="text"
          name={`street`}
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
          name={`city`}
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
          name={`state`}
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
          name={`postalCode`}
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
          name={`country`}
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

        <div className="md:col-span-2 lg:col-span-3 flex justify-end gap-5 mt-4">
          <button onClick={handleReset}
            type="button"
            className="bg-gray-500 rounded-md px-8 py-4 font-medium text-white hover:bg-gray-600 transition-colors"
          >
            Reset
          </button>
          <button
            type="submit"
            className="bg-red-500 rounded-md px-8 py-4 font-medium text-white hover:bg-red-600 transition-colors"
          >
            Update User
          </button>
        </div>
      </form>
    </div>
  );
}
