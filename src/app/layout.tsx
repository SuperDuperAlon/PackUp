import type { Metadata } from "next";
import "./globals.css";
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
      <body>{children}</body>
    </html>
  );
}
