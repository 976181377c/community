import wangeditor from "wangeditor";
import { useEffect, useRef } from "react";
import { Button, message } from "antd";
import hljs from "highlight.js";
import "highlight.js/styles/vs2015.css";
import http from "../myRequest";
interface current {
  /**富文本实例 */
  editor?: wangeditor;
}
interface props {
  /**提交事件 */
  submit: (editor?: wangeditor) => Promise<any>;
  close?: Function;
}
export default ({ submit, close }: props) => {
  let { current } = useRef<current>({ editor: undefined });

  useEffect(() => {
    const editor = new wangeditor("#wangeditor");
    editor.create();
    editor.highlight = hljs;
    current.editor = editor;
  }, []);

  return (
    <>
      <div id={"wangeditor"}></div>
      <Button
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
    </>
  );
};
