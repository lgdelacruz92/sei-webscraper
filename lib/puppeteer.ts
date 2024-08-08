import puppeteer from "puppeteer";

export const getHtml = async (
  url: string,
  fromGetCode: boolean = false
): Promise<string> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.goto(url, { waitUntil: "networkidle0" });
  async function clickButtonWhileVisible() {
    let isButtonVisible = true;
    while (isButtonVisible) {
      try {
        await page.waitForSelector('[data-testid="cs-show-more-results"]', {
          timeout: 5000,
        });
        await page.click('[data-testid="cs-show-more-results"]');
        await page.evaluate(
          () => new Promise((resolve) => setTimeout(resolve, 200))
        );
      } catch (error) {
        isButtonVisible = false;
        console.log("Button no longer visible.");
      }
    }
  }
  if (!fromGetCode) {
    await clickButtonWhileVisible();
  }
  // Get the HTML content after the page has fully rendered
  const html = await page.content();

  await browser.close();
  return html;
};
