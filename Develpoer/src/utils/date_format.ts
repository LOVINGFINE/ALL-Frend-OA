import moment from "moment";
export class EasyDate {
  static currentFullDate = moment().format("YYYY/MM/DD HH:mm:ss");

  static format(date: Date | string, format?: string) {
    return   moment(date).format(format || "YYYY/MM/DD HH:mm:ss");
  }
}
