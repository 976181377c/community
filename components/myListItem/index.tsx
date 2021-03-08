import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { List, Avatar, Space } from "antd";
import { history } from "umi";
import React from "react";
interface props {
  data?: Array<Object>;
  id?: string;
  style?: React.CSSProperties;
  title?: string;
  avatar?: string;
  content?: string;
  description?: string;
}
interface IconText {
  icon: any;
  text: any;
}

const IconText = (props: IconText) => (
  <Space>
    {props.icon}
    {props.text}
  </Space>
);

export default (props: props) => {
  return (
    <List.Item
      key={props.id}
      actions={[
        <IconText
          icon={<LikeOutlined />}
          text="156"
          key="list-vertical-like-o"
        />,
        <IconText
          icon={<MessageOutlined />}
          text="2"
          key="list-vertical-message"
        />,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={props.avatar} />}
        title={
          <a
            onClick={() => {
              history.push(`/question/${props.id}`);
            }}
          >
            {props.title}
          </a>
        }
      />
      {props.content}
    </List.Item>
  );
};
