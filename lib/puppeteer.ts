import puppeteer from "puppeteer";
import fs from "fs";

export const getHtml = async (url: string): Promise<string> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Navigate to the SPA
  await page.goto(url, { waitUntil: "networkidle0" });

  // Get the HTML content after the page has fully rendered
  const html = await page.content();

  await browser.close();
  return html;
};
