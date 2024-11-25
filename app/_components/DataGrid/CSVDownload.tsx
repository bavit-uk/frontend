import React, { useMemo } from "react";
import { CSVLink } from "react-csv";
import { FileDown } from "lucide-react";
import Button from "@components/ui/Button";
import { flattenObject } from "@utils/flattenObject";

type CSVDownloadProps = {
  data: unknown[];
  exportFileName: string;
};

const isObject = (value: unknown): value is Record<string, any> => {
  return value !== null && typeof value === "object";
};
const CSVDownload: React.FC<CSVDownloadProps> = ({ data = [], exportFileName }) => {
  // const flattenedData = (data = data?.map((item) => flattenObject(item)));
  const flattenedData = useMemo(() => {
    return data.filter(isObject).map((item) => flattenObject(item));
  }, [data]);
  return (
    <CSVLink
      data={flattenedData}
      filename={`${exportFileName}.csv`}
      style={{
        textDecoration: "none",
      }}
    >
      <Button label="As CSV" variant="outlined" Icon={FileDown} />
    </CSVLink>
  );
};

export default CSVDownload;
