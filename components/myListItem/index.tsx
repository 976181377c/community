import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { List, Avatar, Space } from "antd";
import { history, useParams } from "umi";
import React from "react";
import { question } from "components/dataType";
interface props {
  data?: question;
  style?: React.CSSProperties;
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
  const { data } = props;
  return (
    <List.Item
      key={data?.id}
      actions={[
        <IconText
          icon={<LikeOutlined />}
          text={data?.likes || 0}
          key="list-vertical-like-z"
        />,
        <IconText
          icon={<StarOutlined />}
          text={data?.collections || 0}
          key="list-vertical-like-o"
        />,
        <IconText
          icon={<MessageOutlined />}
          text={data?.replies || 0}
          key="list-vertical-message"
        />,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={data?.avatar} />}
        title={
          <a
            onClick={() => {
              window.open(`${window.location.href}/${data?.id}`);
            }}
          >
            {data?.title}
          </a>
        }
      />
      {data?.content}
    </List.Item>
  );
};
