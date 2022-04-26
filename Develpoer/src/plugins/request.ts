import { AppSetting } from "../app.setting";

export async function request<T>(
  url: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const path = AppSetting.APIPATH + url;
  return new Promise((resolve, reject) => {
    fetch(path, init)
      .then((res) => {
        try {
          return res.json();
        } catch (e) {
          reject(e);
        }
      })
      .then((res) => {
        resolve(res.data);
      });
  });
}
