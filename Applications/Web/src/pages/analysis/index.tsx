/*
 * Created by zhangq on 2021/11/16
 *
 */
import { ReactElement } from "react";
import className from "./analysis.scss";
import { Button } from "dyl-design";
const AnalysisPage = (): ReactElement => {
  /** render */
  return (
    <div className={className["page-content"]}>
      <Button size="large" disabled={true} type={"error"}>
        sjadjgasjgdjhasgdjh
      </Button>
    </div>
  );
};

export default AnalysisPage;
