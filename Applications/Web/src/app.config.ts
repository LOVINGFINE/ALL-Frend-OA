const defaultSetting: AppSetting = {
  publicPath: "/",
  websiteName: "dyl",
};

export interface AppSetting {
  publicPath: string;
  websiteName: string;
}
export default defaultSetting;
