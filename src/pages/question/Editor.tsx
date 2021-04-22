import { reply, _http, _tools } from "@components";
import { Form, Button, Input, message } from "antd";
import { useState } from "react";

import moment from "moment";

const { TextArea } = Input;

interface props {
  data: reply;
  ruid?: string;
  rname?: string;
  rInfo?: { ruid: string; rname: string };
  refresh: any;
}

const Editor = ({ data, rInfo, refresh }: props) => {
  const [submitting, setsubmitting] = useState<boolean>(false);

  const onFinish = async (val: any) => {
    if (val?.context) {
      try {
        setsubmitting(true);
        await _http.post("/replyInReply", {
          uid: _tools.getUid(),
          rid: data.id,
          ...rInfo,
          context: val.context,
        });
      } catch (error) {
        message.error(error);
      } finally {
        setsubmitting(false);
        refresh();
      }
    }
  };

  return (
    <div className={"editor-animation"}>
      <Form onFinish={onFinish}>
        <Form.Item name={"context"} style={{ margin: "10px 10px" }}>
          <TextArea
            defaultValue={rInfo?.rname ? `@${rInfo?.rname}# ` : ""}
            rows={4}
          />
        </Form.Item>
        <Form.Item style={{ margin: "0px 10px" }}>
          <Button
            htmlType="submit"
            style={{ marginTop: 10, float: "right" }}
            loading={submitting}
            type="primary"
          >
            回复
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Editor;
