import React, {
  Dispatch,
  ReactElement,
  createElement,
  useState,
  cloneElement,
} from "react";
import { Comment, Tooltip, Avatar, Pagination, Popover } from "antd";
import moment from "moment";
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
} from "@ant-design/icons";
import { replyInReply } from "components/dataType";
import { _http, _tools } from "@components";
interface props {
  children?: ReactElement;
  data: replyInReply[];
  replyBut: Function;
  // replyInReply: replyInReply[];
  // type: "reply" | "unreplay";
  style?: React.CSSProperties;
}

moment.locale("zh-cn");
export default ({ children, style, data, replyBut }: props) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState<string | null>(null);
  const [page, setpage] = useState<number>(1);

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction("liked");
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction("disliked");
  };
  const onlink = async (name: string) => {
    try {
      await _http.post("/selectName", { name: name });
    } catch (error) {}
  };
  const content = (str: string) => {
    const strArray = str?.split(/(\@\S+\#)/);
    const newArray: any = [];
    strArray?.map((item, key) => {
      if (key % 2 == 0) {
        newArray.push(<span>{item}</span>);
      } else {
        newArray.push(
          <a
            onClick={() => {
              onlink(item.substring(1, item.length - 1));
            }}
          >
            {item}
          </a>
        );
      }
    });
    return newArray;
  };

  return (
    <>
      {data.slice((page - 1) * 3, page * 3).map((item) => {
        return (
          <Comment
            style={style}
            actions={[
              <span
                onClick={() => {
                  replyBut(item);
                }}
                key="comment-basic-reply-to"
              >
                回复
              </span>,
            ]}
            author={<a>{item.name}</a>}
            avatar={
              <Avatar src={_tools.imgUrl + item.avatar} alt={item.name}>
                {item.name}
              </Avatar>
            }
            content={<p>{content(item.content)}</p>}
            datetime={
              <Tooltip
                title={moment(item.create_time).format("YYYY-MM-DD HH:mm:ss")}
              >
                <span>{moment(item.create_time).fromNow()}</span>
              </Tooltip>
            }
          />
        );
      })}
      {data.length > 0 ? (
        <div style={{ width: "100%", overflow: "hidden" }}>
          <Pagination
            style={{ float: "right" }}
            size="small"
            onChange={(page) => {
              setpage(page);
            }}
            pageSize={3}
            total={data.length}
          />
        </div>
      ) : (
        ""
      )}
    </>
  );
};
