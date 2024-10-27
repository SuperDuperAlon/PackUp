// import type { Metadata } from "next";
import Header from "@/cmps/general/Header/Header";
import "./styles/globals.scss";
import Loader from "@/cmps/general/Loader/Loader";
import { Suspense } from "react";
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

  return (
    <html lang="en">
      <body className="index-layout">
        <Suspense fallback={<Loader isFullScreen={true} />}>
          <AuthProvider>
            <Header />
            {children}
          </AuthProvider>
        </Suspense>
      </body>
    </html>
  );
}