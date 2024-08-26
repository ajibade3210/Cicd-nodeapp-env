const express = require("express");
const path = require("path");
const saveToPdf = require("./pdfHelper");
const app = express();

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/test", (_req, res) => {
  res.status(200).send("Hello world");
});

app.post("/pdf", async (req, res, next) => {
  try {
    console.log("req.body: ", req.body);
    const { payslipName, body } = req.body;
    const result = await saveToPdf(body);
    const name = payslipName.split(" ").join("_");
    res.attachment(`${name}.pdf`);
    res.set({
      "Content-Type": "application/pdf",
      "Content-Length": result.length,
    });
    return res.send(result);
  } catch (error) {
    return next(error);
  }
});

app.get("/download/pdf", async (req, res, next) => {
  try {
    const { payslipName, body } = req.body;
    const result = await saveToPdf(`<!DOCTYPE html>
<html>
  <head>
    <title>Demo Application Node Web Server</title>
    <style>
      h1 {
        text-align: center;
        margin-right: 5px;
      }
      body {
        color: #bcbcce;
        background-color: #151617;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        margin: 0;
      }
    </style>
  </head>
  <body>
    <h1>Products Page</h1>
    <p>version 1.0</p>
  </body>
</html>`);
    const name = "payslipName".split(" ").join("_");
    res.attachment(`${name}.pdf`);
    res.set({
      "Content-Type": "application/pdf",
      "Content-Length": result.length,
    });
    return res.send(result);
  } catch (error) {
    return next(error);
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

module.exports = app;
