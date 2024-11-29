import ActionIcons from "../../../components/ActionIcons";
import StatusToggle from "../../../components/StatusToggle";
import TableImageView from "../../../components/TableImageView";
import ViewProject from "./ViewProject";

export const Columns = [
  {
    name: "Sr No.",
    selector: (row) => row.serialNo,
    width: "100px",
    sortable: true,
  },
  {
    name: "",
    selector: (row) => row.coverImage,
    center: true,
    width: "40px",
    cell: (row) => <TableImageView src={row?.coverImage} />,
  },
  {
    name: "Title",
    selector: (row) => row.title,
    sortable: true,
  },
  {
    name: "Category",
    selector: (row) => row?.category?.title,
    sortable: true,
    // center: true,
    width: "250px",
  },
  {
    name: "Link",
    selector: (row) => row.link,
    sortable: true,
    // center: true,
    width: "200px",
  },
  {
    name: "Status",
    selector: (row) => row.blocked,
    width: "150px",
    sortable: true,
    center: true,
    cell: (row) => (
      <StatusToggle
        status={row.blocked}
        id={row._id}
        type={"project"}
        queryName="fetchProjects"
      />
    ),
  },
  {
    name: "Actions",
    center: true,
    cell: (row) => (
      <ActionIcons
        rowData={row}
        view={true}
        del={true}
        edit={true}
        viewData={<ViewProject rowData={row} />}
        type="project"
      />
    ),
  },
];

export const filterbyStatus = [
  { label: "All", value: null },
  { label: "Blocked", value: true },
  { label: "Unblocked", value: false },
];
