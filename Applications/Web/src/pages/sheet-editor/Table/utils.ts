import { Colunm } from "./constant";

export function transformVcColunm(
  data: Colunm[],
  options: {
    scrollTo: {
      x: number;
      y: number;
    };
    display: {
      width: number;
      height: number;
    };
    extra: number;
  }
): Colunm[] {
  const list: Colunm[] = [];
  for (let i = 0; i < data.length; i++) {
    list.push(data[i]);
  }
  return list;
}

export const getDisplayStyle = (colunms: Colunm[], row: number) => {
  let width = 0;
  colunms.forEach((ele) => {
    width += ele.width;
  });
  return {
    width,
    height: row * 40,
  };
};
