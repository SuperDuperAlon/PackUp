// import type { Metadata } from "next";
import Header from "@/cmps/general/Header/Header";
import "./styles/globals.scss";
import { Suspense } from "react";
import Loader from "@/cmps/general/Loader/Loader";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "Package Management App",
  description: "",
};

export default function RootLayout({
  children,
}
  // : Readonly<{
  //   children: React.ReactNode;
  // }>
) {

  let loggedAdmin = null

  return (
    <html lang="en">
      <body className="index-layout">
        <AuthProvider>
          <Suspense fallback={<Loader />}>
            <Header />
            {children}
          </Suspense >
        </AuthProvider >
      </body>
    </html>
  );
}
