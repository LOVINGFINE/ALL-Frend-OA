import { ReactElement, FC, useState, useEffect } from "react";
import className from "./homepage.scss";
import { Modal, Button, message, Input, Space } from "@/components";
const HomePage: FC = (): ReactElement => {
  const [visible, setVisible] = useState(false);
  const [input, setInput] = useState("");
  return (
    <div className={className["homepage"]}>
      <Button
        type={"primary"}
        onClick={() => {
          setVisible(true);
        }}
      >
        button
      </Button>
    </div>
  );
};

export default HomePage;
