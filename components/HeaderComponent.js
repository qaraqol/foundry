"use client";
import { Layout } from "antd";

const { Header } = Layout;

const HeaderComponent = () => {
  return (
    <Header
      style={{
        backgroundColor: "#f5f5f5",
        justifyContent: "center",
        fontSize: "1.5rem",
      }}
    >
      Foundry - Create a Free WAX Account Instantly
    </Header>
  );
};

export default HeaderComponent;
