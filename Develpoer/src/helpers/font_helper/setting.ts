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
    scssTemp: string;
  };
}

const setting: FontConfigProps = {
  "font-name": "all-frend-oa-font",
  "svg-files-path": "public/font-svg",
  "font-dist-path": resolve(process.cwd(), "public/.development/fonts"),
  "unicode-path": resolve(process.cwd(), "public/font-unicode.json"),
  Web: {
    output: resolve("../Applications/Web/src/assets/fonts"),
    style: "font-face.scss",
    json: "font-unicode.json",
    scssTemp: `@font-face {\n  font-family: "all-frend-oa-font";\n  src: url("all-frend-oa-font.eot?t=1643192025160#iefix")\n      format("embedded-opentype"),\n    url("all-frend-oa-font.woff2?t=1643192025160") format("woff2"),\n    url("all-frend-oa-font.woff?t=1643192025160") format("woff"),\n    url("all-frend-oa-font.ttf?t=1643192025160") format("truetype");\n}\n.icon-font {\n  font-family: "all-frend-oa-font" !important;\n}\n`,
  },
};

export default setting;
