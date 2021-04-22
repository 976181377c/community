import { MyWangeDitorShow, MyListItem, blog, _http, _tools } from "@components";
import { Card, Col, Row, List } from "antd";
import { useEffect, useState, useRef } from "react";
import Action from "./action";
import ListItem from "./listItem";
import "./index.less";

export default () => {
  let timer = useRef<{
    time: any;
    listData: blog[];
    length: number;
  }>({
    time: null,
    listData: [],
    length: 0,
  });
  const [listData, setlistData] = useState<blog[]>([]);

  const getData = async () => {
    try {
      const { length, listData } = timer.current;
      const newData = await _http.get(
        `/blogPortal?start=${length}&page=${5}`,
        null
      );
      setlistData([...listData, ...newData]);
      timer.current = {
        time: null,
        listData: [...listData, ...newData],
        length: length + 5,
      };
    } catch (e) {
      console.log("错误");
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <Row className={"blog-portal"}>
      <Col span={18}>
        <Card style={{ marginRight: 10 }} title={"发现"}>
          <List
            itemLayout="vertical"
            size="large"
            dataSource={listData}
            renderItem={(item) => <ListItem data={item} />}
          />
        </Card>
      </Col>
      <Col span={6}>
        <Card>
          <Action />
        </Card>
      </Col>
    </Row>
  );
};
