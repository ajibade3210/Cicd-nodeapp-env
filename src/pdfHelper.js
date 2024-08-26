const puppeteer = require("puppeteer");

const saveToPdf = async html => {
  // const options =
  //   process.env.NODE_ENV === "production"
  //     ? { executablePath: "/usr/bin/chromium-browser" }
  //     : {};
  const prod = {
    env: {
      NODE_ENV: "production",
    },
  };

  const browser = await puppeteer.launch({
    executablePath:
      prod.env.NODE_ENV === "production"
        ? "/usr/bin/chromium-browser"
        : "",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle2" });

  // random
  const pdfBuffer = await page.pdf({
    format: "A4",
    printBackground: true,
    preferCSSPageSize: true,
  });

  await browser.close();
  return pdfBuffer;
};

module.exports = saveToPdf;
