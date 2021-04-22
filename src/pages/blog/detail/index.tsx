import { MyWangeDitorShow, _http } from "@components";
import { Card, message, Row, Spin, Col, Affix } from "antd";
import { blog } from "components/dataType";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import Catalog from "./catalog";

export default () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<blog>();

  const getData = async () => {
    try {
      const res = await _http.get(`/getBlog?id=${id}`, {});
      setData(res);
    } catch (error) {
      message.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {data ? (
        <Row>
          <Col span={18}>
            <Card title={data.title} style={{ marginRight: 10 }}>
              <MyWangeDitorShow _html={data?.html} />
            </Card>
          </Col>
          <Col span={6}>
            <Affix offsetTop={70}>
              <Card title={"目录"}>
                <Catalog _html={data?.html} />
              </Card>
            </Affix>
          </Col>
        </Row>
      ) : (
        <Spin />
      )}
    </>
  );
};
