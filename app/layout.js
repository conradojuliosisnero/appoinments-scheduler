import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import "antd/dist/reset.css";
import { ConfigProvider } from "antd";
import { App as AntdApp } from "antd";
import ReduxLayout from "@/layouts/ReduxLayout";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Appointments Sheduler",
  description:
    "this site is for appointments sheduler, constructed with nextjs and css modules",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ReduxLayout>
          <Toaster
            position="top-center"
            reverseOrder={false}
            gutter={8}
            containerClassName=""
            toastOptions={{
              className: "",
              duration: 5000,
              removeDelay: 1000,
              success: {
                duration: 3000,
                iconTheme: {
                  primary: "green",
                  secondary: "black",
                },
              },
            }}
          />
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: "#2b6cb0",
                borderRadius: 8,
              },
            }}
          >
            <AntdApp>{children}</AntdApp>
          </ConfigProvider>
        </ReduxLayout>
      </body>
    </html>
  );
}
