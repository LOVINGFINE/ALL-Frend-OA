/*
 * Created by zhangq on 2022/03/21
 *
 */
import { ReactElement, FC, useEffect, useState } from "react";
// import unicodes from "../font/.unicodes.json";
import { getFontUnicodes, postFontSvg } from "../apis/index";

interface FontItemType {
  key: string;
  value: string;
  createTime: string;
  svg_url: string;
}

const FontPage: FC = (): ReactElement => {
  /** state */
  const [dataSource, setDataSource] = useState<FontItemType[]>([]);

  /** LifeCycle */
  useEffect(() => {
    // init
    getFontUnicodes().then((res) => {
      console.log(res);
    });
    // const unicodeMap: any = unicodes;
    // const arr = [];
    // for (let key in unicodeMap as any) {
    //   arr.push(unicodeMap[key]);
    // }
    // setDataSource(arr);
  }, []);

  /**
   * @method
   */
  const init = () => {};

  /** render */
  return (
    <div className="font-page">
      <div className="font-page-header"></div>
    </div>
  );
};

export default FontPage;
