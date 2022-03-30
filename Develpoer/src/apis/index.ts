import { request } from "../utils/request";

export const getFontUnicodes = () => {
  return request("/api/font");
};

export const postFontSvg = () => {
  return request("/api/font", {
    method: "POST",
  });
};
