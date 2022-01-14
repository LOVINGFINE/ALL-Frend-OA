import moment from "moment";

// 转换格式
export const formatDateType = (
  format: string,
  date?: Date | string
): string => {
  const time = date || moment();
  return moment(time).format(format);
};
