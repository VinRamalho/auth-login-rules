"use client";

import "./style.css";
import React, { ReactNode, useEffect, useState } from "react";
import {
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button } from "antd";
import { AuthService } from "@/service/auth";
import { usePathname } from "next/navigation";
import RedirectPage from "../redirect";

const { Header, Sider, Content } = Layout;

interface IProps {
  children: ReactNode;
}

export default function LayoutPage({ children }: IProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [redirect, setRedirect] = useState<string | undefined>(undefined);
  const pathname = usePathname();

  useEffect(() => {
    const auth = AuthService.IsAuthenticated;

    if (!auth && pathname !== "/login") {
      setRedirect("/login");
    }

    setIsAuthenticated(auth);
  }, []);

  function onSignOut() {
    AuthService.signOut();
    window.location.reload();
  }

  if (!isAuthenticated) {
    return <div className="div-login">{children}</div>;
  }

  if (redirect) {
    return <RedirectPage url={redirect} />;
  }

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="navbar"
      >
        <div className="demo-logo-vertical" />
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={[
            {
              key: "1",
              icon: <HomeOutlined />,
              label: "Home",
            },
            {
              key: "99",
              icon: <LogoutOutlined />,
              label: "Sair",
              onClick: onSignOut,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header>
          <div>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              className="btn-collapse"
            />

            <span className="header-name">
              Seja bem vindo, {AuthService.Name ?? "- "}!
            </span>
          </div>
        </Header>
        <Content className="layout-content">{children}</Content>
      </Layout>
    </Layout>
  );
}
