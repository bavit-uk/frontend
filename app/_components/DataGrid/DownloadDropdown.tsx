"use client";
import React, { useEffect, useState } from "react";
import { FileDown } from "lucide-react";

const DownloadDropdown = () => {
  const [isDownloadMenuOpen, setIsDownloadMenuOpen] = useState(false);

  useEffect(() => {
    const closeDownloadMenuOnOutsideClick = (e: any) => {
      if (e?.target?.id === "download-button") return;
      setIsDownloadMenuOpen(false);
    };
    document.addEventListener("click", closeDownloadMenuOnOutsideClick);
    return () => {
      document.removeEventListener("click", closeDownloadMenuOnOutsideClick);
    };
  }, []);

  return (
    <div className="flex pr-1 pt-1">
      <div className={"relative m-2 ml-auto"}>
        <button
          id="download-button"
          className={"rounded-md px-4 py-2 text-primary outline outline-primary"}
          onClick={() => setIsDownloadMenuOpen((prev) => !prev)}
        >
          Download
        </button>
        <div
          className={`${isDownloadMenuOpen ? "scale-100" : "scale-0"} absolute left-[-8px] top-[45px] z-40 w-[120px] origin-top overflow-hidden rounded-md bg-secondaryBg shadow-lg transition-transform duration-200 ease-in-out`}
        >
          <button
            className="flex w-full items-center gap-1 px-4 py-2 text-primary hover:bg-slate-500"
            onClick={() => setIsDownloadMenuOpen(false)}
          >
            <span className="text-primary">
              <FileDown />
            </span>
            <span>As PDF</span>
          </button>
          <button
            className="flex w-full items-center gap-1 px-4 py-2 text-primary hover:bg-slate-500"
            onClick={() => setIsDownloadMenuOpen(false)}
          >
            <span className="text-primary">
              <FileDown />
            </span>
            <span>As CSV</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DownloadDropdown;
