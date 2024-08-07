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
    ".cs-search-results-list-display .cs-college-card-outer-container"
  );
  const collegesInfos: CollegeInfo[] = [];
  colleges.forEach((c: Element) => {
    const name = c.querySelector("a");

    const addressElem = c.querySelector(".cs-college-card-college-address");
    let city = "";
    let state = "";
    if (addressElem) {
      const cityState = addressElem.innerHTML;
      [city, state] = cityState.split(",");
    }
    collegesInfos.push({
      name: name ? name.getAttribute("aria-label") ?? "" : "",
      city,
      state,
    });
  });
  res.status(200).json({ collegesInfos });
}
