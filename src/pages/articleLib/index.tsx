import { Card, Col, Space, Row, message, Spin } from "antd";
import { useParams, history } from "umi";
import { useState, useEffect } from "react";
import "./index.less";
import { _http } from "@components";

interface data {
  id: string;
  uid?: string;
  title: string;
  author: string;
  description: string;
  image: string;
  imageId?: string;
}

const { Meta } = Card;
const apis: any = {
  categories: <div>categories</div>,
  bargainPrice: <div>bargainPrice</div>,
  free: <div>free</div>,
  top: <div>top</div>,
};
export default () => {
  const { key } = useParams<{ key: string }>();
  const [data, setdata] = useState<data[]>();
  const [loding, setLoding] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoding(true);
    try {
      const res = await _http.get(`/bookPortal`, {});
      setdata(res);
    } catch (error) {
      message.error(error);
    } finally {
      setLoding(false);
    }
  };

  const author = (str: string) => {
    const arr: Array<string> = JSON.parse(str);
    if (arr?.length <= 1) {
      return arr[0];
    } else {
      return arr[0] + " 等";
    }
  };

  const tabList = [
    {
      key: "categories",
      tab: "分类",
    },
    {
      key: "bargainPrice",
      tab: "特价",
    },
    {
      key: "free",
      tab: "免费",
    },
    {
      key: "top",
      tab: "榜单",
    },
  ];
  return (
    <Card
      className={"artcleLib-card"}
      tabList={tabList}
      onTabChange={(key) => {
        history.push(`/article/${key}`);
      }}
    >
      {data?.map((item) => {
        return (
          <Card
            className={"artcleLib-card-item"}
            onClick={() => {
              history.push(`/article/details/${item.id}`);
            }}
            key={item.id}
            hoverable
            cover={<img alt="example" src={`${item.image}`} />}
          >
            <Meta
              title={item.title}
              description={[
                <span>{author(item.author)}</span>,
                <br />,
                <span>{"免费"}</span>,
              ]}
            />
          </Card>
        );
      })}
      <div className={"artcleLib-card-item-null"}></div>
      <div className={"artcleLib-card-item-null"}></div>
      <div className={"artcleLib-card-item-null"}></div>
      <div className={"artcleLib-card-item-null"}></div>
      {loding ? (
        <div style={{ width: "100%", textAlign: "center" }}>
          <Spin size={"large"} />
        </div>
      ) : (
        ""
      )}
    </Card>
  );
};
