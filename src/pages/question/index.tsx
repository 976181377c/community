import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  Col,
  List,
  Row,
  Avatar,
  message,
  Spin,
  Pagination,
  Affix,
  Button,
  BackTop,
  Anchor,
  Space,
  Divider,
  Typography,
} from "antd";
import moment from "moment";
import { Link, useParams } from "umi";
import {
  _http,
  MyWangeDitorShow,
  _tools,
  question,
  MyWangeDitor,
  reply,
  replyInReply,
} from "@components";
import Operation from "./operation";
import "./index.less";
import Mycomment from "./comment";
import Editor from "./Editor";
import { VerticalAlignTopOutlined } from "@ant-design/icons";
export default (props: any) => {
  const { id } = useParams<{ id: string }>();
  const { current } = useRef<{
    title: string | null;
    total: number;
  }>({
    title: null,
    total: 1,
  });
  const [listData, setlistData] = useState<reply[]>([]);
  const [Loading, setLoading] = useState<boolean>(true);
  const [showEditor, setshowEditor] = useState<number>(-1);
  const [rInfo, setrInfo] = useState<{ ruid: string; rname: string }>();

  const replyBut = (key: number) => {
    if (key === showEditor) {
      setshowEditor(-1);
      return;
    }
    setshowEditor(key);
  };

  const refresh = async () => {
    const reply = await _http.get(`/reply?id=${id}&start=${0}&page=${5}`, null);
    setlistData(reply);
    setrInfo(undefined);
    setshowEditor(-1);
  };

  const getData = async () => {
    const question = await _http.get(`/portal?id=${id}`, null);
    current.title = question[0]?.title;
    current.total = question[0]?.replies;
    const reply = await _http.get(`/reply?id=${id}&start=${0}&page=${5}`, null);
    setlistData(reply);
    setLoading(false);
  };
  const pageChange = async (page: number, pageSize?: number) => {
    document.documentElement.scrollTop = 0;

    const reply = await _http.get(
      `/reply?id=${id}&start=${(page - 1) * (pageSize || 5)}&page=${pageSize}`,
      null
    );
    if (page == 1) {
      setlistData(reply);
    } else {
      setlistData(reply);
    }
    // const timer = setInterval(() => {
    //   if (document.documentElement.scrollTop > 0) {
    //     document.documentElement.scrollTop -= 14;
    //   } else {
    //     clearInterval(timer);
    //   }
    // }, 1);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {Loading ? (
        <div style={{ textAlign: "center", marginTop: 100 }}>
          <Spin />
        </div>
      ) : (
        <>
          <Row id={"question-list-box"}>
            <Col span={18}>
              <Card
                title={current.title}
                style={{ width: `calc(100% - 10px)`, marginBottom: 20 }}
                bodyStyle={{ margin: 0, padding: 0 }}
                actions={[
                  <Pagination
                    defaultCurrent={1}
                    total={current.total}
                    pageSize={5}
                    onChange={pageChange}
                    simple
                  />,
                ]}
              >
                <List
                  itemLayout="vertical"
                  size="large"
                  dataSource={listData}
                  renderItem={(item, key) => (
                    <Row
                      style={{
                        borderTop: "1px solid rgb(225,228,230)",
                      }}
                    >
                      <Col
                        span={4}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          padding: 10,
                          backgroundColor: "rgb(250,251,252)",
                        }}
                      >
                        <Avatar
                          size={{
                            xs: 24,
                            sm: 32,
                            md: 40,
                            lg: 64,
                            xl: 80,
                            xxl: 100,
                          }}
                          shape="square"
                          src={_tools.imgUrl + item.avatar}
                          style={{
                            color: "#f56a00",
                            backgroundColor: "#fde3cf",
                          }}
                        >
                          {item.name}
                        </Avatar>

                        <span>{item.name}</span>
                      </Col>
                      <Col span={20} style={{ paddingBottom: 10 }}>
                        <MyWangeDitorShow
                          style={{ minHeight: 200 }}
                          _html={item.html}
                        />
                        <div style={{ overflow: "hidden", margin: "0px 10px" }}>
                          <Space
                            style={{ float: "right" }}
                            split={<Divider type={"vertical"} />}
                            align={"center"}
                          >
                            <Typography.Link onClick={() => replyBut(key)}>
                              回复
                            </Typography.Link>
                            <span>
                              {moment(item.create_time).format(
                                "YYYY-MM-DD HH:mm:ss"
                              )}
                            </span>
                          </Space>
                        </div>
                        <div style={{ margin: "0px 10px" }}>
                          <Mycomment
                            replyBut={(reply: replyInReply) => {
                              if (showEditor === key) {
                                setshowEditor(-1);
                                return;
                              }
                              setshowEditor(key);
                              setrInfo({
                                ruid: reply.uid,
                                rname: reply.name,
                              });
                            }}
                            data={item.reply}
                          />

                          {showEditor === key ? (
                            <Editor
                              refresh={refresh}
                              rInfo={rInfo}
                              data={item}
                            />
                          ) : (
                            ""
                          )}
                        </div>
                      </Col>
                    </Row>
                  )}
                />
              </Card>
            </Col>

            <Col span={6}>
              <Affix offsetTop={75}>
                <Card bodyStyle={{ padding: 0, margin: 0 }}>
                  <Operation qid={id} />
                </Card>
              </Affix>
            </Col>
          </Row>
          <Col span={18} style={{ paddingRight: 10 }}>
            <MyWangeDitor
              submit={(editor) => {
                return new Promise(async (reslve, reject) => {
                  const msg = await _http.post(`/insertReply`, {
                    qid: id,
                    uid: _tools.getUid(),
                    html: editor?.txt.html(),
                  });

                  if (msg) {
                    message.success("提交成功");
                    window.location.reload();
                  } else {
                    message.error("提交失败");
                  }
                });
              }}
            />
          </Col>
          <BackTop>
            <div
              style={{
                height: 40,
                width: 40,
                lineHeight: "40px",
                borderRadius: "50%",
                backgroundColor: "#1088e9",
                color: "#fff",
                textAlign: "center",
                fontSize: 14,
              }}
            >
              <VerticalAlignTopOutlined />
            </div>
          </BackTop>
        </>
      )}
    </>
  );
};
