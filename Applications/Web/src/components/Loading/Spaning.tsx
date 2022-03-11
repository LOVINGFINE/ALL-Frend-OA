/*
 * Created by zhangq on 2021/07/02
 * Spaning
 */
import style from "./style.scss";
const Spaning = (): React.ReactElement => {
  /** render */
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className={style["loading-spaning"]}>
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
    </div>
  );
};
export default Spaning;
