"use client";
import { Menu } from "antd";
import { useRouter } from "next/navigation";

const Navigation = () => {
  const router = useRouter();

  const menuItems = [
    {
      key: "create",
      label: "Create Account",
      onClick: () => router.push("/"),
    },
    {
      key: "faq",
      label: "FAQ",
      onClick: () => router.push("/faq"),
    },
  ];

  return (
    <Menu
      mode="horizontal"
      defaultSelectedKeys={["create"]}
      items={menuItems}
      style={{
        justifyContent: "center",
        backgroundColor: "white",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        width: "20vw",
        borderRadius: "25px",
      }}
    />
  );
};

export default Navigation;
