"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const ProfilePage = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        dob: "",
        profileImage: "",
        oldPassword: "",
        newPassword: "",
        address: [],
    });

    const [userId, setUserId] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch user data on page load (GET request to your backend API)
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get("https://8rgvpdmw-5000.euw.devtunnels.ms/api/auth/profile", {
                    headers: {
                        Authorization: `Bearer  eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDM2NDdkMDU4MjAxYzg0N2QyZGI1MSIsImlhdCI6MTczMjYxOTEwNSwiZXhwIjoxNzMyNjIyNzA1fQ.cA-x2_8qmOn8TjUwI_dmWNEddlyVxg5NWli-gqkEyxw`, // Replace <YOUR_TOKEN_HERE> with actual token
                    },
                });

                // Populate form with user data
                const user = response.data.user;
                setUserId(user._id);
                setFormData({
                    firstName: user.firstName || "",
                    lastName: user.lastName || "",
                    phoneNumber: user.phoneNumber || "",
                    dob: user.dob || "",
                    profileImage: user.profileImage || "",
                    oldPassword: "",
                    newPassword: "",
                    address: response.data.addresses || [],
                });
            } catch (err) {
                console.log("Error fetching user data:", err);
                setError("Error fetching user data");
            } finally {
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    // Handle changes in the form fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle changes in address fields
    const handleAddressChange = (index, e) => {
        const { name, value, checked } = e.target;
        const updatedAddresses = [...formData.address];
        if (name === "isDefault") {
            updatedAddresses[index][name] = checked;
        } else {
            updatedAddresses[index][name] = value;
        }
        setFormData((prevData) => ({
            ...prevData,
            address: updatedAddresses,
        }));
    };

    // Add new address
    const handleAddAddress = () => {
        setFormData((prevData) => ({
            ...prevData,
            address: [
                ...prevData.address,
                {
                    label: "",
                    street: "",
                    city: "",
                    state: "",
                    postalCode: "",
                    country: "",
                    isDefault: false,
                },
            ],
        }));
    };

    // Remove an address
    const handleRemoveAddress = (index) => {
        const updatedAddresses = formData.address.filter((_, idx) => idx !== index);
        setFormData((prevData) => ({
            ...prevData,
            address: updatedAddresses,
        }));
    };

    // Handle form submit (PATCH request to your backend API)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log("address in submit form", formData.address);
            const response = await axios.patch("http://localhost:5000/api/auth/update-profile", formData, {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3NDM2NDdkMDU4MjAxYzg0N2QyZGI1MSIsImlhdCI6MTczMjU0MTE1MSwiZXhwIjoxNzMyNTQ0NzUxfQ.Icb_gBFFi5aD_cQQUBeqz0sJVxQEvy91JsZooGj3rGw`, // Replace <YOUR_TOKEN_HERE> with actual token
                },
            });
            alert(response.data.message || "Profile updated successfully!");
        } catch (err) {
            console.log("Error updating profile:", err);
            setError("Error updating profile");
        }
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div className="container mx-auto p-6 max-w-4xl">
            <h1 className="text-3xl font-semibold mb-6">Update Profile</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                            First Name
                        </label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm" required />
                    </div>
                    <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                            Last Name
                        </label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm" required />
                    </div>
                </div>

                <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                        Phone Number
                    </label>
                    <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm" />
                </div>

                <div>
                    <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
                        Date of Birth
                    </label>
                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm" />
                </div>

                <div>
                    <label htmlFor="profileImage" className="block text-sm font-medium text-gray-700">
                        Profile Image URL
                    </label>
                    <input type="text" name="profileImage" value={formData.profileImage} onChange={handleChange} className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm" />
                </div>

                <div>
                    <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700">
                        Old Password
                    </label>
                    <input type="password" name="oldPassword" value={formData.oldPassword} onChange={handleChange} className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm" />
                </div>

                <div>
                    <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
                        New Password
                    </label>
                    <input type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm" />
                </div>

                {/* Address Section */}
                <h2 className="text-2xl font-semibold mt-8 mb-4">Addresses</h2>
                {formData.address.map((address, index) => (
                    <div key={index} className="space-y-4 bg-gray-50 p-6 rounded-lg shadow-md mb-4">
                        <div>
                            <label htmlFor="label" className="block text-sm font-medium text-gray-700">
                                Label
                            </label>
                            <input type="text" name="label" value={address.label} onChange={(e) => handleAddressChange(index, e)} className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm" required />
                        </div>
                        <div>
                            <label htmlFor="street" className="block text-sm font-medium text-gray-700">
                                Street
                            </label>
                            <input type="text" name="street" value={address.street} onChange={(e) => handleAddressChange(index, e)} className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm" required />
                        </div>
                        <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                                City
                            </label>
                            <input type="text" name="city" value={address.city} onChange={(e) => handleAddressChange(index, e)} className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm" required />
                        </div>
                        <div>
                            <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                                State
                            </label>
                            <input type="text" name="state" value={address.state} onChange={(e) => handleAddressChange(index, e)} className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm" required />
                        </div>
                        <div>
                            <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700">
                                Postal Code
                            </label>
                            <input type="text" name="postalCode" value={address.postalCode} onChange={(e) => handleAddressChange(index, e)} className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm" required />
                        </div>
                        <div>
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                                Country
                            </label>
                            <input type="text" name="country" value={address.country} onChange={(e) => handleAddressChange(index, e)} className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm" required />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                <input type="checkbox" name="isDefault" checked={address.isDefault} onChange={(e) => handleAddressChange(index, e)} className="mr-2" />
                                Set as Default Address
                            </label>
                        </div>
                        <button type="button" onClick={() => handleRemoveAddress(index)} className="mt-4 text-red-500 hover:text-red-700">
                            Remove Address
                        </button>
                    </div>
                ))}

                <button type="button" onClick={handleAddAddress} className="text-blue-500 hover:text-blue-700 mb-6">
                    Add New Address
                </button>

                <div>
                    <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700">
                        Save Changes
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProfilePage;
