/* eslint-disable no-unused-vars */
import axios from "axios";
import { Container, Group } from "@mantine/core";
import { useMutation, useQuery } from "react-query";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import InputField from "../../../components/InputField";
import TextArea from "../../../components/TextArea";
import Button from "../../../components/Button";
import PageHeader from "../../../components/PageHeader";
import { backendUrl } from "../../../constants/constants";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import DropZone from "../../../components/Dropzone";
import { useLocation, useNavigate } from "react-router";
import { routeNames } from "../../../Routes/routeNames";
import SelectMenu from "../../../components/SelectMenu";

export const AddProject = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  let { state } = useLocation();
  const [categories, setCategories] = useState([]);

  const form = useForm({
    validateInputOnChange: true,
    initialValues: {
      title: "",
      description: "",
      shortDescription: "",
      coverImage: null,
      // homeImage: null,
      link: "",
      category: "",
    },

    validate: {
      title: (value) =>
        value?.length > 1 && value?.length < 30
          ? null
          : "Please enter project title between 2 to 30 characters",
      description: (value) =>
        value?.length > 0 ? null : "Please enter project description",
      shortDescription: (value) =>
        value?.length > 1 && value?.length < 100
          ? null
          : "Please enter short description between 2 and 100 characters",
      coverImage: (value) => (value ? null : "Please upload a cover Image"),
      // homeImage: (value) => (value ? null : "Please upload a home Image"),
      link: (value) => (value ? null : "Please enter project link"),
      category: (value) => (value ? null : "Please select category"),
    },
  });

  useEffect(() => {
    if (state?.isUpdate) {
      form.setValues(state.data);
      form.setFieldValue("category", state?.data?.category?._id);
    }
  }, [state]);

  //categories
  const { status } = useQuery(
    "fetchServices",
    () => {
      return axios.get(backendUrl + "/api/v1/web/services", {
        headers: {
          authorization: `Bearer ${user.token}`,
        },
      });
    },
    {
      onSuccess: (res) => {
        let data = res.data.data.map((item) => {
          return { value: item._id, label: item.title };
        });
        setCategories(data);
      },
    }
  );

  const handleAddService = useMutation(
    (values) => {
      if (state?.isUpdate)
        return axios.patch(
          `${backendUrl + `/api/v1/project/${state?.data?._id}`}`,
          values,
          {
            headers: {
              authorization: `Bearer ${user.token}`,
            },
          }
        );
      else
        return axios.post(`${backendUrl + "/api/v1/project"}`, values, {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        });
    },
    {
      onSuccess: (response) => {
        if (response.data?.success) {
          showNotification({
            title: "Success",
            message: response?.data?.message,
            color: "green",
          });
          navigate(routeNames.general.viewProjects);
          form.reset();
        } else {
          showNotification({
            title: "Error",
            message: response?.data?.message,
            color: "red",
          });
        }
      },
    }
  );
  return (
    <Container fluid>
      <PageHeader label={state?.isUpdate ? "Edit Project" : "Add Project"} />
      <form
        onSubmit={form.onSubmit((values) => handleAddService.mutate(values))}
      >
        <InputField
          label={"Title"}
          placeholder={"Enter Project Title"}
          form={form}
          withAsterisk
          validateName={"title"}
        />
        <SelectMenu
          data={categories}
          label="Project Service"
          placeholder="Select Project Service Category"
          withAsterisk
          form={form}
          validateName="category"
        />
        <InputField
          label={"Project Link"}
          placeholder={"Enter Project Link"}
          form={form}
          withAsterisk
          validateName={"link"}
        />
        <TextArea
          label={"Short Description"}
          placeholder={"Enter Short Description"}
          rows="2"
          form={form}
          withAsterisk
          validateName={"shortDescription"}
        />
        <TextArea
          label={"Detail Description"}
          placeholder={"Enter Detailed Description"}
          rows="4"
          form={form}
          withAsterisk
          validateName={"description"}
        />
        <Group position="center">
          <DropZone
            form={form}
            folderName={"service"}
            name={"coverImage"}
            label="Cover Image"
          />
          {/* <DropZone
            form={form}
            folderName={"service"}
            name={"homeImage"}
            label="Home Image"
          /> */}
        </Group>
        <Group position="right" mt={"md"}>
          <Button
            label={"Cancel"}
            variant={"outline"}
            onClick={() => navigate(routeNames.general.viewProjects)}
          />
          <Button
            label={state?.isUpdate ? "Edit Project" : "Add Project"}
            type={"submit"}
            loading={handleAddService.isLoading}
          />
        </Group>
      </form>
    </Container>
  );
};
