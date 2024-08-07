import { NextApiRequest, NextApiResponse } from "next";
import { getHtml } from "@/lib/puppeteer";
import { JSDOM } from "jsdom";
import { CollegeInfo, CollegesInfos } from "@/types";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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
    if (aTag && aTag.hasAttribute("href")) {
      console.log(aTag);
      const collegeLink = aTag.getAttribute("href");
      if (collegeLink) {
        console.log({ collegeLink });
        const collegeDetailHtml = await getHtml(collegeLink);

        const collegeDetailDom = new JSDOM(collegeDetailHtml);
        const collegeDocument = collegeDetailDom.window.document;
        const collegeCodesElem = collegeDocument.querySelector(
          '[data-testid="csp-more-about-college-board-code-valueId"]'
        );
        if (collegeCodesElem) {
          code = collegeCodesElem.innerHTML;
        }
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
      console.log({ addressElem });
    }

    console.log({ code });
    collegesInfos.push({
      name: aTag ? aTag.getAttribute("aria-label") ?? "" : "",
      city,
      state,
      code,
    });
  }
  res.status(200).json({ collegesInfos });
}
