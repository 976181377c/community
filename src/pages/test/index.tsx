import { Button, Card } from "antd";
import { useEffect, useState, useRef } from "react";

export default (props: any) => {
  const [count, setcount] = useState(0);

  const onclickhanld = () => {
    setcount(count + 1);
  };

  useEffect(() => {}, [count]);

  return [<div>{count}</div>, <Button onClick={onclickhanld}>dianj</Button>];
};
