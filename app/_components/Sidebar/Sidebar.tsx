"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown, ChevronRight, ChevronLeft } from "lucide-react";
import { adminsidebar } from "@/app/dashboard/_sidebarContents/adminSidebar";
import { changeState, setcollapsed } from "@/app/store/slices/sidebar";
import { useAppDispatch, useAppSelector } from "@/app/store/hook";

export default function Sidebar() {
    const collapsed = useAppSelector((state) => state.sidebar.collapsed);
    const dispatch = useAppDispatch();
    console.log("count", collapsed);
    // const [collapsed, setCollapsed] = useState(false);
    const pathname = usePathname();
    const [openSubmenus, setOpenSubmenus] = useState<string[]>([]);

    const toggleSubmenu = (href: string) => {
        setOpenSubmenus((prev) => (prev.includes(href) ? prev.filter((item) => item !== href) : [...prev, href]));
    };

    return (
        <div className="relative min-h-screen">
            <div className={`fixed inset-y-0 left-0 pt-4 z-40 flex flex-col bg-[#1e2837] transition-all duration-300 ${collapsed ? "w-16" : "w-64"}`}>
                <div className="flex h-16 items-center justify-between px-4">
                    {!collapsed && <span className="text-lg font-semibold text-white">Admin Panel</span>}
                    <button className="block rounded-md p-1.5 text-gray-400 hover:bg-gray-700" onClick={() => dispatch(changeState())}>
                        {collapsed ? <ChevronRight className="h-6 w-6" /> : <ChevronLeft className="h-6 w-6" />}
                    </button>
                </div>

                <nav className="flex-1 space-y-1 px-2 py-4">
                    {adminsidebar.map((item) => (
                        <div key={item.href}>
                            {item.children ? (
                                // Parent menu item with submenu
                                <button className={`group flex w-full items-center rounded-md px-3 py-2 text-base font-medium text-white transition-colors ${pathname === item.href ? "bg-[#ff6b00] hover:bg-[#ff6b00]/90" : "hover:bg-white/10"} ${collapsed ? "justify-center" : "justify-between"}`} onClick={() => toggleSubmenu(item.href)}>
                                    <div className="flex items-center gap-4">
                                        <item.icon className={`h-5 w-5 ${collapsed ? "h-6 w-6" : ""}`} />
                                        {!collapsed && <span>{item.title}</span>}
                                    </div>
                                    {!collapsed && <ChevronDown className={`h-4 w-4 transition-transform ${openSubmenus.includes(item.href) ? "rotate-180" : ""}`} />}
                                </button>
                            ) : (
                                // Single menu item
                                <Link href={item.href}>
                                    <div className={`group flex w-full items-center rounded-md px-3 py-2 text-base font-medium text-white transition-colors ${pathname === item.href ? "bg-[#ff6b00] hover:bg-[#ff6b00]/90" : "hover:bg-white/10"} ${collapsed ? "justify-center" : "justify-between"}`}>
                                        <div className="flex items-center gap-4">
                                            <item.icon className={`h-5 w-5 ${collapsed ? "h-6 w-6" : ""}`} />
                                            {!collapsed && <span>{item.title}</span>}
                                        </div>
                                    </div>
                                </Link>
                            )}

                            {/* Submenu items */}
                            {item.children && openSubmenus.includes(item.href) && !collapsed && (
                                <div className="mt-2 space-y-1 pl-11">
                                    {item.children.map((child) => (
                                        <Link key={child.href} href={child.href}>
                                            <div className={`group flex w-full items-center rounded-md px-2 py-2 text-sm font-medium text-white transition-colors ${pathname === child.href ? "bg-[#ff6b00] hover:bg-[#ff6b00]/90" : "hover:bg-white/10"}`}>{child.title}</div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>
            </div>

           
        </div>
    );
}
