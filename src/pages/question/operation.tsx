import {
  LikeOutlined,
  StarOutlined,
  FormOutlined,
  VerticalAlignTopOutlined,
  LikeFilled,
  StarFilled,
} from "@ant-design/icons";
import { _http, _tools } from "@components";
import { BackTop } from "antd";
import { useEffect, useState } from "react";

interface props {
  qid?: string;
}
interface res {
  like?: boolean;
  collection?: boolean;
}

const style = {
  color: `#8AC6D1`,
};

export default ({ qid }: props) => {
  const [res, setres] = useState<res>({});
  const getInfo = async () => {
    const res: res = await _http.post(`/getOperation`, {
      qid,
      uid: _tools.getUid(),
    });
    setres(res);
  };
  useEffect(() => {
    getInfo();
  }, []);

  const like = async () => {
    await _http.post(`/like`, {
      qid: qid,
      uid: _tools.getUid(),
    });
    setres({
      like: !res.like,
      collection: res.collection,
    });
  };
  const collection = async () => {
    await _http.post(`/collection`, {
      qid: qid,
      uid: _tools.getUid(),
    });
    setres({
      like: res.like,
      collection: !res.collection,
    });
  };

  return (
    <div className={"operation-box"}>
      <div
        className={"operation-box-item"}
        style={res.like ? style : undefined}
        onClick={like}
      >
        <span className={"operation-box-item-icon"}>
          {res.like ? <LikeFilled /> : <LikeOutlined />}
        </span>
        <span className={"operation-box-item-title"}>点赞</span>
      </div>
      <div
        className={"operation-box-item"}
        style={res.collection ? style : undefined}
        onClick={collection}
      >
        <span className={"operation-box-item-icon"}>
          {res.collection ? <StarFilled /> : <StarOutlined />}
        </span>

        <span className={"operation-box-item-title"}>收藏</span>
      </div>
      <div className={"operation-box-item"}>
        <span className={"operation-box-item-icon"}>
          <FormOutlined />
        </span>

        <span className={"operation-box-item-title"}>回复</span>
      </div>
    </div>
  );
};
