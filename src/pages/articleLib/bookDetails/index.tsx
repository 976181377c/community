import {
  LikeFilled,
  StarFilled,
  BookFilled,
  ContainerFilled,
} from "@ant-design/icons";
import { book, _http, _tools } from "@components";
import {
  Card,
  Row,
  Col,
  Tag,
  Rate,
  Button,
  Affix,
  Avatar,
  message,
} from "antd";
import Evaluate from "./evaluate";
import { useEffect, useState } from "react";

import "./index.less";
import { useParams } from "react-router";

export default () => {
  const [data, setdata] = useState<book>();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const res = await _http.get(`/selectBook?id=${id}`, {});
      setdata(res);
    } catch (error) {
      message.error(error);
    }
  };
  const author = (str: string | undefined): Array<string> => {
    if (str == undefined) {
      return [""];
    }
    return JSON.parse(str);
  };

  return (
    <Row className={"bookDetail-page"}>
      <Col span={18}>
        <div style={{ width: "calc(100% - 10px)" }}>
          <Card
            className={"bookDetail-cover-card"}
            actions={[<LikeFilled />, <StarFilled />]}
          >
            <img width={177} height={240} alt="example" src={data?.image} />
            <div className={"bookDetail-cover-card-info"}>
              <span className={"bookDetail-cover-card-title"}>
                {data?.title}
              </span>
              <span className={"bookDetail-cover-card-author"}>
                {author(data?.author)} 著
              </span>
              <span className={"bookDetail-cover-card-rate"}>
                <Rate
                  style={{ marginRight: 10 }}
                  disabled
                  value={4.1}
                  allowHalf={true}
                />
                {data?.reply.length}条评论
              </span>
              <span className={"bookDetail-cover-card-tags"}>
                <Tag>tag</Tag>
              </span>
              <div className={"buy-btu"}>
                <span className={"bookDetail-cover-card-price"}>
                  {data?.price ? `￥${data?.price}` : "免费"}
                </span>
                <span className={"bookDetail-cover-card-btu"}>
                  <Button type={"primary"} style={{ marginRight: 20 }}>
                    试读
                  </Button>
                  <Button type={"primary"}>购买</Button>
                </span>
              </div>
            </div>
          </Card>
          <Card title={"简介"}>{data?.description}</Card>
          <Evaluate data={data?.reply} />
        </div>
      </Col>
      <Col span={6}>
        <div className={"bookDetail-page-sidebar"}>
          <ul className={"siderbar-menu"}>
            <li>
              <BookFilled />
              <span className={"menu-title"}>文库</span>
            </li>
            <li>
              <ContainerFilled />
              <span className={"menu-title"}>我的书架</span>
            </li>
          </ul>
        </div>

        <Affix offsetTop={60}>
          <Card
            className={"bookDetail-page-sidebar-info"}
            bodyStyle={{ padding: "5px 10px" }}
            title={"作者信息"}
          >
            <div style={{ width: "100%" }}>
              {author(data?.author)?.map((item) => {
                return (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      margin: "10px 0",
                    }}
                  >
                    <span className={"name"}>
                      <Avatar className={"name-avatar"}>{item}</Avatar>
                      {item}
                    </span>
                    <Button>查看</Button>
                  </div>
                );
              })}
            </div>
          </Card>
          <Card className={"bookDetail-page-sidebar-info"}>
            <span className={"become-author"}>成为知乎电子书作者</span>
            <Button>我要出书</Button>
          </Card>
        </Affix>
      </Col>
    </Row>
  );
};
