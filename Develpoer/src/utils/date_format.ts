import moment from "moment";
import { blue } from "colors-cli";
export class EasyDate {
  static fullDate = moment().format("YYYY/MM/DD HH:mm:ss");
  static getFullDate() {
    return;
  }

  static printLine(text: string) {
    console.log(blue(`\n[${EasyDate.fullDate}] ╰┈▶ ${text}.`));
  }
}
