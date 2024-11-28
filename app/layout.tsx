"use client";
import { Provider } from "react-redux";
import { store } from "./store/store"; // Ensure correct path to your store
import localFont from "next/font/local";
import "./globals.css";
import queryClient from "./queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import toastify styles

import { MantineProvider } from "@mantine/core"; // Import MantineProvider

// Custom fonts
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      {/* Wrap with MantineProvider */}
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            <MantineProvider
              theme={{}}
              // theme={{ colorScheme: 'auto' }} // Set the color scheme for Mantine components
              // withGlobalStyles
              // withNormalizeCSS
            >
              {children}
              {/* Add ToastContainer here */}
              <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
            </MantineProvider>
          </body>
        </QueryClientProvider>
      </Provider>
    </html>
  );
}
