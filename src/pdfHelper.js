const puppeteer = require("puppeteer");

const saveToPdf = async html => {
  const options =
    process.env.NODE_ENV === "production"
      ? { executablePath: "/usr/bin/chromium-browser" }
      : {};

  const browser = await puppeteer.launch({
    ...options,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle2" });

  // random
  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true
  });

  await browser.close();
  return pdfBuffer;
};

module.exports = saveToPdf;
