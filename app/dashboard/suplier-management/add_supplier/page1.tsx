// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";
// import { useEffect, useState } from "react";
// import { useAppDispatch } from "@/app/store/hook";
// import { useRouter } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { useMutation } from "@tanstack/react-query";
// import { AxiosError } from "axios";
// import { toast } from "react-toastify";
// import { client } from "@/app/_utils/axios";
// // Import custom components
// import ControlledInput from "@/app/_components/Forms/ControlledInput";
// import { cookies } from "next/headers";

// // Define input types for form
// type Inputs = {
//     SupplierName: string;
//     lastName: string;
//     email: string;
//     dateOfBirth: string;
//     zipCode: string;
//     state: string;
//     city: string;
//     address: string;
// };

// export default function ProfileSettingsPage() {
//     const router = useRouter();
//     const {
//         register,
//         handleSubmit,

//         getValues,
//         formState: { errors },
//     } = useForm<Inputs>({
//         reValidateMode: "onChange",
//     });

//     // const cookieStore = await cookies(); // This returns a ReadonlyRequestCookies object
//     // const token = cookieStore.get("accessToken")?.value; // Access the token value

//     // useEffect(() => {
//     //     const fetchProfile = async () => {
//     //         const response = await client.get("auth/profile" , {
//     //             headers: {
//     //                 Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDA5OTYzNjljZjc3OWQzZGI5NjlmNyIsImlhdCI6MTczMjI5NjU1MywiZXhwIjoxNzMyMzAwMTUzfQ.g3pWIyg4ue3MhZ5G5bYAQm-90GAQL0dqSmH9MPWkx5M`,
//     //     }});
//     //         console.log("response", response.data.data);
//     //         // const { firstName, lastName, email, phoneNumber, dateOfBirth, address, city, state, zipCode } = response.data.data;
//     //         // setValues({ firstName, lastName, email, phoneNumber, dateOfBirth, address, city, state, zipCode });
//     //     };
//     //     fetchProfile();
//     // }, []);

//     useEffect(() => {
//         console.log("Hello");
//         const fetchProfile = async () => {
//             try {
//                 console.log("inside fetc profile");
//                 const response = await client.get("auth/profile", {
//                     headers: {
//                         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//                     },
//                 });
//                 const data = await response.data;

//                 console.log("response", data.user);
//             } catch (error) {
//                 console.error("Error fetching profile:", error);
//             }
//             // await fetch("https://8rgvpdmw-5000.euw.devtunnels.ms/api/auth/profile", {
//             //   method: "GET",
//             //   headers: {
//             //     Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDA5OTYzNjljZjc3OWQzZGI5NjlmNyIsImlhdCI6MTczMjI5NjU1MywiZXhwIjoxNzMyMzAwMTUzfQ.g3pWIyg4ue3MhZ5G5bYAQm-90GAQL0dqSmH9MPWkx5M`,
//             //   },
//             // });

//             // if (!response.ok) {
//             //   throw new Error(`HTTP error! Status: ${response.status}`);
//             // }

//             // const data = await response.json();

//             // console.log("response", data.user);
//             // const { firstName, lastName, email, phoneNumber, dateOfBirth, address, city, state, zipCode } = data.data;
//             // setValues({ firstName, lastName, email, phoneNumber, dateOfBirth, address, city, state, zipCode });
//             //   }
//             //    catch (error) {
//             //     console.error("Error fetching profile:", error);
//             //   }
//         };

//         fetchProfile();
//     }, []);

