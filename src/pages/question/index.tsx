import { useEffect, useState } from "react";
import { Card, Col, List, Row, Avatar, message } from "antd";
import { useParams } from "umi";
import { _http, MyWangeDitor, MyWangeDitorShow, _tools } from "@components";

export default (props: any) => {
  const { id } = useParams<{ id: string }>();
  const [listData, setlistData] = useState<any>(undefined);

  const getData = async () => {
    const question = await _http.get(`/portal?id=${id}`, null);
    console.log(question);

    const reply = await _http.get(`/reply?id=${id}`, null);
    setlistData([...question, ...reply]);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Card title={"标题"} id={"123124"} bodyStyle={{ margin: 0, padding: 0 }}>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={listData}
          renderItem={(item: any) => (
            <Row
              style={{
                minHeight: 200,
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
                  size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                  shape="square"
                  style={{ color: "#f56a00", backgroundColor: "#fde3cf" }}
                >
                  {item.name}
                </Avatar>

                <span>{item.name}</span>
              </Col>
              <Col span={20}>
                <MyWangeDitorShow _html={item.html} />
              </Col>
            </Row>
          )}
        />
      </Card>
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
    </>
  );
};
