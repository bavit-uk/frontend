/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import * as React from 'react';
import { useState } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  // TableCaption,
} from '../ui/table';

import { IoIosArrowRoundDown } from 'react-icons/io';
import { IoIosArrowRoundUp } from 'react-icons/io';
import { BsArrowsVertical } from 'react-icons/bs';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationPrevious, PaginationNext } from  '../ui/pagination';


interface Column {
  label: string;
  key: string;
  render?: (value: any, row: any, index:any) => JSX.Element;
  sortable?: boolean;
}

interface TableProps {
  columns: Column[];
  data: Record<string, any>[];
  caption?: string;
}

const DynamicTable: React.FC<TableProps> = ({ columns, data }) => {
  const [sortedData, setSortedData] = useState(data);
  const [filteredData, setFilteredData] = useState(data); // For search functionality
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default to 5 rows per page

  const [searchQuery, setSearchQuery] = useState(''); // Search query state

  React.useEffect(() => {
    // Filter data whenever the search query changes
    const lowercasedQuery = searchQuery.toLowerCase();
    const newFilteredData = sortedData.filter(row =>
      columns.some(col => {
        const cellValue = row[col.key];
        return cellValue?.toString().toLowerCase().includes(lowercasedQuery);
      })
    );
    setFilteredData(newFilteredData);
    setCurrentPage(1); // Reset to the first page after search
  }, [searchQuery, sortedData, columns]);


  const sortData = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sorted = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setSortedData(sorted);
    setSortConfig({ key, direction });
  };

  // Calculate pagination data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredData.length); // To avoid exceeding the total rows
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(parseInt(e.target.value, 10));
    setCurrentPage(1); // Reset to the first page when items per page changes
  };

  return (
    <div className='border-[1px] border-[rgb(118, 118, 118)] rounded-lg'>
       {/* Search Input */}
       <div className='p-4'>
        <input
          type='text'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder='Search...'
          className='border p-2 rounded w-full'
        />
      </div>
      <Table className=' '>
        {/* {caption && <TableCaption className=''>{caption}</TableCaption>} */}
        <TableHeader className='font-bold'>
          <TableRow>
            {columns.map((col, idx) => {
         // Calculate minimum width based on character count (approx 0.6rem per character)
              const minWidth = `${col.label.length * 0.6 +1}rem`;
              return (
                <TableHead
                key={idx}
                style={{ minWidth }}
                className='cursor-pointer text-white primary-bg hover:bg-red-500'
                onClick={() => col.sortable !== false && sortData(col.key)}
                >
                <div className='flex items-center'>
                  {col.label}
                  {col.sortable !== false && sortConfig?.key === col.key ? (
                    sortConfig.direction === 'asc' ? <IoIosArrowRoundUp /> : <IoIosArrowRoundDown />
                  ) : col.sortable !== false ? (
                    <BsArrowsVertical />
                  ) : null}
                </div>
              </TableHead>
            )
          }

            )}
          </TableRow>
        </TableHeader>
        <TableBody>
  {paginatedData.length === 0 ? (
    <TableRow>
      <TableCell colSpan={columns.length} className='text-center'>
        No records found
      </TableCell>
    </TableRow>
  ) : (
    paginatedData.map((row, rowIndex) => (
      <TableRow key={rowIndex} className='rounded-lg'>
        {columns.map((col, colIndex) => (
          <TableCell key={colIndex}>
            {col.render ? col.render(row[col.key], row, startIndex+rowIndex) : row[col.key]}
          </TableCell>
        ))}
      </TableRow>
    ))
  )}
</TableBody>
      </Table>

      {/* Pagination */}
      <Pagination  className=' border-t-[1px] p-2 flex items-center justify-between '>

        {/* total number of rows  */}
        <div className='text-[12px] '>
          {startIndex + 1} - {endIndex} / {sortedData.length} {/* Display the current range and total items */}
        </div>

        <PaginationContent className='text-[12px] cursor-pointer'>
          <PaginationPrevious className='text-[12px]' onClick={() => handlePageChange(currentPage - 1)} isDisabled={currentPage === 1} />
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem className='text-[12px]' key={i}>
              <PaginationLink
              className=''
                isActive={i + 1 === currentPage}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationNext onClick={() => handlePageChange(currentPage + 1)} isDisabled={currentPage === totalPages} />
        </PaginationContent>

        {/* rows per page  */}
        <div className='flex text-[12px] items-center'>
          <span className='mr-2'>Rows per page:</span>
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className='border border-gray-400 rounded p-1 cursor-pointer text-black'
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={25}>25</option>
          </select>
        </div>

      </Pagination>
    </div>
  );
};

export default DynamicTable;
