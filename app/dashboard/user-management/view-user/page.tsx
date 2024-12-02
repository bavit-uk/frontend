/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"; // Ensure this is a client component

import React, { useState, useEffect, useCallback } from "react";
import { client } from "@/app/_utils/axios"; // Assuming this is your Axios client
import { Loader, Button, Group } from "@mantine/core"; // Importing Mantine Button and Group components
import { Eye, Edit, Trash } from "tabler-icons-react"; // Import icons from Tabler Icons
import DynamicTable from "@/app/_components/Table/DynamicTable";
import axios from "axios";
import ViewModal from "../../../_components/ViewModal/index";
import { useRouter } from "next/navigation";


const ViewUserPage = () => {
  const [users, setUsers] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [openView, setOpenView] = useState(false); // State to control modal visibility
  const [selectedUser, setSelectedUser] = useState<any>(null); // State to hold the selected user data
const router=useRouter()
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await client.get("/user"); // Assuming your API endpoint is /user
      console.log("API Response:", response.data);
      setUsers(response.data); // Assuming response.data contains the array of users
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  // Use useCallback for handleDelete to prevent unnecessary re-creations of the function
  const handleDelete = useCallback(async (row: any) => {
    console.log("Row Data:", row._id);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL; // Use environment variable
      const link = `${backendUrl}/user/${row._id}`;
      console.log("Delete Link:", link);
      await axios.delete(link);
      setUsers((prevUsers: any) => {
        return {
          ...prevUsers,
          data: prevUsers.data.filter((user: any) => user._id !== row._id),
        };
      });
      alert("Deleteddddd");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }, []);

  // Fetch users data
  useEffect(() => {
    fetchUsers();
  }, [handleDelete]);

  // Updated columns array to match DynamicTable's expected structure
  const columns = [
    {
      label: "Name",
      key: "firstName",
      render: (_: string, row: { firstName: string; lastName: string }) => {
        return (
          <span>
            {row?.firstName} {row?.lastName}
          </span>
        );
      }, // Combine first and last name
      sortable: true,
    },
    {
      label: "Email",
      key: "email",
      render: (_: string, row: { email: string }) => <span>{row?.email}</span>, // Directly render email
      sortable: true,
    },
    {
      label: "Status",
      key: "status",
      render: (_: string, row: { isBlocked: boolean }) => (
        <span>{row?.isBlocked ? "Blocked" : "Unblock"}</span>
      ), // Check if user is blocked
      sortable: true,
    },
    {
      label: "Action",
      key: "action",
      render: (value: any, row: any) => (
        <Group>
          <Button
            variant="outline"
            size="xs"
            onClick={() => handleView(row)}
            title="View"
          >
            <Eye size={16} />
          </Button>
          <Button
            variant="outline"
            size="xs"
            onClick={() => handleEdit(row)}
            title="Edit"
          >
            <Edit size={16} />
          </Button>
          <Button
            variant="outline"
            size="xs"
            color="red"
            onClick={() => handleDelete(row)}
            title="Delete"
          >
            <Trash size={16} />
          </Button>
        </Group>
      ),
      sortable: false, // Actions column generally does not need sorting
    },
  ];

  // Function to handle opening the modal and passing selected user data
  const handleView = (row: any) => {
    setSelectedUser(row); // Set selected user data
    setOpenView(true); // Open the modal
  };

  
  const handleEdit = (row: any) => {
    console.log("Row Data:", row);  // You can log or inspect the row data here
  
    // Get the user ID or unique identifier from the row object
  const userId = row._id; // Assuming the row has an _id field
  localStorage.setItem("editUserData",JSON.stringify(row));
    // Use the router to navigate to the edit page
  router.push("/edit-user");
  };

  return (
    <div className="px-5">
      <div className="text-center mb-6">
        <h2 className="font-bold text-2xl">View Users</h2>
        <p className="text-gray-600">Manage user details and their roles</p>
      </div>

      {loading ? (
        <div className="text-center py-4">
          <Loader size="xl" />
        </div>
      ) : (
        <DynamicTable
          columns={columns}
          data={users.data || []}
          caption="User Table"
        />
      )}

      {/* ViewModal: Pass the modal props and selected user to show modal */}
      <ViewModal opened={openView} setOpened={setOpenView} title="User Details">
        {selectedUser ? (
          <div>
            <h3>
              Name: {selectedUser.firstName} {selectedUser.lastName}
            </h3>
            <p>Email: {selectedUser.email}</p>
            <p>Status: {selectedUser.isBlocked ? "Blocked" : "Active"}</p>
            {/* You can add more user details here */}
          </div>
        ) : (
          <p>No user selected</p>
        )}
      </ViewModal>
    </div>
  );
};

export default ViewUserPage;
