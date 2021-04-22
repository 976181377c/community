import { _http, _tools } from "@components";
import { Button, Card, Col, Row, Avatar } from "antd";
import Collection from "./collection";
import Dynameic from "./dynamic";
import Album from "./album";
import { useState } from "react";
import { useParams, history } from "umi";
import "./index.less";

const contentListNoTitle: any = {
  dynamic: <Dynameic />,
  collection: <Collection />,
  album: <Album />,
};

export default () => {
  const { key } = useParams<{ key: string }>();
  const tabList = [
    {
      key: "dynamic",
      tab: "动态",
    },
    {
      key: "collection",
      tab: "收藏",
    },
    {
      key: "album",
      tab: "相册",
    },
  ];

  return (
    <div className={`personal-center`}>
      <Card
        className={`personal-center-head-card`}
        cover={
          <div className={`head-card-img`}>
            <img
              src={`${_tools.imgUrl}1617101836725e84a32146b7c843fed6296a8df560610.jpg`}
            />
          </div>
        }
      >
        <Row>
          <Col span={6}>
            <div className={`head-card-avatar`}>
              <Avatar
                shape={`square`}
                size={128}
                src={`${_tools.imgUrl}161707777725799978ba0-8245-4502-b7af-bb35e7f608ec.png`}
              />
            </div>
          </Col>
          <Col span={15}>
            <span className={`head-card-name`}>{_tools.getName()}</span>
            <br />
            <span>详细资料</span>
          </Col>
          <Col span={3}>
            <div className={`head-card-button`}>
              <Button>编辑个人资料</Button>
            </div>
          </Col>
        </Row>
      </Card>
      <br />
      <Card
        className={`personal-center-card`}
        style={{ width: "100%" }}
        tabList={tabList}
        activeTabKey={key}
        onTabChange={(key) => {
          history.push(`/aboutMe/${key}`);
        }}
      >
        {contentListNoTitle[key]}
      </Card>
    </div>
  );
};
