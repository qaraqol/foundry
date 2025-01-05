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
      foundry - Account creation tool by Qaraqol
    </Header>
  );
};

export default HeaderComponent;
