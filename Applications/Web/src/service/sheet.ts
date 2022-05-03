import { request } from "@/plugins";
import {
  Sheet,
  SheetColumnPayload,
  SheetEntriesProp,
} from "@/pages/sheet-editor/type";
export function getSheet(sheetId: string) {
  return request<Sheet>(`/sheets/${sheetId}`);
}

export function getSheetEntriesByPage(
  sheetId: string,
  payload: { page: number; pageSize: number }
) {
  return request<SheetEntriesProp>(`/sheets/${sheetId}/entries`, {
    params: payload,
  });
}

export function updateSheetColumn(
  sheetId: string,
  payload: SheetColumnPayload
) {
  return request<SheetEntriesProp>({
    path: `/sheets/${sheetId}/column`,
    method: "put",
    data: payload,
  });
}

export function updateSheetEntries(
  sheetId: string,
  payload: {
    [k: string]: {
      [k: string]: any;
    };
  }
) {
  return request<SheetEntriesProp>({
    path: `/sheets/${sheetId}/entries`,
    method: "put",
    data: payload,
  });
}
