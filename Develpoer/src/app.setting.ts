export interface settingProps {
  APIPATH: string;
  port: number;
}
export const AppSetting = {
  APIPATH: "/api",
  port: 9999,
};

export enum AppStatus {
  OK,
  ERROR,
}
