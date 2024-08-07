import { insertCollege } from "@/lib/better-sqlite3";
import { PostCollegeResponse } from "@/types";
import { NextApiRequest, NextApiResponse } from "next";

export default function postCollege(
  req: NextApiRequest,
  res: NextApiResponse<PostCollegeResponse>
) {
  const { name, city, state, code, link } = req.body;

  if (!name || !city || !state || !code || !link) {
    res.status(400).json({ error: "missing field" });
    return;
  }

  try {
    insertCollege(name, city, state, code, link);
    res.status(201).json({ message: "College added successfully" });
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
}
