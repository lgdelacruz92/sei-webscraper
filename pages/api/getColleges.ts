import { getAllColleges } from "@/lib/better-sqlite3";
import { CollegeInfo } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";

export default function getColleges(
  req: NextApiRequest,
  res: NextApiResponse<CollegeInfo[]>
) {
  const colleges = getAllColleges();
  res.status(200).json(
    colleges.map((c: any) => ({
      name: c.name,
      city: c.city,
      state: c.state,
      code: c.code,
      link: c.link,
    }))
  );
}
