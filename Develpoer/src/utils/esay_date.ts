import dayjs from "dayjs";
export class EasyDate {
  static currentFullDate = dayjs().format("YYYY/MM/DD HH:mm:ss");

  static format(date: Date | string, format?: string) {
    return   dayjs(date).format(format || "YYYY/MM/DD HH:mm:ss");
  }
}
