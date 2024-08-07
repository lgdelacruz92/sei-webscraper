import { JSDOM } from "jsdom";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  collegeNames: string[];
};

export default async function getPage(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await fetch(
    "https://bigfuture.collegeboard.org/college-search/filters"
  );
  const html = await response.text();
  const dom = new JSDOM(html);
  const document = dom.window.document;
  const colleges = document.querySelectorAll(
    ".cs-search-results-list-display a"
  );
  const collegeNames: string[] = [];
  colleges.forEach((c: HTMLElement) => {
    collegeNames.push(c.getAttribute("aria-label") ?? "");
  });
  res.status(200).json({ collegeNames });
}
