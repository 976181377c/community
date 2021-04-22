import {
  StarOutlined,
  LikeOutlined,
  MessageOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import {
  Affix,
  Button,
  Card,
  List,
  Row,
  Col,
  Modal,
  Input,
  Form,
  Spin,
} from "antd";
import React, { useRef, useEffect, useState } from "react";
import { history } from "umi";
import "./index.less";
import MyInfo from "./myInfo";
import {
  MyModel,
  MyListItem,
  MyWangeDitor,
  _http,
  _tools,
  question,
} from "@components";
const { confirm } = Modal;

export default (props: any) => {
  let timer = useRef<{
    time: any;
    listData: question[];
    length: number;
  }>({
    time: null,
    listData: [],
    length: 0,
  });
  const [form] = Form.useForm();
  const [listData, setlistData] = useState<question[]>([]);
  const [loding, setLoding] = useState(true);
  const scrollEvent = () => {
    let body = document.documentElement;
    if (body.scrollHeight - body.scrollTop - body.clientHeight < 10) {
      if (timer.current.time == null) {
        timer.current.time = setTimeout(() => {
          getData();
        }, 10);
      }
    }
  };

  useEffect(() => {
    getData();
    window.addEventListener("scroll", scrollEvent);
    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
  }, []);

  const getData = async () => {
    try {
      const { length, listData } = timer.current;
      const newData = await _http.get(
        `/portal?start=${length}&page=${5}`,
        null
      );
      setlistData([...listData, ...newData]);
      setLoding(false);
      timer.current = {
        time: null,
        listData: [...listData, ...newData],
        length: length + 5,
      };
    } catch (e) {
      console.log("错误");
    }
  };
  const setTitle = () => {
    return new Promise((resolve, reject) => {
      confirm({
        title: "请输入标题",
        icon: null,
        content: (
          <Form form={form}>
            <Form.Item name="title" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
          </Form>
        ),
        okText: "提交",
        cancelText: "返回",
        onOk() {
          if (form.getFieldValue("title") == null) {
            reject("请输入标题");
          }
          resolve(null);
        },
        onCancel() {
          reject("已取消");
        },
      });
    });
  };

  return (
    <>
      {loding ? (
        <div style={{ textAlign: "center", marginTop: 100 }}>
          <Spin />
        </div>
      ) : (
        <Row>
          <Col span={18}>
            <Card title={"发现"} className={"scroll-list"}>
              <List
                itemLayout="vertical"
                size="large"
                dataSource={listData}
                renderItem={(item) => <MyListItem data={item} />}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Affix offsetTop={75}>
              <Card
                bodyStyle={{ padding: 0, margin: 0 }}
                title={"我的问答"}
                extra={
                  <MyModel
                    content={
                      <MyWangeDitor
                        height={400}
                        submit={async (editor) => {
                          await setTitle();
                          const uid = _tools.getUid();
                          const title = form.getFieldValue("title");
                          const html = editor?.txt.html();
                          const content = editor?.txt.text();
                          return new Promise(async (resolve, reject) => {
                            const res = await _http.post(`/insertQuestion`, {
                              uid,
                              title,
                              html,
                              content,
                            });
                            resolve("提交成功");
                          });
                        }}
                      />
                    }
                    modalProps={{
                      title: "提问",
                      width: "70%",
                      footer: null,
                    }}
                  >
                    <Button type={"primary"}>提问</Button>
                  </MyModel>
                }
              >
                <MyInfo />
              </Card>
            </Affix>
          </Col>
        </Row>
      )}
    </>
  );
};
