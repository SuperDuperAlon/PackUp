import type { Metadata } from "next";
import Header from "@/cmps/general/Header/Header";
import "./styles/globals.scss";
import { userService } from "@/services/user.service";

export const metadata: Metadata = {
  title: "Package Management App",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className="index-layout">
        <Header />
        {children}
      </body>
    </html>
  );
}
