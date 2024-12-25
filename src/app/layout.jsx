// import type { Metadata } from "next";
import "./styles/globals.scss";
import Header from "@/cmps/general/Header/Header";
import GeneralInfo from "@/cmps/general/GeneralInfo/GeneralInfo";
import { LoaderProvider } from "@/context/LoaderContext";
import { AuthProvider } from "@/context/AuthContext";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const metadata = {
  title: "PackUp",
  description: "Package and mail management system for residential complexes",
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
        <AuthProvider>
          <LoaderProvider>
            <Header />
            {children}
          </LoaderProvider>
        </AuthProvider>
        {/* <GeneralInfo /> */}
        <ToastContainer />
      </body>
    </html >
  );
}