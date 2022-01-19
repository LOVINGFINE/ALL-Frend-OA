import dark from "./dark";
import white from "./white";

const themeProvider = (theme: ThemeType): ThemeDataSource => {
  switch (theme) {
    case "dark":
      return dark;
    case "white":
      return white;
    default:
      return white;
  }
};

export type ThemeType = "dark" | "white";

export interface ThemeDataSource {
  [key: string]: {
    [key: string]: string;
  };
}

export default themeProvider;
