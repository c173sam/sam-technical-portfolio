import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap"
});

export const metadata: Metadata = {
  title: "徐念齐 / Sam - Technical Portfolio",
  description:
    "徐念齐 / Sam 的高级技术作品集，聚焦 Technical Support、IT Support、PMO、Solution Intern 与 FDE 方向探索。"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={geist.variable}>
      <body>{children}</body>
    </html>
  );
}
