import { question, _http, _tools } from "@components";
import { List, Avatar, Skeleton } from "antd";
import moment from "moment";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default () => {
  const [listData, setlistData] = useState<question[]>([]);
  useEffect(() => {
    getDate();
  }, []);
  const getDate = async () => {
    try {
      const res = await _http.get(
        `/getCollection?uid=${_tools.getUid()}&start=${0}&page=${5}`,
        null
      );
      setlistData(res);
    } catch (error) {}
  };
  const renderItem = (data: question) => {
    return (
      <Skeleton loading={data?.id ? false : true} active avatar>
        <List.Item>
          <div className={"center-card-item"}>
            <h3>
              <Link
                className={"center-card-title"}
                to={{ pathname: `/question/${data.id}` }}
              >
                {data.title}
              </Link>
            </h3>
            <div className={"center-card-name"}>
              <Avatar
                size={"small"}
                src={data.avatar ? `${_tools.imgUrl + data.avatar}` : null}
              >
                {data.name}
              </Avatar>
              <span>{data.name}</span>
            </div>
            <div className={"center-card-content"}>{data.content}</div>
            <span className={"center-card-time"}>
              {moment(data.create_time).format("YYYY-MM-DD")}
            </span>
          </div>
        </List.Item>
      </Skeleton>
    );
  };

  return (
    <List
      itemLayout="vertical"
      size="large"
      // loading={Loading}
      dataSource={listData}
      renderItem={renderItem}
    ></List>
  );
};
