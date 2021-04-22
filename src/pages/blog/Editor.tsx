import { MyWangeDitor, _http, _tools } from "@components";
import wangeditor from "wangeditor";
import { Form, Input } from "antd";

export default () => {
  const [form] = Form.useForm();

  const submit = (editor?: wangeditor) => {
    const title = form.getFieldValue("title");
    const content = editor?.txt.text();
    const html = editor?.txt.html();
    if (content && title) {
      return _http.post(`/insertBlog`, {
        uid: _tools.getUid(),
        title,
        content,
        html,
      });
    } else {
      throw "请写内容";
    }
  };
  return (
    <Form form={form}>
      <Form.Item name={"title"} label="标题" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <MyWangeDitor height={500} style={{ marginTop: 40 }} submit={submit} />
    </Form>
  );
};
