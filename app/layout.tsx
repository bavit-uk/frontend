<<<<<<< Updated upstream
'use client';  // This tells Next.js that this component is a Client Component

import { Provider } from 'react-redux';
import { store } from './store/store'; // Ensure correct path to your store
import localFont from 'next/font/local';
import './globals.css';
=======
"use client"; // This tells Next.js that this component is a Client Component

import { Provider } from "react-redux";
import { store } from "./store/store"; // Ensure correct path to your store
import localFont from "next/font/local";
import "./globals.css";
import queryClient from "./queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
>>>>>>> Stashed changes

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <Provider store={store}>
<<<<<<< Updated upstream
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
=======
        <QueryClientProvider client={queryClient}>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            {children}
          </body>
        </QueryClientProvider>
>>>>>>> Stashed changes
      </Provider>
    </html>
  );
}
