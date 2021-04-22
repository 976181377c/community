import { Tree } from "antd";
import { useEffect, useState } from "react";

interface props {
  _html: string;
}
interface node {
  title: string;
  key: string;
  index: number;
  offsetTop: number;
  children: node[];
}

const fn = (treeDatas: node[], node: node) => {
  if (treeDatas.length == 0) {
    treeDatas.push(node);
  } else {
    if (treeDatas[treeDatas.length - 1].index === node.index) {
      treeDatas.push(node);
    } else {
      fn(treeDatas[treeDatas.length - 1].children, node);
    }
  }
  return null;
};

export default ({ _html }: props) => {
  const [treeData, settreeData] = useState<node[]>([]);
  useEffect(() => {
    const treeData: node[] = [];
    const pattern = /\<[h][1-5]\s[i][d][=]\"\S+\"\>/g;
    const strArray = _html?.match(pattern) || [];
    strArray.map((item) => {
      const id = item.substring(8, item.length - 2);
      const dom = document.getElementById(id);
      const offsetTop = dom?.offsetTop;

      const title = dom?.innerText;
      if (title === undefined || offsetTop === undefined) {
        return;
      }
      const node: node = {
        title: title,
        key: id,
        index: parseInt(item[2]),
        offsetTop: offsetTop,
        children: [],
      };
      fn(treeData, node);
    });
    settreeData(treeData);
  }, []);

  return (
    <Tree
      autoExpandParent={true}
      onSelect={(key, info) => {
        const { node } = info;
        const body = document.documentElement;
        //@ts-ignore
        body.scrollTop = node.offsetTop;
      }}
      treeData={treeData}
    />
  );
};
