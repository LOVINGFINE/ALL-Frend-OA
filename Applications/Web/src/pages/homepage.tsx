import { ReactElement, FC, useState, useEffect } from "react";
import className from "./homepage.scss";
import { Modal, Button, message, Input } from "@/components";
import VirtualTree from "@/components/VirtualTree";
const HomePage: FC = (): ReactElement => {
  const [visible, setVisible] = useState(false);
  const [input, setInput] = useState("");
  const [source, setSource] = useState<any[]>([]);
  useEffect(() => {
    const getList = (
      parent: string | number = "",
      num = 10000,
      end = false
    ): any[] => {
      const arr = [];
      for (let i = 0; i < num; i++) {
        arr.push({
          name: `${parent ? parent + "-" : ""}${i}`,
          children: end ? undefined : getList(i, 100, true),
        });
      }
      return arr;
    };
    setSource(getList());
  }, []);
  return (
    <div className={className["homepage"]}>
      <Button
        type={"primary"}
        onClick={() => {
          setVisible(true);
        }}
      >
        open
      </Button>
      {/* <Input value={input} change={(text) => setInput(text)} /> */}
      <Modal
        visible={visible}
        placement={"bottom-right"}
        onClose={() => setVisible(false)}
      />
    </div>
  );
};

export default HomePage;
