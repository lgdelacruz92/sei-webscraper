"use client";
import { Table, Progress, Anchor, Text, Group } from "@mantine/core";
import classes from "./TableReviews.module.css";
import { useEffect, useState } from "react";

const data = [
  {
    title: "Foundation",
    author: "Isaac Asimov",
    year: 1951,
    reviews: { positive: 2223, negative: 259 },
  },
  {
    title: "Frankenstein",
    author: "Mary Shelley",
    year: 1818,
    reviews: { positive: 5677, negative: 1265 },
  },
  {
    title: "Solaris",
    author: "Stanislaw Lem",
    year: 1961,
    reviews: { positive: 3487, negative: 1845 },
  },
  {
    title: "Dune",
    author: "Frank Herbert",
    year: 1965,
    reviews: { positive: 8576, negative: 663 },
  },
  {
    title: "The Left Hand of Darkness",
    author: "Ursula K. Le Guin",
    year: 1969,
    reviews: { positive: 6631, negative: 993 },
  },
  {
    title: "A Scanner Darkly",
    author: "Philip K Dick",
    year: 1977,
    reviews: { positive: 8124, negative: 1847 },
  },
];

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
            onClick={() => setPage(i)}
          >
            {i}
          </button>
        ))}
      </div>
    </div>
  );
}
