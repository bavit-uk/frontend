"use client";

import React, { useState } from "react";
import {  ChevronDown, ChevronRight, ChevronLeft } from "lucide-react";
import { adminsidebar } from "@/app/dashboard/_sidebarContents/adminSidebar";

export default function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const [activeItem, setActiveItem] = useState("/dashboard");
    const [openSubmenus, setOpenSubmenus] = useState<string[]>([]);

    const toggleSubmenu = (href: string) => {
        setOpenSubmenus((prev) => (prev.includes(href) ? prev.filter((item) => item !== href) : [...prev, href]));
    };

    return (
        <div className="relative min-h-screen">
            

            <div className={`fixed inset-y-0 left-0 z-40 flex flex-col bg-[#1e2837] transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}>
                <div className="flex h-16 items-center justify-between px-4">
                    {!collapsed && <span className="text-lg font-semibold text-white">Admin Panel</span>}
                    <button className=" rounded-md p-1.5 text-gray-400 hover:bg-gray-700 block" onClick={() => setCollapsed(!collapsed)}>
                        { collapsed ? <ChevronRight className="h-6 w-6" /> : <ChevronLeft className="h-6 w-6" /> }
                    </button>
                </div>

                <nav className="flex-1 space-y-1 px-2 py-4">
                    {adminsidebar.map((item) => (
                        <div key={item.href}>
                            <button
                                className={`group flex w-full items-center rounded-md px-3 py-2 text-base font-medium text-white transition-colors ${activeItem === item.href ? "bg-[#ff6b00] hover:bg-[#ff6b00]/90" : "hover:bg-white/10"} ${collapsed ? "justify-center" : "justify-between"}`}
                                onClick={() => {
                                    setActiveItem(item.href);
                                    if (item.children) {
                                        toggleSubmenu(item.href);
                                    }
                                }}>
                                <div className="flex items-center gap-4">
                                    <item.icon className={`h-5 w-5 ${collapsed ? "h-6 w-6" : ""}`} />
                                    {!collapsed && <span>{item.title}</span>}
                                </div>
                                {!collapsed && item.children && <ChevronDown className={`h-4 w-4 transition-transform ${openSubmenus.includes(item.href) ? "rotate-180" : ""}`} />}
                            </button>
                            {item.children && openSubmenus.includes(item.href) && !collapsed && (
                                <div className="mt-2 space-y-1 pl-11">
                                    {item.children.map((child) => (
                                        <button key={child.href} className={`group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-white transition-colors ${activeItem === child.href ? "bg-[#ff6b00] hover:bg-[#ff6b00]/90" : "hover:bg-white/10"}`} onClick={() => setActiveItem(child.href)}>
                                            {child.title}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>
            </div>

            <main className={`min-h-screen transition-all duration-300 ${collapsed ? "pl-16" : "pl-64"}`}>
                <div className="container p-8">
                    <h1 className="text-2xl font-bold">Content Area</h1>
                </div>
            </main>
        </div>
    );
}
