/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import { ActionIcon, Flex, Tooltip } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  Pencil,
  PencilOff,
  Trash,
  TrashOff,
  UserOff,
} from "tabler-icons-react"; // Import UserOff icon
// import { routeNames } from "../../Routes/routeNames";

// import { UserContext } from "../../contexts/UserContext";
import DeleteModal from "../DeleteModal";
import ViewModal from "../ViewModal"
import { Loader } from "@mantine/core"

const ActionIcons = ({
  rowData,
  type,
  edit,
  view,
  del,
  viewData,
  blocked,
  left,
}) => {
  const queryClient = useQueryClient();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [openDelete, setOpenDelete] = useState(false);
  const [openView, setOpenView] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //to view
  const handleView = () => {
    setOpenView(true);
  };

  //to edit
  const handleEdit = () => {
    // switch (type) {
    //   case "service":
    //     navigate(routeNames.general.addService, {
    //       state: {
    //         isUpdate: true,
    //         data: rowData,
    //       },
    //     });
    //     break;
    //   case "project":
    //     navigate(routeNames.general.addProject, {
    //       state: {
    //         isUpdate: true,
    //         data: rowData,
    //       },
    //     });
    //     break;
  
    // }
  };

  //to delete

  
  // Update both mutations to use the backend URL from the environment variable
  const handleDelete = useMutation(
    async () => {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL; // Use environment variable
      const link = `${backendUrl}/api/user/${rowData._id}`;
  
      return axios.delete(link);
    },
   
  );
  
  // To toggle the 'left' status
  const handleToggleLeft = useMutation(
    async () => {
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL; // Use environment variable
      const link = `${backendUrl}/api/v1/${type}/${rowData._id}/left`;
  
      return axios.put(
        link,
        { left: !rowData.left }, // Toggle left status here
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      );
    },
    {
      onSuccess: () => {
        showNotification({
          title: "Success",
          message: `Team Member marked as ${
            rowData.left ? "not left" : "left"
          } successfully`, // Notification message toggles
          color: "green",
        });
        queryClient.invalidateQueries("fetchTeamMembers");
      },
      onError: (res) => {
        showNotification({
          title: "Error",
          message: res?.data?.message,
          color: "red",
        });
      },
    }
  );
  

  return (
    <Flex gap={5}>
      {view && (
        <Tooltip label="View">
          <ActionIcon>
            <Eye color={"green"} size={"4xl"} onClick={handleView} />
          </ActionIcon>
        </Tooltip>
      )}
      {edit && (
        <Tooltip label="Edit">
          <ActionIcon onClick={handleEdit} disabled={blocked}>
            {blocked ? <PencilOff /> : <Pencil color="purple" />}
          </ActionIcon>
        </Tooltip>
      )}
      {del && (
        <Tooltip label="Delete">
          <ActionIcon disabled={blocked}>
            {blocked ? (
              <TrashOff />
            ) : (
              <Trash color={"red"} onClick={() => setOpenDelete(true)} />
            )}
          </ActionIcon>
        </Tooltip>
      )}
      {left && (
        <Tooltip label={rowData.left ? "Mark as Not Left" : "Mark as Left"}>
          <ActionIcon
            onClick={() => handleToggleLeft.mutate()}
            disabled={blocked || isLoading}
          >
            {isLoading ? (
              <Loader color={"orange"} size="sm" />
            ) : (
              <UserOff color={rowData.left ? "gray" : "orange"} />
            )}
          </ActionIcon>
        </Tooltip>
      )}
      <ViewModal
        opened={openView}
        setOpened={setOpenView}
        title={<span style={{ fontWeight: 'bold', color:'black', fontSize: '2rem' }}>{`View ${type}`}</span>}
      >
        {viewData}
      </ViewModal>
      <DeleteModal
        label={`Delete ${type}`}
        message={`Are you sure you want to delete this ${type}? This action is irreversible.`}
        opened={openDelete}
        onDelete={() => handleDelete.mutate()}
        setOpened={setOpenDelete}
        loading={handleDelete.isLoading}
      />
    </Flex>
  );
};

export default ActionIcons;
