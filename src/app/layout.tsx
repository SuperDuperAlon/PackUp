import type { Metadata } from "next";
import Header from "@/cmps/general/Header/Header";
import "./styles/globals.scss";
import { Suspense } from "react";
import Loader from "@/cmps/general/Loader/Loader";
import { UserProvider } from "@/context/UserContext";

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
        <UserProvider>
          <Suspense fallback={<Loader />}>
            <Header />
            {children}
          </Suspense >
        </UserProvider >
      </body>
    </html>
  );
}
