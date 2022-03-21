import img1 from "@/assets/img/images-1.jpeg";
import img2 from "@/assets/img/images-2.png";
import img3 from "@/assets/img/images-3.jpeg";
import img4 from "@/assets/img/images-4.png";

export const getTempTree = () => {
  // VirtualTree 测试
  const getTree = (num = 100, level = 0, parentIndex?: number): any[] => {
    const arr: any[] = [];
    for (let i = 0; i < num; i++) {
      arr.push({
        name:
          parentIndex !== undefined ? `${parentIndex}` : "" + `${level}-${i}`,
        children: level < 2 ? getTree(50, level + 1, i) : undefined,
      });
    }
    return arr;
  };
  return getTree();
};

export const getTempListImg = (num = 1000) => {
  const getRandomImg = () => {
    const random = parseInt((Math.random() * 4).toString());
    if (random === 0) {
      return img1;
    }
    if (random === 1) {
      return img2;
    }
    if (random === 2) {
      return img3;
    }
    return img4;
  };
  // Virtual 测试
  const arr: any[] = [];
  for (let i = 0; i < num; i++) {
    arr.push({
      img: getRandomImg(),
    });
  }
  return arr;
};
