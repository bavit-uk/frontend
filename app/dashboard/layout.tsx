"use client";
import Sidebar from "../_components/Sidebar/Sidebar";
import { changeState } from "../store/slices/sidebar";
import { useAppDispatch, useAppSelector } from "@/app/store/hook";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const collapsed = useAppSelector((state) => state.sidebar.collapsed);
    // const dispatch = useAppDispatch();
    return (
        <html lang="en">
            <head>
                <title>Dashboard</title>
                <meta name="description" content="Dashboard page of the application" />
            </head>
            <body>
                <div className="flex">
                    <div>
                        <Sidebar />
                    </div>
                    {/* <div>{children}</div> */}
                    <main className={`min-h-screen flex-grow  transition-all duration-300 ${collapsed ? "ml-16" : "ml-64"}`}>{children}</main>
                </div>
            </body>
        </html>
    );
}
