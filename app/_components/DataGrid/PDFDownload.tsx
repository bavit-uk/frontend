/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { FileDown } from "lucide-react";
import Button from "../ui/Button";
import React from "react";

type PDFDownloadProps = {
  tableHeaders: any[];
  rowData: any;
  exportFileName?: string;
};
const PDFDownload: React.FC<PDFDownloadProps> = ({ tableHeaders, rowData, exportFileName = "TableData" }) => {
  const downloadPDF = () => {
    const excludeColumns = ["Actions", "", "Access", "Sr No.", "Receipt"];
    const headsForPdf = tableHeaders
      ?.filter((head) => !excludeColumns.includes(head?.name) && head?.includeInPrint !== false)
      ?.map((head) => head?.name);


    const rowDataForPdf = rowData?.map((row: any) => {
      const rowValues = tableHeaders?.map((head) => {
        if (
          head.format &&
          typeof head.format === "function" &&
          !excludeColumns.includes(head.name) &&
          head.includeInPrint !== false
        ) {
          if (head.name === "Complaint Title") {
            //  return two objects in case of complaint title
            return [
              {
                content: head.format(row),
                colSpan: 2,
              },
              "",
            ];
          }
          return {
            content: head.format(row),
            colSpan: 1,
          };
        } else if (
          typeof head.selector === "function" &&
          !excludeColumns.includes(head.name) &&
          head.includeInPrint !== false
        ) {
          if (head.name === "Complaint Title") {
            return [
              {
                content: head.selector(row),
                colSpan: 2,
              },
            ];
          }
          return {
            content: head.selector(row),
            colSpan: 1,
          };
        } else {
          return Infinity;
        }
      });
      return rowValues.filter((value) => value !== Infinity);
    });

    const rowDataFlatted = rowDataForPdf?.map((row: any) => row.flat());


    const doc = new jsPDF("l");
    doc.setLineWidth(2);
    doc.addImage("/logo.png", "PNG", 12, 5, 17, 17);
    doc.text("Carflys", 150, 15, { align: "center" });
    doc.text(`${exportFileName || "Table Data"}`, 150, 23, { align: "center" });
    doc.setFontSize(9);
    doc.text(`Date:${new Date().toLocaleString()}`, 242, 28, { align: "left" });
    autoTable(doc, {
      head: [headsForPdf?.map((head) => head)],
      body: rowDataForPdf,
      startY: 30,
      styles: { overflow: "linebreak", cellWidth: "auto" },
      theme: "grid",
    });
    doc.save(exportFileName + ".pdf");
  };
  return <Button label="As PDF" onClick={downloadPDF} variant="outlined" Icon={FileDown} />;
};

export default PDFDownload;
