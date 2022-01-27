import fs from "fs";
import { join } from "path";

export const remove_dir = (dir: string) => {
  const files = fs.readdirSync(dir);
  for (var i = 0; i < files.length; i++) {
    let newPath = join(dir, files[i]);
    let stat = fs.statSync(newPath);
    if (stat.isDirectory()) {
      //如果是文件夹就递归下去
      remove_dir(newPath);
    } else {
      //删除文件
      fs.unlinkSync(newPath);
    }
  }
  if (files.length === 0) {
    fs.rmdirSync(dir); //如果文件夹是空的，就将自己删除掉
  }
};
