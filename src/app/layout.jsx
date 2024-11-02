// import type { Metadata } from "next";
import Header from "@/cmps/general/Header/Header";
import "./styles/globals.scss";
import Loader from "@/cmps/general/Loader/Loader";
import { Suspense } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: "TowerOne",
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
        <Suspense fallback={<Loader />}>
          <AuthProvider>
            <Header />
            {children}
          </AuthProvider>
        </Suspense>
        <ToastContainer />
      </body>
    </html>
  );
}