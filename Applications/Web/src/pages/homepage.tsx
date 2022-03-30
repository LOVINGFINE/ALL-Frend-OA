import { ReactElement, FC, useState, useEffect } from "react";
import className from "./homepage.scss";
import { getTempListImg } from "@/__test__/tree";
const HomePage: FC = (): ReactElement => {
  const [visible, setVisible] = useState(false);
  const [input, setInput] = useState("");
  return (
    <div className={className["homepage"]}>
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#fff",
          margin: "0 auto",
        }}
      ></div>
    </div>
  );
};

export default HomePage;
