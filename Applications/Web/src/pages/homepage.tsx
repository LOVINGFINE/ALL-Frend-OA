import { ReactElement, FC, useState } from "react";
import className from "./homepage.scss";
import { Modal, Button, Message, Icon } from "@/components";

const HomePage: FC = (): ReactElement => {
  const [visible, setVisible] = useState(false);
  // 主题样式
  return (
    <div className={className["homepage"]}>
      <Button
        type={"primary"}
        onClick={() => {
          Message.success("ssss");
        }}
      >
        open
      </Button>
      <Modal visible={visible} onClose={() => setVisible(false)} />
    </div>
  );
};

export default HomePage;
