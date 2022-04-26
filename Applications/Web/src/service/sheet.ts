// import { request } from "@/plugins";
import methods from "@/pages/sheet-editor/data";

export async function getSheetHeaders(sheetId: string) {
  return methods.headers(sheetId);
}

export async function getSheetEntries(
  sheetId: string,
  params: { page: number; pageSize: number }
) {
  return methods.entries(sheetId, params);
}
