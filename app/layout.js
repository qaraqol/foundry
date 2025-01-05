import localFont from "next/font/local";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { Layout } from "antd";
import Navigation from "@/components/Navigation"; // Import the Navigation component
import HeaderComponent from "@/components/HeaderComponent";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Foundry - Create a Free WAX Account Instantly",
  description: "WAX Account Creator",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AntdRegistry>
          <Layout style={{ minHeight: "100vh", alignItems: "center" }}>
            <HeaderComponent />
            <Navigation />
            {children}
          </Layout>
        </AntdRegistry>
      </body>
    </html>
  );
}
