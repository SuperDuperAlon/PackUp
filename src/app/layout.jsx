// import type { Metadata } from "next";
import "./styles/globals.scss";
import Header from "@/cmps/general/Header/Header";
import GeneralInfo from "@/cmps/general/GeneralInfo/GeneralInfo";
import Loader from "@/cmps/general/Loader/Loader";
import { Suspense } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: "PackUp",
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
        <GeneralInfo />
        <ToastContainer />
      </body>
    </html>
  );
}