//     console.log("getvalues", getValues());
//     console.log("errors", errors);
//     const onSubmit = useMutation({
//         mutationFn: async (data: Inputs) => {
//             console.log("before sending req", data);
//             data.email = data.email.toLowerCase();
//             // data.userType = "Customer";
//             const response = await client.post("auth/update-profile", data, {
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${localStorage.getItem("token")}`,
//                 },
//             });
//             return response.data.data;
//         },

//         onSuccess: (data, inputs) => {
//             toast.success("You have successfully registered");
//             // dispatch(openModal({ mode: "login" }));
//         },
//         onError: (error: AxiosError<any>) => {
//             console.log(error.response?.data);
//             toast.error(error.response?.data?.message || "There was an error registering");
//         },
//     });

//     return (
//         <div className="px-5">
//             <div className="text-center mb-6">
//                 <h2 className="font-bold text-2xl">Add Supplier</h2>
//                 <p className="text-gray-600">Update Your Profile Information</p>
//             </div>

//             <form className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" onSubmit={handleSubmit((data) => onSubmit.mutate(data))} noValidate>
//                 <ControlledInput
//                     label="Supplier Name"
//                     type="text"
//                     name="SupplierName"
//                     placeholder="Enter a Supplier Name"
//                     errors={errors}
//                     register={register}
//                     rules={{
//                         required: "First Name is required",
//                         pattern: {
//                             value: /^[a-z ,.'-]+$/i,
//                             message: "Invalid First Name",
//                         },
//                         minLength: {
//                             value: 2,
//                             message: "First Name should be atleast 2 characters",
//                         },
//                     }}
//                     classes={{
//                         input: "text-xl px-4 py-3",
//                     }}
//                     required
//                 />

//                 <ControlledInput
//                     label="Last Name"
//                     type="text"
//                     name="lastName"
//                     placeholder="Last Name"
//                     errors={errors}
//                     register={register}
//                     rules={{
//                         required: "Last Name is required",
//                         pattern: {
//                             value: /^[a-z ,.'-]+$/i,
//                             message: "Invalid Last Name",
//                         },
//                         minLength: {
//                             value: 2,
//                             message: "Last Name should be atleast 2 characters",
//                         },
//                     }}
//                     classes={{
//                         input: "text-xl px-4 py-3",
//                     }}
//                     required
//                 />

//                 <ControlledInput
//                     label="Email"
//                     type="email"
//                     name="email"
//                     placeholder="Email"
//                     errors={errors}
//                     register={register}
//                     rules={{
//                         required: "Email is required",
//                         pattern: {
//                             value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
//                             message: "Invalid email address",
//                         },
//                     }}
//                     classes={{
//                         input: "text-xl px-4 py-3",
//                     }}
//                     required
//                 />

//                 <ControlledInput
//                     label="Phone Number"
//                     type="tel"
//                     name="phoneNumber"
//                     placeholder="Cell Number"
//                     mask={"+1(999)-999-9999"}
//                     errors={errors}
//                     register={register}
//                     rules={{
//                         required: "Cell Number is required",
//                         pattern: {
//                             value: /^(\+1\s?)?(\d{3}|\(\d{3}\))[\s\-]?\d{3}[\s\-]?\d{4}$/,
//                             message: "Invalid Cell Number",
//                         },
//                     }}
//                     classes={{
//                         input: "text-xl px-4 py-3",
//                     }}
//                     required
//                 />

//                 {/* <ControlledInput
//                     label="Password"
//                     type="password"
//                     name="password"
//                     placeholder="Password"
//                     errors={errors}
//                     register={register}
//                     rules={{
//                         required: "Password is required",
//                         pattern: {
//                             value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
//                             message: "Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character",
//                         },
//                     }}
//                     classes={{
//                         input: "text-xl px-4 py-3",
//                     }}
//                     required
//                 /> */}

//                 <ControlledInput
//                     label="Date of Birth"
//                     type="date"
//                     name="dateOfBirth"
//                     placeholder="Date of Birth"
//                     errors={errors}
//                     register={register}
//                     // rules={{
//                     //     required: "Password is required",
//                     //     pattern: {
//                     //         value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
//                     //         message: "Must Contain 8 Characters, 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Character",
//                     //     },
//                     // }}
//                     classes={{
//                         input: "text-xl p-4 w-full",
//                     }}
//                     required
//                 />

//                 {/* <ControlledInput
//                     label="Address"
//                     type="text"
//                     name="address"
//                     placeholder="Address"
//                     errors={errors}
//                     register={register}
//                     rules={{
//                         required: "Address is required",
//                     }}
//                     classes={{
//                         input: "text-xl p-4 w-full",
//                     }}
//                     required
//                 /> */}

//                 {/* <ControlledInput
//                     label="City"
//                     type="text"
//                     name="city"
//                     placeholder="City"
//                     errors={errors}
//                     register={register}
//                     rules={{
//                         required: "City is required",
//                         pattern: {
//                             value: /^[a-z ,.'-]+$/i,
//                             message: "Invalid City",
//                         },
//                     }}
//                     classes={{
//                         input: "text-xl p-4 w-full",
//                     }}
//                     required
//                 /> */}

//                 {/* <ControlledInput
//                     label="Zip Code"
//                     type="text"
//                     name="zipCode"
//                     placeholder="Zip Code"
//                     errors={errors}
//                     register={register}
//                     rules={{
//                         required: "Zip Code is required",
//                         pattern: {
//                             value: /^\d{5}(-\d{4})?$/,
//                             message: "Invalid Zip Code",
//                         },
//                     }}
//                     classes={{
//                         input: "text-xl p-4 w-full",
//                     }}
//                     required
//                 /> */}

//                 {/* <ControlledInput
//                     label="State"
//                     type="text"
//                     name="state"
//                     placeholder="State"
//                     errors={errors}
//                     register={register}
//                     rules={{
//                         required: "State is required",
//                         pattern: {
//                             value: /^[a-z ,.'-]+$/i,
//                             message: "Invalid State",
//                         },
//                     }}
//                     classes={{
//                         input: "text-xl p-4 w-full",
//                     }}
//                     required
//                 /> */}

//                 <div className="md:col-span-2 lg:col-span-3 flex justify-end gap-5 mt-4">
//                     <button type="button" className="bg-gray-500 rounded-md px-8 py-4 font-medium text-white hover:bg-gray-600 transition-colors">
//                         Reset
//                     </button>
//                     <button type="submit" className="bg-red-500 rounded-md px-8 py-4 font-medium text-white hover:bg-red-600 transition-colors">
//                         Add Supplier
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// }
