import express from "express";
import setting from "./src/app.setting";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
import routes from "./src/app.routes";
import { register } from "./src/utils/router";

const app = express();
// 允许跨域
app.use(cors());
// 静态文件托管
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(register(routes));
// 监听端口
app.listen(setting.port, () => {
  console.log("a server is listen on port:", setting.port);
});
