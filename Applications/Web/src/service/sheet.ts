import { request } from "@/plugins";
import { Sheet } from "../pages/sheet-editor/type";
export function getSheet(sheetId: string) {
  return request<Sheet>(`/sheets/${sheetId}`);
}

// export async function getSheetEntries(
//   sheetId: string,
//   params: { page: number; pageSize: number }
// ) {
//   return methods.entries(sheetId, params);
// }
