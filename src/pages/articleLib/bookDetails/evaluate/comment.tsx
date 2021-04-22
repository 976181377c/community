import { bookReply } from "@components";
import { Comment, Avatar, Tooltip, Rate } from "antd";
import moment from "moment";
import React, { createElement } from "react";

export default ({ data }: { data: bookReply }) => {
  return (
    <Comment
      actions={[
        <span>{moment(data.create_time).format("YYYY-MM-DD HH:mm:ss")}</span>,
      ]}
      author={
        <>
          <a>{data.name}</a>
          <br />
          <Rate
            style={{ fontSize: 12, color: "#fadb14" }}
            disabled
            value={data.star}
          />
        </>
      }
      avatar={
        <Avatar src={data?.avatar} alt={data.name}>
          {data.name}
        </Avatar>
      }
      content={<p>{data.context}</p>}
    />
  );
};
