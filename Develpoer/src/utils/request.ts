export const request = (url: RequestInfo, init?: RequestInit) => {
  return new Promise((resolve, reject) => {
    fetch(url, init)
      .then((res) => {
        try {
          return res.json();
        } catch (e) {
          reject(e);
        }
      })
      .then((res) => {
        resolve(res);
      });
  });
};
