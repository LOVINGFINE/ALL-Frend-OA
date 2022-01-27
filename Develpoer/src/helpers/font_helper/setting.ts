import { resolve } from "path";
interface FontConfigProps {
  "font-name": string;
  "svg-files-path": string;
  "font-dist-path": string;
  "unicode-path": string;
  Web: {
    output: string;
    style: string;
    json: string;
  };
}

const setting: FontConfigProps = {
  "font-name": "all-frend-oa-font",
  "svg-files-path": "public/font-svg",
  "font-dist-path": resolve(process.cwd(), "public/.development/fonts"),
  "unicode-path": resolve(process.cwd(), "public/font-unicode.json"),
  Web: {
    output: resolve("../Applications/Web/src/components/Icon/fonts"),
    style: "font-face.scss",
    json: "font-unicode.json",
  },
};

export default setting;
