import Comment from "./comment";
import { Card, Progress, Rate, Space, Divider } from "antd";
import { useState } from "react";
import "./index.less";
import { bookReply } from "@components";

export default ({ data }: { data?: bookReply[] }) => {
  const rate = { num: 0.0, like: 0, commonly: 0, dis: 0 };
  {
    let { num, like, commonly, dis } = rate;
    data?.map(({ star }) => {
      num += star;
      if (star > 4) {
        like += 1;
      } else if (star > 2) {
        commonly += 1;
      } else {
        dis += 1;
      }
    });
    rate.num = num / (data?.length || 1);
    rate.like = (like / (data?.length || 1)) * 100;
    rate.commonly = (commonly / (data?.length || 1)) * 100;
    rate.dis = (dis / (data?.length || 1)) * 100;
  }

  const title = (
    <>
      <h4>评价</h4>
      <div className={"evaluate-card-div"}>
        <span className={"evaluate-card-score"}>
          <span>{rate.num}</span>
          <span className={"evaluate-card-num"}>
            <Rate value={rate.num} disabled />
            <span>{data?.length || 0}条评论</span>
          </span>
        </span>
        <Divider
          style={{ height: "70px", margin: "0px 20px" }}
          type="vertical"
        />
        <div className={"evaluate-card-progress"}>
          <span className={"evaluate-card-progress-title"}>好评 </span>
          <Progress
            status={"normal"}
            percent={rate.like}
            strokeColor={"#FFAA00"}
          />
          <br />
          <span className={"evaluate-card-progress-title"}>中评</span>
          <Progress
            status={"normal"}
            percent={rate.commonly}
            strokeColor={"#FFAA00"}
          />
          <br />
          <span className={"evaluate-card-progress-title"}>差评</span>
          <Progress
            status={"normal"}
            percent={rate.dis}
            strokeColor={"#FFAA00"}
          />
        </div>
      </div>
    </>
  );

  return (
    <Card className={"evaluate-card"} title={title}>
      {data?.map((item) => {
        return <Comment data={item} />;
      })}
    </Card>
  );
};
