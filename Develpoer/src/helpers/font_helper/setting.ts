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
    output: resolve("../Applications/Web/src/components/Icon/fonts"),
    style: "font-face.scss",
    json: "font-unicode.json",
    scssTemp: `@font-face {\nfont-family: "all-frend-oa-font";\nsrc: url("all-frend-oa-font.eot?t=1643192025160#iefix")\nformat("embedded-opentype"),\nurl("all-frend-oa-font.woff2?t=1643192025160") format("woff2"),\nurl("all-frend-oa-font.woff?t=1643192025160") format("woff"),\nurl("all-frend-oa-font.ttf?t=1643192025160") format("truetype"),\n}\n`,
  },
};

export default setting;
