import { SheetHeader, SheetEntry } from "../type";

export default {
  headers(sheetId: string) {
    return new Promise<SheetHeader[]>((resolve, reject) => {
      try {
        const headerMaps: any = require(`./headers/${sheetId}.json`);
        const list: any[] = [];
        for (const key in headerMaps as any) {
          list.push(headerMaps[key]);
        }
        resolve(list);
      } catch (e) {
        reject(e);
      }
    });
  },
  entries(
    sheetId: string,
    { page, pageSize }: { page: number; pageSize: number }
  ) {
    return new Promise<{
      total: number;
      page: number;
      pageSize: number;
      list: SheetEntry[];
    }>((resolve, reject) => {
      try {
        const obj: any = require(`./records/${sheetId}.json`);
        [];
        resolve({
          total: obj.records.length,
          page,
          pageSize,
          list: obj.records.slice((page - 1) * pageSize, page * pageSize),
        });
      } catch (e) {
        reject(e);
      }
    });
  },
};
