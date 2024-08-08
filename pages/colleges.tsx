"use client";
import { Table } from "@mantine/core";
import { useEffect, useState } from "react";

type CollegeRowProp = {
  name: string;
  city: string;
  state: string;
  code: string;
};

function CollegeRow({ name, city, state, code }: CollegeRowProp) {
  return (
    <Table.Tr>
      <Table.Td>{name}</Table.Td>
      <Table.Td>{city}</Table.Td>
      <Table.Td>{state}</Table.Td>
      <Table.Td>{code}</Table.Td>
    </Table.Tr>
  );
}

export default function Colleges() {
  const [rows, setRows] = useState<CollegeRowProp[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 15;

  useEffect(() => {
    const getColleges = async () => {
      const urlParams = new URLSearchParams({
        page: `${page}`,
        pageSize: `${pageSize}`,
      });
      const response = await fetch(
        `http://localhost:4000/getColleges?${urlParams.toString()}`
      );
      const { totalPages, colleges } = await response.json();
      setRows(colleges);
      setTotalPages(totalPages);
    };
    getColleges();
  }, [page]);

  return (
    <div>
      <Table.ScrollContainer minWidth={800}>
        <Table verticalSpacing="xs">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Name</Table.Th>
              <Table.Th>City</Table.Th>
              <Table.Th>State</Table.Th>
              <Table.Th>Code</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {rows.map((r, i) => (
              <CollegeRow key={`${r.name}-${i}`} {...r} />
            ))}
          </Table.Tbody>
        </Table>
      </Table.ScrollContainer>
      <div className="flex flex-row gap-4 w-full justify-center">
        <div>Pages: </div>
        {new Array(totalPages).fill(0).map((_, i) => (
          <button
            key={i}
            className="px-4 border rounded"
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
