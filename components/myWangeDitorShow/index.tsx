import wangeditor from "wangeditor";
import { CSSProperties, useEffect, useState } from "react";
import { Button } from "antd";
import hljs from "highlight.js";
import "highlight.js/styles/vs2015.css";
import "./less.less";

interface props {
  _html: string;
  style?: CSSProperties;
}

export default (props: props) => {
  return (
    <div
      id={"wangeditorHTML"}
      style={props.style}
      dangerouslySetInnerHTML={{ __html: props._html }}
    />
  );
};
