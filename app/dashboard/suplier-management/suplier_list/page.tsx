/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'; // Ensure this is a client component

import React, { useState, useEffect, useCallback } from 'react';
import { client } from '@/app/_utils/axios';  // Assuming this is your Axios client
import { Loader, Button, Group } from '@mantine/core'; // Importing Mantine Button and Group components
import { Eye, Edit, Trash } from 'tabler-icons-react'; // Import icons from Tabler Icons
import DynamicTable from '@/app/_components/Table/DynamicTable';
import axios from 'axios';

const ViewUserPage = () => {
  const [users, setUsers] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await client.get('/supplier');  // Assuming your API endpoint is /user
      console.log('API Response:', response.data);
      setUsers(response.data); // Assuming response.data contains the array of users
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  // Use useCallback for handleDelete to prevent unnecessary re-creations of the function
  const handleDelete = useCallback(async (row: any) => {
    console.log('Row Data:', row._id);
    try {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL; // Use environment variable
      const link = `${backendUrl}/supplier/${row._id}`;
      console.log("Delete Link:", link);
      await axios.delete(link);
      setUsers((prevUsers: any) => {
        return {
          ...prevUsers,
          data: prevUsers.data.filter((user: any) => user._id !== row._id),
        };
      });
      alert("Deleteddddd")
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }, []);

  // Fetch users data
  useEffect(() => {
    fetchUsers();
  }, [handleDelete]);

   // Empty dependency array means the function won't change across re-renders

  // Updated columns array to match DynamicTable's expected structure
  const columns = [
    {
      label: 'Name',
      key: 'firstName',
      render: (_: string, row: { firstName: string; lastName: string }) => {
        return <span>{row?.firstName} {row?.lastName}</span>;
      }, // Combine first and last name
      sortable: true,
    },
    {
      label: 'Email',
      key: 'email',
      render: (_: string, row: { email: string }) => <span>{row?.email}</span>, // Directly render email
      sortable: true,
    },
    {
      label: 'Status',
      key: 'status',
      render: (_: string, row: { isBlocked: boolean }) => <span>{row?.isBlocked ? 'Blocked' : 'Unblock'}</span>, // Check if user is blocked
      sortable: true,
    },
    {
      label: 'Action',
      key: 'action',
      render: (value: any, row: any) => (
        <Group>
          <Button variant="outline" size="xs" onClick={() => handleView(row)} title="View">
            <Eye size={16} />
          </Button>
          <Button variant="outline" size="xs" onClick={() => handleEdit(row)} title="Edit">
            <Edit size={16} />
          </Button>
          <Button variant="outline" size="xs" color="red" onClick={() => handleDelete(row)} title="Delete">
            <Trash size={16} />
          </Button>
        </Group>
      ),
      sortable: false,  // Actions column generally does not need sorting
    },
  ];

  // Handler functions (optional)
  const handleView = (row: any) => {
    console.log('Row Data:', row);
    // Implement your view logic here
  };

  const handleEdit = (row: any) => {
    console.log('Row Data:', row);
    // Implement your edit logic here
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
        <DynamicTable columns={columns} data={users.data || []} caption="User Table" />
      )}
    </div>
  );
};

export default ViewUserPage;