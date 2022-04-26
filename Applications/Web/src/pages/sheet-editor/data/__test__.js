const headers = require("./headers/lf-sheet-AA123456.json");
const fs = require("fs");
const path = require("path");
const list = [];

for (let i = 0; i < 400; i++) {
  const temp = {};
  for (const key in headers) {
    temp[key] = "其他其他其他";
    if (headers[key].type === "Text") {
      temp[key] = "文本文本文本";
    }
    if (headers[key].type === "Number") {
      temp[key] = 100;
    }
    if (headers[key].type === "Percent") {
      temp[key] = 1;
    }
    if (headers[key].type === "Boolean") {
      temp[key] = Math.max(Math.random() * 10, 5) === 5;
    }
    if (headers[key].type === "Date") {
      temp[key] = new Date();
    }
    if (headers[key].type === "QrCode") {
      temp[key] = JSON.stringify({
        text: "https://baidu.com",
        title: "百度链接",
      });
    }
    if (headers[key].type === "Options") {
      temp[key] = "id-1";
    }
    if (headers[key].type === "File") {
      temp[key] = JSON.stringify({
        link: "https://baidu.com/tupian.png",
        filename: "图片",
        type: "png",
      });
    }
  }
  list.unshift({
    id: `entry-${i}`,
    record: temp,
  });
}

fs.writeFileSync(
  "src/pages/sheet-editor/data/records/lf-sheet-AA123456.json",
  JSON.stringify({
    records: list,
  })
);
