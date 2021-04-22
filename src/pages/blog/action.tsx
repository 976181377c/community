import { history } from "umi";
import { Button } from "antd";

export default () => {
  return (
    <Button
      type={"primary"}
      onClick={() => {
        history.push(`/blog/editor`);
      }}
    >
      写文章
    </Button>
  );
};
