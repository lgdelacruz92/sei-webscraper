import { NextApiRequest, NextApiResponse } from "next";
import { getCollegesByPage } from "@/lib/better-sqlite3";
import { CollegesResponse } from "@/types";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<CollegesResponse>
) {
  const page: number = parseInt(req.query.page as string, 10) || 1;
  const pageSize: number = parseInt(req.query.pageSize as string, 10) || 10;
  const { totalPages, totalRecords, colleges } = getCollegesByPage(
    page,
    pageSize
  );
  res.status(200).json({
    page,
    pageSize,
    totalPages,
    totalRecords,
    colleges,
  });
}
