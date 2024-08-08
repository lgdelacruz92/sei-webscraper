import { NextApiRequest, NextApiResponse } from "next";
import { getHtml } from "@/lib/puppeteer";
import { JSDOM } from "jsdom";
import { CodeData } from "@/types";

export default async function getCode(
  req: NextApiRequest,
  res: NextApiResponse<CodeData>
) {
  if (req.query["link"] && typeof req.query["link"] === "string") {
    const link = req.query["link"];
    const html = await getHtml(link, true);
    const dom = new JSDOM(html);
    const document = dom.window.document;
    const codeElem = document.querySelector(
      '[data-testid="csp-more-about-college-board-code-valueId"]'
    );
    res.status(200).json({ code: codeElem?.innerHTML ?? "" });
  } else {
    res.status(404);
  }
}
