import { useEffect, useState, useRef } from "react";
import "./index.less";
// import tools from "../../components";
import { Button, Layout, Menu, Affix, Dropdown, Avatar } from "antd";
import { Link } from "umi";
import { CloudOutlined } from "@ant-design/icons";
import { history } from "umi";
import { MyLogin, MyModel, _tools } from "@components";
const { Header, Content, Sider } = Layout;

export default (props: any) => {
  const pageChange = (e: any) => {
    if (e.key === "portal") {
      history.push(`/`);
    } else {
      if (e.key == "article") {
        history.push(`/${e.key}/categories`);
      } else {
        history.push(`/${e.key}`);
      }
    }
  };
  const getKey = () => {
    const url: string[] = props.location.pathname.split("/");
    return [url[1] || `portal`];
  };

  const login = () => {
    try {
      const name = _tools.getName();
      const menu = (
        <Menu style={{ width: 140 }}>
          <Menu.Item
            onClick={() => {
              history.push(`/aboutMe/dynamic`);
            }}
          >
            个人中心
          </Menu.Item>
          <Menu.Item
            onClick={() => {
              _tools.clearToken();
              window.location.reload();
            }}
          >
            退出
          </Menu.Item>
        </Menu>
      );
      return (
        <Dropdown
          overlay={menu}
          getPopupContainer={() => {
            return document.getElementById("index-login") || document.body;
          }}
          placement="topCenter"
        >
          <Avatar>{name}</Avatar>
        </Dropdown>
      );
    } catch {
      return (
        <MyModel
          content={<MyLogin />}
          modalProps={{ title: "登陆", footer: null }}
        >
          <Button>登陆</Button>
        </MyModel>
      );
    }
  };

  return (
    <Layout>
      <Affix style={{ zIndex: 100 }} offsetTop={0}>
        <Header className={"header-layout"}>
          <div className="logo">
            <CloudOutlined style={{ fontSize: 38 }} />
          </div>
          <Menu
            theme="light"
            mode="horizontal"
            selectedKeys={getKey()}
            onClick={pageChange}
            style={{
              width: 300,
              display: "inline-block",
              position: "absolute",
              top: 0,
            }}
          >
            <Menu.Item key="portal">首页</Menu.Item>
            <Menu.Item key="AQ">问答</Menu.Item>
            <Menu.Item key="blog">文章</Menu.Item>
            <Menu.Item key="article">文库</Menu.Item>
          </Menu>
          <div className={"index-login"} id={"index-login"}>
            {login()}
          </div>
        </Header>
      </Affix>

      <Content className={"site-layout"} id={"layout-content"}>
        {props.children}
      </Content>
    </Layout>
  );
};
