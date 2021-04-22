import wangeditor from "wangeditor";
import { CSSProperties, useEffect, useRef } from "react";
import { Button, message } from "antd";
import hljs from "highlight.js";
import "highlight.js/styles/vs2015.css";
import "./index.less";

interface current {
  /**富文本实例 */
  editor?: wangeditor;
}
interface props {
  height?: number;
  style?: CSSProperties;
  /**提交事件 */
  submit: (editor?: wangeditor) => Promise<any>;
  close?: Function;
}
export default ({ submit, close, style, height }: props) => {
  let { current } = useRef<current>({ editor: undefined });

  useEffect(() => {
    const editor = new wangeditor("#wangeditor");
    editor.config.height = height || 200;
    editor.create();
    editor.highlight = hljs;
    current.editor = editor;
  }, []);

  return (
    <div className={"wangeditor-box"} style={style}>
      <div id={"wangeditor"}></div>
      <div className={"wangeditor-box-button"}>
        <Button
          type="primary"
          onClick={async () => {
            let text = null;
            try {
              text = await submit(current?.editor);
              if (close != undefined) {
                message.success(text);
                close();
              }
            } catch (err) {
              message.warning(err);
            }
          }}
        >
          提交
        </Button>
      </div>
    </div>
  );
};
