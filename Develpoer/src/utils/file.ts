import fs from "fs";
import { join } from "path";
import AppServer from "../app";

export const remove_dir = (dir: string) => {
  const files = fs.readdirSync(dir);
  for (let i = 0; i < files.length; i++) {
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
  fs.rmdirSync(dir); //如果文件夹是空的，就将自己删除掉
};

export const cp_dir = ({ dir, target }: { dir: string; target: string }) => {
  return new Promise<void>((res, rej) => {
    try {
      const files = fs.readdirSync(dir);
      for (let i = 0; i < files.length; i++) {
        let path = join(dir, files[i]);
        let cp_path = join(target, files[i]);
        fs.createReadStream(path).pipe(fs.createWriteStream(cp_path));
        res();
      }
    } catch (e) {
      rej(e);
      AppServer.error("cp dir Error:" + JSON.stringify(e));
    }
  });
};
