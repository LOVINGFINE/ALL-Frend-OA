import { request } from "../plugins";
import { FontItemType } from "../interface";

export function getFontUnicodes() {
  return request<FontItemType[]>("/fonts");
}

export const postFontSvg = () => {
  return request("/api/font", {
    method: "POST",
  });
};
