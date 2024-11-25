import React from "react";
import DataTable, { Alignment } from "react-data-table-component";
import PDFDownload from "./PDFDownload";
import CSVDownload from "./CSVDownload";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

type DataGridProps = {
  columns: any;
  data: any;
  exportFileName: string;
  showDownloadButton?: boolean;
  props?: any;
};

const DataGrid: React.FC<DataGridProps> = ({ columns, data, exportFileName, showDownloadButton = true, ...props }) => {
  const customStyles = {
    headCells: {
      style: {
        fontSize: "16px",
        fontWeight: 600,
        backgroundColor: "#fff",
        color: "#000",
        borderBottomColor: "#aaaaaa",
      },
    },
    rows: {
      style: {
        fontSize: "14px",
        backgroundColor: "#fff",
        color: "#000",
        borderBottomColor: "#aaaaaa",
      },
    },
    pagination: {
      style: {
        backgroundColor: "#fff",
        color: "#000",
        borderBottomColor: "#aaaaaa",
      },
      pageButtonsStyle: {
        cursor: "pointer",
        transition: "0.4s",
        fill: "#000",
        "&:disabled": {
          cursor: "unset",
          fill: "#dddd",
        },
        "&:hover:not(:disabled)": {
          backgroundColor: "#eee",
        },
      },
    },
    noData: {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#000",
        backgroundColor: "#fff",
      },
    },
    progress: {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#000",
        backgroundColor: "#fff",
      },
    },
  };
  return (
    <div>
      <Popover className="relative flex">
        <PopoverButton className="m-2 ml-auto rounded-md px-4 py-2 text-primary outline outline-primary">
          Download
        </PopoverButton>
        <PopoverPanel anchor="bottom" className="mt-1 flex flex-col gap-1 bg-primaryBg p-2 shadow-lg">
          <PDFDownload tableHeaders={columns} rowData={data} exportFileName={exportFileName} />
          <CSVDownload data={data} exportFileName={exportFileName} />
        </PopoverPanel>
      </Popover>
      <DataTable
        columns={columns}
        data={data}
        pagination
        responsive={true}
        subHeaderAlign={Alignment.RIGHT}
        subHeaderWrap
        progressComponent={<h1>Loading..</h1>}
        customStyles={customStyles}
        {...props}
      />
    </div>
  );
};

export default DataGrid;
