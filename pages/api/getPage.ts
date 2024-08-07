import { NextApiRequest, NextApiResponse } from "next";
import { getHtml } from "@/lib/puppeteer";
import { JSDOM } from "jsdom";
import { CollegeInfo, CollegesInfos } from "@/types";

export default async function getPage(
  req: NextApiRequest,
  res: NextApiResponse<CollegesInfos>
) {
  const html = await getHtml(
    "https://bigfuture.collegeboard.org/college-search/filters"
  );

  const dom = new JSDOM(html);
  const document = dom.window.document;
  const colleges = document.querySelectorAll(
    ".cs-search-results-list-display .cs-college-card-container"
  );
  const collegesInfos: CollegeInfo[] = [];
  for (const c of colleges) {
    const aTag = c.querySelector("a");
    let code = "";
    let link = "";
    if (aTag && aTag.hasAttribute("href")) {
      const collegeLink = aTag.getAttribute("href");
      if (collegeLink) {
        link = collegeLink;
      }
    }
    const addressElem = c.querySelector(".cs-college-card-college-address");
    let city = "";
    let state = "";
    if (addressElem) {
      const cityState = addressElem.innerHTML;
      const [c, s] = cityState.split(",");
      city = c;
      state = s;
    }
    collegesInfos.push({
      name: aTag ? aTag.getAttribute("aria-label") ?? "" : "",
      city,
      state,
      code,
      link,
    });
  }
  res.status(200).json({ collegesInfos });
}
