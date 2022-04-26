/*
 * Created by zhangq on 2022/03/21
 *
 */
import { ReactElement, FC, useEffect, useState } from "react";
// import unicodes from "../font/.unicodes.json";
import { getFontUnicodes, postFontSvg } from "../../apis";
import { FontItemType } from "../../interface";

const FontPage: FC = (): ReactElement => {
  /** state */
  const [dataSource, setDataSource] = useState<FontItemType[]>([]);

  /** LifeCycle */
  useEffect(() => {
    // init
    getFontUnicodes().then((res: any) => {
      setDataSource(res);
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
  /** render */
  return (
    <div className="page">
      <div className="page-item">
        {dataSource.map((ele) => {
          return (
            <div className="icon-page-item" title="点击复制代码" key={ele.key}>
              {ele.value}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FontPage;
