import { _http, _tools } from "@components";
import { Form, Input, Button, Checkbox, message } from "antd";
import { useEffect, useState } from "react";
const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 6,
    span: 16,
  },
};

interface props {
  close?: Function;
}

const Login = ({ close }: props) => {
  const [loading, setloading] = useState<boolean>(false);

  const onFinish = async (values: any) => {
    setloading(true);
    const res: { token: string } = await _http.post(`/loginIn`, values);
    if (res?.token != null) {
      _tools.setToken(res?.token);
      message.success(`登陆成功`);
      window.location.reload();
      setloading(false);
    } else {
      message.error("账号或密码错误");
      setloading(false);
    }
  };
  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        label="用户名"
        name="name"
        rules={[
          {
            required: true,
            message: "请输入用户名",
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="密码"
        name="password"
        rules={[
          {
            required: true,
            message: "请输入密码",
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>记住我</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" loading={loading}>
          登陆
        </Button>
        <Button
          style={{ marginLeft: 10 }}
          type="primary"
          onClick={() => {
            if (close) {
              close();
            }
          }}
        >
          取消
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
